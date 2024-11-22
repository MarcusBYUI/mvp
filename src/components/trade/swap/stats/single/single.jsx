import { useEffect, useState } from "react";
import { imageStore } from "../../../../../helpers/config";
import styles from "./single.module.css"
import { getPairDet } from "../helper";
import Skeleton from "react-loading-skeleton";
import { useNavigate, useParams } from "react-router";


import AppPagination from "../../../../pagination/pagination";
import { numberToTwoDecimals } from "../../../../../helpers/utils";
import ValidImage from "../../../../validImage/validImage";
import ReactTimeAgo from "react-time-ago";
import numberWithCommas from "../../../../../helpers/commaSeperator";
import Chart from "../../../../chart/chart";

const Single = () => {
    const [isLoading, setIsLoading] = useState(true)
    const params = useParams();
    const [data, setData] = useState({})
    const contract = params.contract;
    const [paginated, setPaginated] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        let abortController;
        (async function () {
            setIsLoading(true)
            abortController = new AbortController();
            const res = await getPairDet(contract, navigate, setIsLoading);
            const hist = res.history.sort((a, b)=>{
                return new Date(b.date).getTime() - new Date(a.date).getTime()
            })
            res.history = hist
            setData(res);
            setTimeout(() => {
                setIsLoading(false)
            }, 3000);

        })();
        return () => abortController.abort();
    }, [contract, navigate]);

    return (
        <div>
            <div className={styles.header}>
                <div>
                    <div>
                        {/* <ValidImage link={imageStore[data.symbolA]} alt={"logo"} locker={true} />
                        <ValidImage link={imageStore[data.symbolB]} alt={"logo"} locker={true} /> */}
                    </div>
                    <h3>{isLoading ? <Skeleton width="200px" /> : `${data.symbolA}-${data.symbolB}`}</h3>
                </div>
                <div>
                    <button onClick={() => navigate("/swap?inputCurrency=" + data.tokenA + "&outputCurrency=" + data.tokenB)}>Swap</button>
                    <button onClick={() => window.open("https://venomscan.com/accounts/" + data.address, "_blank")}>Venom Scan</button>
                </div>
            </div>
            <div className={styles.stats}>
                <div>
                    <p>Total Locked</p>
                    <div>
                        <ValidImage link={imageStore[data.symbolA]} alt={"logo"} locker={true} />
                        <span>{isLoading ? <Skeleton width="150px" /> : numberToTwoDecimals(numberWithCommas(data.reserveA))}</span>
                    </div>
                    <div>
                        <ValidImage link={imageStore[data.symbolB]} alt={"logo"} locker={true} />
                        <span>{isLoading ? <Skeleton width="150px" /> : numberToTwoDecimals(numberWithCommas(data.reserveB))}</span>
                    </div>
                </div>
                <div>
                    <p>Total Locked Value</p>
                    <div>
                        <span>${isLoading ? <Skeleton width="150px" /> : numberToTwoDecimals(numberWithCommas(data.valueLocked))}</span>
                    </div>

                </div>
                <div>
                    <p>1D Trade Volume</p>
                    <div>
                        <span>${isLoading ? <Skeleton width="150px" /> : numberToTwoDecimals(numberWithCommas(data.twentyFour))}</span>
                    </div>

                </div>
                <div>
                    <p>1W Trade Volume</p>
                    <div>
                        <span>${isLoading ? <Skeleton width="150px" /> : numberToTwoDecimals(numberWithCommas(data.oneWeek))}</span>
                    </div>

                </div>
            </div>
            {contract && <Chart pair={contract} />}
            {!isLoading && <div className={styles.history}>
                <h4>History</h4>
                <div className={styles.table}>
                    <div className={styles.hhead}>
                        <p>FROM</p>
                        <p>TO</p>
                        <p>IN</p>
                        <p>OUT</p>
                        <p>DATE</p>
                        <p>TX</p>
                    </div>
                    {isLoading ? <Skeleton width="100%" height={40} /> : paginated.length === 0 ? <h3 className={styles.notfound}>No History Found</h3> : paginated.map((item) => {
                        return <div className={styles.hbody} key={item.tx}>
                            <p>{item.tokenInSym}</p>
                            <p>{item.tokenOutSym}</p>
                            <p>{numberToTwoDecimals(numberWithCommas(item.amountIn))}</p>
                            <p>{numberToTwoDecimals(numberWithCommas(item.amountOutWithFee))}</p>
                            <p>{<ReactTimeAgo date={new Date(item.date).getTime()} locale="en-US" />}</p>
                            <button  onClick={() => window.open("https://venomscan.com/messages/" + item.tx, "_blank")}>View</button>
                        </div>
                    })}

                </div>
                <div className={styles.paginationContainer}>
                    <AppPagination callback={setPaginated} rawData={data?.history} pageSize={10} scroll={false} />
                </div>
            </div>}
            <div className={styles.traders}>
                <h4>Top Traders - 5days</h4>
                <div className={styles.table}>
                    <div className={styles.thead}>
                        <p>RANK</p>
                        <p>USER</p>
                        <p>VOLUME</p>
                    </div>
                    {isLoading ? <Skeleton width="100%" height={40} /> : data.topTraiders.length === 0 ? <h3 className={styles.notfound}>No Data Found</h3> : data.topTraiders.map((item, index) => {
                        return <div className={styles.tbody} key={index}>
                            <p>{index + 1}</p>
                            <p>{item.user}</p>
                            <p>${numberToTwoDecimals(numberWithCommas(item.volume))}</p>
                        </div>
                    })}

                </div>
            </div>

        </div>
    );
}

export default Single;
