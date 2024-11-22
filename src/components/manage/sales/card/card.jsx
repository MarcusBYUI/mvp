import ProgressBar from "@ramonak/react-progress-bar";
import { getImageUrl } from "../../../../helpers/utils";
import styles from "./card.module.css";
import PropTypes from "prop-types";
import numberWithCommas from "../../../../helpers/commaSeperator";
import { useEffect } from "react";
import { useState } from "react";
import { Tooltip } from "react-tooltip";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkDeployed, checkPublished, claimVenom, deleteICO, getDeployBody, publishSale } from "../../../launchpad/helper";
import ValidImage from '../../../validImage/validImage';
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';
import BigNumber from "bignumber.js";
import { getTon } from "../../../../hooks/useFactoryContract";
import { getSaleData } from "../../../../hooks/useSaleContract";
import Whitelist from "./whitelist";


const Card = ({ data }) => {
  const [showWl, setShowWl] = useState(false)
  const address = useTonAddress(false);
  const [tonConnectUI] = useTonConnectUI();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [saleData, setSaleData] = useState({})

  const { message } = useSelector(
    (state) => state.notification
  );
  const percentage =
    data.raised >= data.hardcap ? 100 : (data.raised / data.hardcap) * 100;
  const percentageOverflow = data.raised >= data.softcap ? 100 : (data.raised / data.softcap) * 100;


  useEffect(() => {
    if (!data.saleAddress) {
      return
    }
    let abortController;
    (async function () {
      abortController = new AbortController();

      //get sale data
      try {
        const saleData = await getSaleData(data.saleAddress)
        for (const keys in saleData) {
          if (typeof saleData[keys] === "bigint") {
            saleData[keys] = Number(saleData[keys])
          }
        }

        setSaleData(saleData)

      } catch (error) {
        console.log(error)
      }


    })();
    return () => abortController.abort();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, message]);


  return (
    <>
      <div className={styles.border}>
        <div className={styles.bg}>
          <div className={styles.card}>
            <div className={styles.header}>
              <div>
                {data.name.length < 18 ?
                  <h4>{data.name.toLowerCase()}</h4>
                  : <h4><marquee>{data.name.toLowerCase()}</marquee></h4>}
                <span>{data.type == "ico" ? `${data.phase} - ICO` : data.type == "private" ? `${data.phase} - Whitelist` : `${data.phase} - Fairlaunch(Overflow)` || <Skeleton />}</span>


                <div className={styles.socials}>
                  {data.website ? (
                    <a
                      id="website"
                      target="_blank"
                      rel="noreferrer"
                      href={data.website}
                    >
                      <img loading="lazy" src={getImageUrl("link.png")} alt="website" />
                    </a>
                  ) : (
                    <></>
                  )}
                  {data.twitter != "#" ? (
                    <a
                      id="twitter"
                      target="_blank"
                      rel="noreferrer"
                      href={data.twitter}
                    >
                      <img loading="lazy" src={getImageUrl("twitter.png")} alt="twitter" />
                    </a>
                  ) : (
                    <></>
                  )}
                  {data.telegram != "#" ? (
                    <a
                      id="telegram"
                      target="_blank"
                      rel="noreferrer"
                      href={data.telegram}
                    >
                      <img loading="lazy" src={getImageUrl("telegram.png")} alt="telegram" />
                    </a>
                  ) : (
                    <></>
                  )}
                  {data.discord != "#" ? (
                    <a
                      id="discord"
                      target="_blank"
                      rel="noreferrer"
                      href={data.discord}
                    >
                      <img loading="lazy" src={getImageUrl("discord.png")} alt="discord" />
                    </a>
                  ) : (
                    <></>
                  )}
                  {data.medium != "#" ? (
                    <a
                      id="medium"
                      target="_blank"
                      rel="noreferrer"
                      href={data.medium}
                    >
                      <img loading="lazy" src={getImageUrl("medium.png")} alt="medium" />
                    </a>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <ValidImage link={data.logo} alt={data.name.slice(0, 15)} />
            </div>
            <p>{data.description.slice(0, 140)}...</p>
            {(data.type == "ico" || data.type == "private") ? <div className={styles.progress}>
              <span>
                Progress: {numberWithCommas(data.raised)} (
                {Math.round(percentage)}%)
              </span>

              <ProgressBar
                completed={Math.round(percentage)}
                className={styles.wrapper}
                barContainerClassName={styles.pcontainer}
                transitionDuration="1"
                animateOnRender={true}
                isLabelVisible={false}
              />

              <div>
                <div className={styles.flex}>
                  <span>0</span>
                  <img style={{ width: 16, height: 16, objectFit: "contain" }} src={getImageUrl("tcon.png")} alt="venom" />
                </div>

                <div className={styles.flex}>
                  <span>{numberWithCommas(data.hardcap)}</span>
                  <img style={{ width: 16, height: 16, objectFit: "contain" }} src={getImageUrl("tcon.png")} alt="venom" />
                </div>
              </div>
            </div> :
              <div className={styles.progress}>
                <span>
                  Progress: {numberWithCommas(data.raised)} (
                  {Math.round((data.raised / data.softcap) * 100)}%)
                </span>

                <ProgressBar
                  completed={Math.round(percentageOverflow)}
                  className={styles.wrapper}
                  barContainerClassName={styles.pcontainer}
                  transitionDuration="1"
                  animateOnRender={true}
                  isLabelVisible={false}
                />

                <div>
                  <div className={styles.flex}>
                    <span>0</span>
                    <img style={{ width: 16, height: 16, objectFit: "contain" }} src={getImageUrl("tcon.png")} alt="venom" />
                  </div>

                  <div className={styles.flex}>
                    <span>{data.raised > data.softcap ? "♾️" : numberWithCommas(data.softcap)}</span>
                    <img style={{ width: 16, height: 16, objectFit: "contain" }} src={getImageUrl("tcon.png")} alt="venom" />
                  </div>
                </div>
              </div>
            }
            {!data.published && <h5>
              Please make sure you have atleast <span>{numberWithCommas(data.presaleAmount + (data.liquidity * data.presaleAmount / 100))}</span> {data.stakeTokenSymbol} Tokens
              in your wallet for presale tokens and liquidity tokens
            </h5>}
            {data.published && <div className={styles.dets}>
              <div>
                <span>Sale Link:</span>
                <p onClick={() => navigate("/launchpad/" + data.saleAddress)}>
                  Visit Page
                </p>
              </div>
            </div>}
            {!data.deployed && (

              <div className={styles.deploy}>

                <button onClick={() => getDeployBody(dispatch, data.saleAddress, address, tonConnectUI, data.tokenAddress)}>Deploy ICO</button>
                <button onClick={() => deleteICO(dispatch, data.saleAddress, address)}>Delete ICO</button>
                <div onClick={() => checkDeployed(dispatch, data.saleAddress)}>
                  <p>Refresh </p>
                  <img src={getImageUrl("refresh.png")} alt="refresh" />
                </div>
              </div>
            )}
            {data.deployed && !data.published && (
              <div className={styles.error}>

                <div className={styles.pubref}>
                  <button onClick={() => publishSale(dispatch, tonConnectUI, data.tokenAddress, address, Number((new BigNumber(data.presaleAmount + (data.liquidity * data.presaleAmount / 100)).shift(Number(data.tokenDecimals))).toFixed()), data.saleAddress)}>Publish Sale</button>
                  <div onClick={() => checkPublished(dispatch, data.saleAddress)}>
                    <p>Refresh </p>
                    <img src={getImageUrl("refresh.png")} alt="refresh" />
                  </div>
                </div>
              </div>
            )}
            {(!data.refund || data.raised >= data.softcap) && saleData._saleOver && !saleData._reconciled ? (
              <div className={styles.border1}>
                <div className={styles.bg1}>
                  <button
                    onClick={() =>
                      claimVenom(dispatch, tonConnectUI, data.saleAddress)
                    }
                  >
                    Claim TON
                  </button>
                </div>
              </div>
            ) : (
              <></>
            )}
            {data.deployed && data.type === "private" && <button className={styles.wl} onClick={() => { setShowWl(true) }}>Manage Whitelist</button>}
          </div>
        </div>
        {/* //
      Tooltip
      Section
      // */}
        <Tooltip style={{ fontSize: "8px" }} anchorSelect="#website" place="top">
          Website Link
        </Tooltip>
        <Tooltip style={{ fontSize: "8px" }} anchorSelect="#twitter" place="top">
          Twitter Link
        </Tooltip>
        <Tooltip style={{ fontSize: "8px" }} anchorSelect="#telegram" place="top">
          Telegram Link
        </Tooltip>
        <Tooltip style={{ fontSize: "8px" }} anchorSelect="#discord" place="top">
          Discord Link
        </Tooltip>
        <Tooltip style={{ fontSize: "8px" }} anchorSelect="#medium" place="top">
          Medium Link
        </Tooltip>
        <Tooltip style={{ fontSize: "8px" }} anchorSelect="#audit" place="top">
          Audit Completed
        </Tooltip>
        <Tooltip style={{ fontSize: "8px" }} anchorSelect="#kyc" place="top">
          KYC completed
        </Tooltip>
        <Tooltip
          style={{ fontSize: "8px" }}
          anchorSelect="#affiliate"
          place="top"
        >
          Affiliate fee
        </Tooltip>
      </div>
      {showWl ? <Whitelist data={data} setShowWl={setShowWl} /> : <></>}
    </>

  );
};

export default Card;

Card.propTypes = {
  data: PropTypes.object,
  venomProvider: PropTypes.object,
  address: PropTypes.string,
  pubKey: PropTypes.string,
};
