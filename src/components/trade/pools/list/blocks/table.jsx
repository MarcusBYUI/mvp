import { useEffect, useState } from "react";
import styles from "./blocks.module.css"
import { getPairList } from "../../helper";
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";

const Table = () => {
    const [list, setList] = useState()
    const navigate = useNavigate()
    useEffect(() => {
        let abortController;
        (async function () {
            abortController = new AbortController();
            //get pair info from backend
            const res = await getPairList()
            setList(res)
        })();
        return () => abortController.abort();
    }, []);

    return (
        <div className={styles.table}>
            <div className={styles.head}>
                <p>Pools</p>
                <p>TVL</p>
                <p>24hrs Volume</p>
            </div>
            {!list ? <><Skeleton height={35} style={{ marginTop: 5 }} /><Skeleton height={35} style={{ marginTop: 5 }} /><Skeleton height={35} style={{ borderRadius: "0 0 20px 20px", marginTop: 5 }} /></> :
                list.length == 0 ? <p>No pairs found</p> :
                    list.map((item) => {
                        return <div onClick={()=>navigate("/pools/" + item.addressf)} key={item.pair_id} className={styles.card}>
                            <div>
                                <div>
                                    <img src={item.imageA} alt="" />
                                    <img src={item.imageB} alt="" />
                                </div>
                                <p>{item.symbolA}/{item.symbolB}</p>
                            </div>
                            <p>$80,000,000</p>
                            <p>$80,000</p>
                        </div>
                    })}
        </div>
    );
}

export default Table;
