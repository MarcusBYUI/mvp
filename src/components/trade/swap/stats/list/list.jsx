import styles from "./list.module.css"
import { useEffect, useState } from "react";
import { getPair } from "../helper";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { getImageUrl, numberToTwoDecimals } from "../../../../../helpers/utils";
import numberWithCommas from "../../../../../helpers/commaSeperator";
import AppPagination from '../../../../pagination/pagination';
import ValidImage from '../../../../validImage/validImage';
import { imageStore } from "../../../../../helpers/config";

const List = () => {
    const navigate = useNavigate()
    const [search, setSearch] = useState("")
    const [prepped, setPrepped] = useState([])
    const [paginated, setPaginated] = useState([])
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [sort, setSort] = useState({
        type: "vol",
        value: "dsc"
    })
    const handleSort = (type) => {
        if (type === "vol") {
            if (sort.type === "vol") {
                if (sort.value === "asc") {
                    setSort({
                        type: "vol",
                        value: "dsc"
                    })
                } else {
                    setSort({
                        type: "vol",
                        value: "asc"
                    })
                }
            } else {
                setSort({
                    type: "vol",
                    value: "asc"
                })
            }
        } else if (type === "tvl") {
            if (sort.type === "tvl") {
                if (sort.value === "asc") {
                    setSort({
                        type: "tvl",
                        value: "dsc"
                    })
                } else {
                    setSort({
                        type: "tvl",
                        value: "asc"
                    })
                }
            } else {
                setSort({
                    type: "tvl",
                    value: "asc"
                })
            }
        }
    }
    //get locker from backend
    useEffect(() => {
        let abortController;
        (async function () {
            setIsLoading(true)
            abortController = new AbortController();
            const res = await getPair();
            setData(JSON.parse(res[0].data));
            setTimeout(() => {
                setIsLoading(false)
            }, 3000);

        })();
        return () => abortController.abort();
    }, []);


    useEffect(() => {
        if (!data) {
            return
        }
        if (data && !data.pairs) {
            return
        }
        const arr = [...data.pairs]
        //sort
        const sorted = arr.sort((a, b) => {
            if (sort.type === "vol" && sort.value === "asc") {
                return a.twentyFourVol - b.twentyFourVol
            } else if (sort.type === "vol" && sort.value === "dsc") {
                return b.twentyFourVol - a.twentyFourVol
            } else if (sort.type === "tvl" && sort.value === "asc") {
                return a.twentyFourTVL - b.twentyFourTVL
            } else if (sort.type === "tvl" && sort.value === "dsc") {
                return b.twentyFourTVL - a.twentyFourTVL
            }
        })


        //search

        if (search.length > 0) {
            let searched = sorted.filter((item) => item.tokenA.toLowerCase().includes(search.toLowerCase()) || item.tokenB.toLowerCase().includes(search.toLowerCase()) || item.symbolA.toLowerCase().includes(search.toLowerCase()) || item.symbolB.toLowerCase().includes(search.toLowerCase()))
            setPrepped(searched)
        } else {
            setPrepped(sorted)
        }


    }, [data, search, sort])


    return (
        <HelmetProvider>

            <Helmet>
                <title>Impulse Swap Analytics | Impulse Finance</title>
                <meta name="description" content="Impulse Swap Analytics to help display a list of all token pairs on Impulse Finance" />
                <meta property="og:title" content="Impulse Swap Analytics | Impulse Finance" />
                <meta property="og:description" content="Impulse Swap Analytics to help display a list of all token pairs on Impulse Finance" />
            </Helmet>

            <div className={styles.list}>
                <div className={styles.stats}>
                    <div>
                        <img loading="lazy" src={getImageUrl("day.png")} alt="daily" />
                        <div>
                            <p>{isLoading ? <Skeleton /> : "$" + numberWithCommas(data.twentyFour)}</p>
                            <span>24hrs Volume</span></div>
                    </div>
                    <div>
                        <img loading="lazy" src={getImageUrl("all.png")} alt="all time" />
                        <div>
                            <p>{isLoading ? <Skeleton /> : "$" + numberWithCommas(data.allTimeVol)}</p>
                            <span>All Time Volume</span></div>
                    </div>
                    <div>
                        <img loading="lazy" src={getImageUrl("dol.png")} alt="tvl" />
                        <div>
                            <p>{isLoading ? <Skeleton /> : "$" + numberWithCommas(data.allTimeTVL)}</p>
                            <span>Total Value Locked</span></div>
                    </div>
                </div>


                <div className={styles.table}>
                    <div className={styles.search}>
                        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search Contract address, Token name" />

                    </div>
                    <div className={styles.head} style={{ paddingBottom: isLoading ? "20px" : "5px" }}>
                        <p>Name</p>
                        <div>
                            <p onClick={() => handleSort("vol")}>24H Volume</p>
                            <img src={getImageUrl("sort.png")} alt="sort" />
                        </div>
                        <div>
                            <p onClick={() => handleSort("tvl")}>TVL</p>
                            <img src={getImageUrl("sort.png")} alt="sort" />
                        </div>
                        <p></p>
                    </div>


                    {isLoading ? <Skeleton width="100%" height={40} /> : paginated.length === 0 ? <h3 className={styles.notfound}>Nothing Found</h3> : paginated.map((item, index) => {
                        return <div key={item.pair_id} className={`${styles.body} ${index % 2 === 0 ? styles.bodybg : ""}`}>
                            <div>
                                <div className={styles.imgcon}>
                                    <ValidImage link={imageStore[item.symbolA]} alt={"logo"} locker={true} />
                                    <ValidImage link={imageStore[item.symbolB]} alt={"logo"} locker={true} />
                                </div>
                                <span>{item.symbolA}-{item.symbolB}</span>
                            </div>
                            <span>${numberWithCommas(numberToTwoDecimals(item.twentyFourVol))}</span>
                            <span>${numberWithCommas(numberToTwoDecimals(item.twentyFourTVL))}</span>
                            <div>
                                <button onClick={() => navigate("/swap?inputCurrency="+ item.tokenA + "&outputCurrency=" + item.tokenB)}>Swap</button>
                                <button onClick={() => navigate(item.address)}>View</button>
                            </div>

                        </div>
                    })}

                </div>

                <div className={styles.paginationContainer}>
                    <AppPagination callback={setPaginated} rawData={prepped} pageSize={20} />
                </div>

            </div>
        </HelmetProvider>

    );
}

export default List;
