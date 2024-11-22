import { getAPR, getImageUrl } from "../../../../helpers/utils";
import styles from "./card.module.css";
import PropTypes from "prop-types";
import numberWithCommas from "../../../../helpers/commaSeperator";
import { Tooltip } from "react-tooltip";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { stakeABI, tokenRootABI, tokenWalletABI } from "../../../../helpers/venomConnect"
import { useEffect, useState } from "react";
import ValidImage from "../../../validImage/validImage";
import { publishPool } from "../../../pool/helper";

const Card = ({ data, venomProvider, address }) => {
  const navigate = useNavigate();
  const now = new Date().getTime();
  let start = new Date(data.date);
  start.setDate(start.getDate() + Number(data.duration));
  const end = start.getTime();
  const dispatch = useDispatch()
  const [poolContractInstance, setPoolContractInstance] = useState()
  const [stakeWalletInstance, setStakeWalletInstance] = useState();
  const [stakeRootInstance, setStakeRootInstance] = useState()
  const { message } = useSelector(
    (state) => state.notification
  );

  useEffect(() => {
    if (!venomProvider || !data || !address) return;
    (async function () {
      const contr1 = new venomProvider.Contract(stakeABI, data.poolAddress);
      const stakeRoot = new venomProvider.Contract(
        tokenRootABI,
        data.rewardTokenAddress
      );

      const { value0: wallet } = await stakeRoot.methods
        .walletOf({
          answerId: 0,
          walletOwner: address,
        })
        .call();

      const contr2 = new venomProvider.Contract(
        tokenWalletABI,
        wallet._address
      );

      setPoolContractInstance(contr1);
      setStakeWalletInstance(contr2)
      setStakeRootInstance(stakeRoot)
    })()
  }, [data, venomProvider, address]);

  useEffect(() => {
    if (!poolContractInstance) return;
    let abortController;
    (async function () {
      abortController = new AbortController();



    })();
    return () => abortController.abort();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [poolContractInstance, message]);

  return (
    <div

      className={styles.border}
    >
      <div className={styles.bg}>
        <div className={styles.card}>
          <div className={styles.header}>
            <div>
              <h4>Earn {data.rewardTokenSymbol}</h4>
              <span>Stake {data.stakeTokenSymbol}</span>
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
            <div className={styles.logo}>
              <ValidImage link={data.rewardTokenLogo} alt="reward Token Logo" />
              <ValidImage link={data.stakeTokenLogo} alt="stake Token Logo" />
            </div>
          </div>

          <div className={styles.dets}>
            <div>
              <span>Ends In:</span>
              <p>{numberWithCommas((end - now) / 86400000)} days</p>
            </div>
            <div>
              <span>APR:</span>
              <p>
                {numberWithCommas(
                  getAPR(data.duration, data.supply, data.amountStaked)
                )}
                %
              </p>
            </div>
            <div>
              <span>Total Staked:</span>
              <p>{numberWithCommas(data.amountStaked)}</p>
            </div>
            {data.published ? <div>
              <span>Pool Link:</span>
              <p onClick={() => navigate("/earn/token/" + data.poolAddress)}>Visit Pool</p>
            </div> : <></>}
            {data.supplied ? <div>
              <span>Published:</span>
              <p>{data.published ? "Yes" : "Pending Reward Token Review"}</p>
            </div> : <></>}
          </div>

          {!data.supplied && (
            <div className={styles.error}>
              <h5>
                Please make sure you have atleast <span>{numberWithCommas(data.supply)}</span> {data.rewardTokenSymbol} Tokens
                in the wallet currently connected to complete your pool setup
              </h5>
              <button onClick={() => publishPool(dispatch, data.poolAddress, stakeWalletInstance, stakeRootInstance, data, address)}>Publish Pool</button>
            </div>
          )}
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
  );
};

export default Card;

Card.propTypes = {
  data: PropTypes.object,
  venomProvider: PropTypes.object, address: PropTypes.string
};
