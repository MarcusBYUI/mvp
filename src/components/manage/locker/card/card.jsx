import styles from "./card.module.css";
import PropTypes from "prop-types";
import numberWithCommas from "../../../../helpers/commaSeperator";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { tokenRootABI, tokenWalletABI } from "../../../../helpers/venomConnect"
import { useEffect, useState } from "react";
import ValidImage from "../../../validImage/validImage";
import { publishLocker, sendToken, updateLock } from "../../../locker/helper";
import { getImageUrl } from "../../../../helpers/utils";

const Card = ({ data, venomProvider, address }) => {
  const navigate = useNavigate();
  let start = new Date(data.date);
  start.setDate(start.getDate() + Number(data.duration));
  const dispatch = useDispatch()
  const [rootWalletInstance, setRootWalletInstance] = useState();
  const [lockRootInstance, setLockRootInstance] = useState()
;

  useEffect(() => {
    if (!venomProvider || !data || !address) return;
    (async function () {
      const lockRoot = new venomProvider.Contract(
        tokenRootABI,
        data.lockTokenRoot
      );

      const { value0: wallet } = await lockRoot.methods
        .walletOf({
          answerId: 0,
          walletOwner: address,
        })
        .call();

      const contr2 = new venomProvider.Contract(
        tokenWalletABI,
        wallet._address
      );
      setRootWalletInstance(contr2)
      setLockRootInstance(lockRoot)
    })()
  }, [data, venomProvider, address]);


  return (
    <div

      className={styles.border}
    >
      <div className={styles.bg}>
        <div className={styles.card}>
          <div className={styles.header}>
            <div>
              <h4>{data.lockRootSymbol}</h4>
              <span>{data.name} Locker</span>
            </div>
            <div className={styles.logo}>
              <ValidImage link={data.logo} alt={"logo"} locker={true} />

            </div>
          </div>

          <div className={styles.lockerM}>
            {data.locks.map((item, index) => {
              return <div key={index}>
                <span>Lock {index + 1}</span>
                <div>
                  <p>Amount: <strong>{numberWithCommas(item.amount)}</strong></p>
                  <div className={styles.buttonContainer}>

                  <button onClick={()=>sendToken(dispatch, data.lockContract, rootWalletInstance, lockRootInstance, data, item, address)} style={{opacity: item.supplied ? 0.4 : 1}} disabled={item.supplied}>{item.supplied ? "Supplied" : "Send"}</button>
                  {!item.supplied && <img onClick={()=>updateLock(dispatch,item,data)} className={styles.refresh} src={getImageUrl("refresh.png")} alt="refresh" />}
                </div>
                  </div>
              </div>
            })}
          </div>

          {data.published ?  <div className={styles.dets}>
              <div>
              <span>Locker Link:</span>
              <p onClick={() => navigate("/locker/" + data.lockContract)}>Visit Locker</p>
            </div>
          </div> : <></>
          }


          {!data.published && (
            <div className={styles.error}>
              <h5>
                Please make sure you have completed sending all tokens above before attempting to publish
              </h5>
              <button onClick={() => publishLocker(dispatch, data)}>Publish Pool</button>
            </div>
          )}
        </div>
      </div>
     
    </div>
  );
};

export default Card;

Card.propTypes = {
  data: PropTypes.object,
  venomProvider: PropTypes.object, address: PropTypes.string
};
