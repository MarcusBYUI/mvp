import styles from "./swap.module.css"
import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";
import Selected from "./swap/selected/selected";
import { getImageUrl } from "../../../helpers/utils";
import Cashback from "./swap/cashback/cashback";
import Details from "./swap/details/details";
import '../../../index.css';
import { useEffect, useState } from "react";
import { getQuote, switchTokens, updateAmount } from "./helper";
import Tokens from "./tokens/tokens";
import UsePopup from "../../../hooks/swap/usePopup";
import { useSelector } from "react-redux";
import { TailSpin } from 'react-loader-spinner';
import Confirmation from "./confirmation/confirmation";

const Swap = () => {
    const { callback, animate, state, openPop, closePop } = UsePopup()
    const { animate: Canimate, state: Cstate, openPop: CopenPop, closePop: CclosePop } = UsePopup()
    const { tokens } = useSelector((state) => state.swap);
    const address = useTonAddress()
    const [swapInfo, setSwapInfo] = useState([])
    const [loading, setLoading] = useState(false)
    const [tokenIn, setTokenIn] = useState()

    const [tokenOut, setTokenOut] = useState()

    useEffect(() => {
        let abortController;
        (async function () {
            abortController = new AbortController();
            if (tokenIn?.amount > 0) {
                setLoading(true)
                const swapInfo = await getQuote(tokenIn.address, tokenOut.address, tokenIn.amount * 10 ** tokenIn.decimals)
                setSwapInfo(swapInfo);
                if (swapInfo) {
                    setTokenOut((prev) => { return { ...prev, amount: swapInfo[swapInfo.length - 1].amountOut } })
                } 
                setLoading(false)
            }

        })();
        return () => abortController.abort();
    }, [tokenIn, tokenOut?.address])

    useEffect(() => {
        if (!tokens) return;

            if (tokenIn) {
                const currentToken = {...tokens.find((token)=> token.address == tokenIn.address)}
                currentToken.amount = tokenIn.amount
                setTokenIn(currentToken)
            }else{
                setTokenIn(tokens[0])
            }

            if (tokenOut) {
                const currentToken = {...tokens.find((token)=> token.address == tokenOut.address)}
                currentToken.amount = tokenOut.amount
                setTokenOut(currentToken)
            }else{
                setTokenOut(tokens[1])
            }

    }, [tokens, tokenIn?.address, tokenOut?.address, address])

    const handleSwap = async()=>{
        //await sendToken(tonConnectUI, "UQCOOO4PZC_mZ5CiCEJmBWTWdLx0mlq-D2yd_xjdUgktNcyU", address)
        if (swapInfo?.length > 0) {
            CopenPop()
        }
    }


    //we would refresh every time we can
    //get ton balance

    return (
        <>
            <div className={styles.swap}>
                <Cashback />
                <Selected text="From" openPop={() => openPop({ token: tokenIn, other: tokenOut, setToken: setTokenIn })} data={tokenIn} updateAmount={(amount) => updateAmount(amount, tokenIn, setTokenIn)} />
                <div className={styles.divider}>
                    <hr />
                    <img onClick={() => switchTokens(tokenIn, tokenOut, setTokenIn, setTokenOut)} src={getImageUrl("switch.png")} alt="switch" />
                </div>
                <Selected text="To" read={true} openPop={() => openPop({ token: tokenOut, other: tokenIn, setToken: setTokenOut })} data={tokenOut} updateAmount={(amount) => updateAmount(amount, tokenOut, setTokenOut)} />
                <div className={styles.divider}>
                    <hr />
                </div>
                
                <button onClick={handleSwap}>{loading ? <TailSpin
                    height="20"
                    width="20"
                    color="#fff"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                    wrapperStyle={{ justifyContent: "center" }}
                    wrapperClass=""
                    visible={true}
                /> : !swapInfo ? "No Liquidity found" : "Swap"}</button>
                <Details swapInfo={swapInfo} tokenIn={tokenIn} tokenOut={tokenOut} />
            </div>
            {state ? <Tokens callback={callback} animate={animate} closePop={closePop} /> : <></>}
            {Cstate ? <Confirmation animate={Canimate} closePop={CclosePop} swapInfo={swapInfo} tokenIn={tokenIn} tokenOut={tokenOut} /> : <></>}
        </>
    );
}

export default Swap;
