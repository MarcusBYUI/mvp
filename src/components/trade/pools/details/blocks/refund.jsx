import { useEffect, useState } from "react";
import { checkPairChildInfo, getGetPairchild, RemoveStuckAdmin, RemoveStuckLp } from "../../helper";
import styles from "./blocks.module.css"
import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";
import Skeleton from "react-loading-skeleton";
import numberWithCommas from "../../../../../helpers/commaSeperator";
import { notificationActions } from "../../../../../store/notification/notification";
import { useDispatch } from "react-redux";

const Refund = ({ data }) => {
    const address = useTonAddress()
    const [info, setInfo] = useState()
    const [tonConnectUI] = useTonConnectUI();
    const dispatch = useDispatch()

    useEffect(() => {
        //check content of pool child for user
        if (address.length == 0) return;
        let abortController;
        (async function () {
            abortController = new AbortController();
            const childAddress = await getGetPairchild(data.addressf, address)
            const childInfo = await checkPairChildInfo(childAddress)
            setInfo({...childInfo, childAddress: childAddress.toString()})

        })();
        return () => abortController.abort();
    }, [address, data]);

    const handleRefund = async () => {
        try {
            dispatch(notificationActions.setNotify(true));
            await RemoveStuckLp(tonConnectUI, info.childAddress)
            //await RemoveStuckAdmin(tonConnectUI, info.childAddress)
            dispatch(notificationActions.setMessage("Refund Sent"));
        } catch (error) {
            dispatch(notificationActions.setNotify(false));
        }
    }

    return (
        <div className={styles.refund}>
            <p>Refunds</p>
            <div>
                <span>{data.symbolA}</span>
                {typeof info?.amount0 == "number" ? <span>{numberWithCommas(info.amount0 / 10 ** data.decimalA)}</span> : <Skeleton width={45} height={12} />}
            </div>
            <div>
                <span>{data.symbolB}</span>
                {typeof info?.amount1 == "number" ? <span>{numberWithCommas(info.amount1 / 10 ** data.decimalB)}</span> : <Skeleton width={45} height={12} />}
            </div>
            <button onClick={handleRefund} style={{ background: (info?.amount0 + info?.amount1) > 0 ? "#12AAFF" : "#2D2D2D" }}>Claim</button>
        </div>
    );
}

export default Refund;
