import styles from "./details.module.css";
import { numberToDecimals, numberToTwoDecimals } from '../../../../../helpers/utils';
import numberWithCommas from "../../../../../helpers/commaSeperator";
import { CiWarning } from "react-icons/ci";

const Details = ({ swapInfo, tokenIn, tokenOut }) => {
    const arrows = ' >> '

    return (
        swapInfo?.length > 0 && tokenIn && <>
            {(!tokenIn.verified || !tokenOut.verified) ? <div className={styles.warning}>
                <CiWarning />
                <p>You trade {!tokenIn.verified && tokenIn.symbol} {!tokenIn.verified && !tokenOut.verified && " & "} {!tokenOut.verified && tokenOut.symbol} at your own risk. Anyone can create an asset, including fake versions of existing assets</p>
            </div> : <></>}
            <div className={styles.details}>
                <p>Swap Breakdown</p>
                <div>
                    <span>Exchange rate</span>
                    <p>{numberWithCommas(numberToTwoDecimals(1))} {tokenIn.symbol.toUpperCase()} ~ {numberWithCommas(numberToTwoDecimals(88782.885224))} {tokenOut.symbol.toUpperCase()}</p>
                </div>
                <div>
                    <span>Minimum received</span>
                    <p>{numberWithCommas(numberToDecimals(swapInfo[swapInfo.length - 1].amountOut, tokenOut.decimals))} {tokenOut.symbol.toUpperCase()}</p>
                </div>
                <div>
                    <span>Price Impact</span>
                    <div>
                        {
                            swapInfo.map((item, index) => {
                                if (index > 0) {
                                    return <p style={{color: item.impact > 4 ? "red" : item.impact > 2 ? "yellow" : "#00dc00"}} key={index}>{arrows + numberToTwoDecimals(item.impact)}%</p>
                                } else {
                                    return <p style={{color: item.impact > 4 ? "red" : item.impact > 2 ? "yellow" : "#00dc00"}} key={index}>{numberToTwoDecimals(item.impact)}%</p>
                                }
                            })
                        }
                    </div>
                
                </div>
                <div>
                    <span>Max slippage</span>
                    <p>1%</p>
                </div>
                <div>
                    <span>Route(s)</span>
                    <p>{
                        swapInfo.map((item, index) => {
                            if (index > 0 && index == swapInfo.length - 1) {
                                return arrows + item.outSym.toUpperCase()
                            } else {

                                return item.inSym.toUpperCase() + arrows + item.outSym.toUpperCase()
                            }
                        })
                    }</p>
                </div>

            </div>


        </>

    );
}

export default Details;
