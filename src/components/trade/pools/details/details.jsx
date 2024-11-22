import Charts from "./blocks/charts";
import Title from "./blocks/title";
import styles from "./details.module.css"
import Manage from './blocks/manage';
import Refund from './blocks/refund';
import Remove from "./blocks/remove";
import Rates from "./blocks/rates";
import Stats from "./blocks/stats";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPairById } from "../helper";
import Loader from "./blocks/loader";
import { useSelector } from "react-redux";
const Details = () => {
    const param = useParams()
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)
    const { message } = useSelector(
        (state) => state.notification
    );
    useEffect(() => {
        let abortController;
        (async function () {
            abortController = new AbortController();
            //get pair info from backend
            const res = await getPairById(param.contract)
            setData(res)
            setLoading(false)
        })();
        return () => abortController.abort();
    }, [param.contract, message]);

    return (
        <div className={styles.details}>
            {loading ? <Loader /> : <>
                <Title data={data}/>
                <Manage />
                <Charts />
                <Rates />
                <Refund data={data}/>
                <Stats data={data}/>
                <Remove data={data}/> </>}
        </div>
    );
}

export default Details;
