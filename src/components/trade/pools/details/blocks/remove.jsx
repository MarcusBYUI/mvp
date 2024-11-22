import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";
import { calcLpOut, getLpBalance, RemoveLp, RemoveStuckAdmin } from "../../helper";
import styles from "./blocks.module.css"
import PercentageSlider from "./slider/slider";
import { useEffect, useState } from "react";
import { numberToDecimals } from "../../../../../helpers/utils";
import { notificationActions } from "../../../../../store/notification/notification";
import { useDispatch } from "react-redux";
import numberWithCommas from "../../../../../helpers/commaSeperator";


const Remove = ({ data }) => {
    const dispatch = useDispatch()
    const [tonConnectUI] = useTonConnectUI();
    const [info, setInfo] = useState(0)
    const [value, setValue] = useState(0);
    const [lpOut, setLpOut] = useState({
        amount0: 0,
        amount1: 0
    })
    const address = useTonAddress()
    useEffect(() => {
        //check content of pool child for user
        if (address.length == 0) return;
        let abortController;
        (async function () {
            abortController = new AbortController();
            const balance = await getLpBalance(data.address, address)
            setInfo(balance)

        })();
        return () => abortController.abort();
    }, [address, data]);

    useEffect(() => {
        setLpOut(calcLpOut((value / 100) * info, data))
    }, [value, data, info])

    const handleRemoveLp = async () => {
        try {
            dispatch(notificationActions.setNotify(true));
            await RemoveLp(tonConnectUI, data.address, address, value, info)
            dispatch(notificationActions.setMessage("Lp Removed"));
        } catch (error) {
            dispatch(notificationActions.setNotify(false));
        }
    }


    return (
        <div className={`${styles.remove}`}>
            <p>Remove Lp</p>
            <span>{numberWithCommas(numberToDecimals(info / (10 ** 9), 9))}</span>
            <PercentageSlider value={value} setValue={setValue} />
            <div>
                <span>{data.symbolA}</span>
                <span>{numberWithCommas(numberToDecimals(lpOut?.amount0 / 10 ** data.decimalA, 9))}</span>
            </div>
            <div>
                <span>{data.symbolB}</span>
                <span>{numberWithCommas(numberToDecimals((lpOut?.amount1 / 10 ** data.decimalB), 9))}</span>

            </div>
            <button style={{ background: value > 0 ? "#12AAFF" : "#2D2D2D" }} onClick={handleRemoveLp}>Remove Lp</button>
        </div>
    );
}

export default Remove;
