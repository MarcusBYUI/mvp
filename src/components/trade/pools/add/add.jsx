import { useEffect, useState } from "react";
import Selected from "../../swap/swap/selected/selected";
import styles from "./add.module.css"
import { IoIosArrowBack } from "react-icons/io";
import UsePopup from "../../../../hooks/swap/usePopup";
import Details from "./details/details";
import Tokens from "../../swap/tokens/tokens";
import { updateAmount } from "../../swap/helper";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TailSpin } from 'react-loader-spinner';
import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";
import { getPairInfo, handleAddLp, handleCreatePair, handleDepositTokens, handleJoinPair } from "../helper";
import { notificationActions } from "../../../../store/notification/notification";

const Add = () => {
    const [tonConnectUI] = useTonConnectUI();
    const { notify } = useSelector(
        (state) => state.notification
    );
    const { callback, animate, state, openPop, closePop } = UsePopup()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const address = useTonAddress()
    const [pairInfo, setPairInfo] = useState()
    const { tokens } = useSelector((state) => state.swap);
    const [tokenIn, setTokenIn] = useState()
    const [tokenOut, setTokenOut] = useState()
    const dispatch = useDispatch()
    const [tokenAdded, setTokenAdded] = useState(false)

    useEffect(() => {
        if (tokenIn?.balance != tokens[0]?.balance) {
            if (tokenIn && tokenIn?.address != tokens[0]?.address) return;
            setTokenIn(tokens[0])
        }

        if (tokenOut?.balance != tokens[1]?.balance) {
            if (tokenOut && tokenOut?.address != tokens[1]?.address) return;

            setTokenOut(tokens[1])
        }

    }, [tokens, tokenIn, tokenOut, address])

    useEffect(() => {
        let abortController;
        (async function () {
            abortController = new AbortController();
            setLoading(true)
            //get pair info from backend
            try {
                if (!notify) {
                    const res = await getPairInfo(tokenIn, tokenOut, address)
                    setPairInfo(res)
                }
                setLoading(false)
            } catch (error) {
                setLoading(false)
            }

        })();
        return () => abortController.abort();
    }, [tokenIn?.address, tokenOut?.address, address, notify]);

    const handleCreate = async () => {
        if (loading || address.length == 0) return;

        //pool creation
        if (!pairInfo.created) {
            dispatch(notificationActions.setNotify(true));
            await handleCreatePair(tonConnectUI, pairInfo.creator)
            dispatch(notificationActions.setNotify(false));
        }

    }


    const handleJoin = async () => {
        if (pairInfo?.created && !pairInfo?.child) {
            dispatch(notificationActions.setNotify(true));
            await handleJoinPair(tonConnectUI, pairInfo)
            dispatch(notificationActions.setNotify(false));
        }

    }


    const handleDeposit = async () => {

        if (pairInfo?.created && pairInfo?.child && Number(tokenIn.amount) > 0 && Number(tokenOut.amount) > 0) {
            dispatch(notificationActions.setNotify(true));
            try {
                await handleDepositTokens(tonConnectUI, tokenIn, tokenOut, pairInfo, address)
                setTokenAdded(true)
                dispatch(notificationActions.setNotify(false));
            } catch (error) {
                dispatch(notificationActions.setNotify(false));
            }

        }

    }

    const handleAdd = async () => {

        if (pairInfo?.created && pairInfo?.child) {
            try {
                dispatch(notificationActions.setNotify(true));
                await handleAddLp(tonConnectUI, pairInfo)
                dispatch(notificationActions.setNotify(false));
            } catch (error) {
                dispatch(notificationActions.setNotify(false));
            }
        }

        // if (pairInfo?.created && pairInfo?.child && Number(tokenIn.amount) == 0 && Number(tokenOut.amount) == 0) {
        //     RemoveStuckLp(tonConnectUI, pairInfo.child)
        // }
    }


    //checkPairInfo("kQCV2sqKvn8K174jwmwPWATB7IxKTrrTrIokoA3BKQ6w4BVE") 
    //checkPairChildInfo("kQCA-WMkrsIqFAOhmr_sWWSm-dO-UVRF9routSbOVrEn62XI")



    return (
        <div className={styles.add}>
            <div onClick={() => navigate("/pools")} className={styles.back}>
                <IoIosArrowBack />
                <span>Back</span>
            </div>

            <h4>Provide liquidity</h4>
            <span>Earn on all trades, based on your share of the liquidity pool.</span>

            <div className={styles.lp}>
                <Selected text="Asset 1" openPop={() => openPop({ token: tokenIn, other: tokenOut, setToken: setTokenIn })} data={tokenIn} updateAmount={(amount) => updateAmount(amount, tokenIn, setTokenIn)} />
                <div className={styles.divider}>
                    <hr />
                </div>
                <Selected text="Asset 2" openPop={() => openPop({ token: tokenOut, other: tokenIn, setToken: setTokenOut })} data={tokenOut} updateAmount={(amount) => updateAmount(amount, tokenOut, setTokenOut)} />
                <div className={styles.divider}>
                    <hr />
                </div>
                <Details />
                {pairInfo && !pairInfo?.created ? <button onClick={handleCreate}>{loading ? <TailSpin
                    height="20"
                    width="20"
                    color="#fff"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                    wrapperStyle={{ justifyContent: "center" }}
                    wrapperClass=""
                    visible={true}
                /> : "Create Pool"}</button> : <></>}
                {pairInfo && pairInfo?.created ? <div className={styles.action}>
                    <div>
                        <button onClick={handleJoin} className={pairInfo?.created && !pairInfo?.child ? styles.active : ""} style={{ opacity: pairInfo?.created && !pairInfo?.child ? 1 : 0.2 }}>{loading ? <TailSpin
                            height="20"
                            width="20"
                            color="#fff"
                            ariaLabel="tail-spin-loading"
                            radius="1"
                            wrapperStyle={{ justifyContent: "center" }}
                            wrapperClass=""
                            visible={true}
                        /> : "Join Pool"}</button>
                        <button onClick={handleDeposit} className={pairInfo?.created && pairInfo?.child && !tokenAdded ? styles.active : ""} style={{ opacity: pairInfo?.created && pairInfo?.child && !tokenAdded ? 1 : 0.2 }}>{loading ? <TailSpin
                            height="20"
                            width="20"
                            color="#fff"
                            ariaLabel="tail-spin-loading"
                            radius="1"
                            wrapperStyle={{ justifyContent: "center" }}
                            wrapperClass=""
                            visible={true}
                        /> : (Number(tokenIn?.amount) == 0 || Number(tokenOut?.amount) == 0) ? "Input Amount" : "Deposit Tokens"}</button>
                    </div>
                    <button onClick={handleAdd}>Add Liquidity</button>
                </div> : <></>}
            </div>
            {state ? <Tokens callback={callback} animate={animate} closePop={closePop} setToken /> : <></>}
        </div>
    );
}

export default Add;
