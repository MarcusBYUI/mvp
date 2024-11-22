import { useContext, useEffect, useState } from "react";
import styles from "./history.module.css"
import ReactTimeAgo from "react-time-ago";
import { getHistory } from "../helper";
import { MyContext } from "../../../../helpers/mycontext";
import { useDispatch, useSelector } from "react-redux";
import { swapActions } from "../../../../store/swap/swap";

const History = () => {

    const { address } = useContext(MyContext);
    const [data, setData] = useState([])
    const { history } = useSelector((state) => state.swap)
    const dispatch = useDispatch()
    const { message } = useSelector(
        (state) => state.notification
    );
    //get fee from backend
    useEffect(() => {
        if (!address) {
            return
        }
        let abortController;
        (async function () {
            abortController = new AbortController();
            setTimeout(async () => {
                const history = await getHistory(address)
                setData(history)
            }, 3000);
        })();
        return () => abortController.abort();
    }, [address, message]);
    return (
        <div className={`${styles.overlay} ${history ? styles.soverlay : ""}`}>
            <div className={styles.container}>
                <div className={styles.control}>
                    <span>History</span>
                    <p onClick={() => dispatch(swapActions.setHistory(false))}>Close</p>
                </div>
                <div className={styles.summary}>
                    <div className={styles.info}>
                        {data && data.map((item, index) => {
                            return <div className={styles.card} key={index}>
                                <p>Swapped <strong> {item.amountIn} {item.tokenInSym.toUpperCase()} </strong> for <strong> {item.amountOutWithFee} {item.tokenOutSym.toUpperCase()} </strong></p>
                                {<ReactTimeAgo date={new Date(item.date).getTime()} locale="en-US" />}
                                <a target="_blank" rel="noreferrer" href={"https://venomscan.com/messages/" + item.tx} >Tx</a>
                            </div>
                        })}

                    </div>
                </div>
            </div>
        </div>
    );
}

export default History;
