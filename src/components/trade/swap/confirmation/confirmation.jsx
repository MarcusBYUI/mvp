import { useDispatch } from "react-redux";
import styles from "./confirmation.module.css"
import { swapTon, swapToken } from '../helper';
import { TONADDRESS } from "../../config";
import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";
import useOutsideAlerter from "../../../../hooks/useOutsideClick";
import { useRef } from "react";
import Details from "../swap/details/details";
import { notificationActions } from "../../../../store/notification/notification";

const Confirmation = ({ swapInfo, tokenIn, tokenOut, animate, closePop }) => {
    const dispatch = useDispatch()
    const [tonConnectUI] = useTonConnectUI();
    const address = useTonAddress()
    const containerRef = useRef(null)
    useOutsideAlerter(containerRef, containerRef, () => closePop())

    const handleswap = async () => {
        // await swapToken(dispatch, address, venomProvider, from.root, data[0].pair, info?.fromAmount, from.decimal, to.decimal, info?.minimum, data)
        if (swapInfo.length > 0) {
            try {
                dispatch(notificationActions.setNotify(true))
                
                if (tokenIn.address == TONADDRESS) {
                    //send in TON
                    await swapTon(tonConnectUI, tokenIn, swapInfo, address)

                } else {
                    //send in token
                    await swapToken(tonConnectUI, tokenIn, swapInfo, address)
                }
                closePop()
                dispatch(notificationActions.setMessage("Swap Submitted"))

            } catch (error) {
                dispatch(notificationActions.setNotify(false))

            }

        }
    }

    return (
        <div className={`${styles.confirmation} ${animate ? styles.show : ""}`}>
            <div ref={containerRef} className={styles.container}>
                <h3>Confirmation</h3>
                <div className={styles.token}>
                    <img src={tokenIn.logo} alt={tokenIn.symbol} />
                    <p>{tokenIn.symbol}</p>
                    <span>{tokenIn.amount}</span>
                </div>
                <div className={styles.token}>
                    <img src={tokenOut.logo} alt={tokenOut.symbol} />
                    <p>{tokenOut.symbol}</p>
                    <span>{tokenOut.amount}</span>
                </div>
                <Details swapInfo={swapInfo} tokenIn={tokenIn} tokenOut={tokenOut} />
                <button onClick={handleswap}>Swap</button>
            </div>
        </div>
    );
}

export default Confirmation;
