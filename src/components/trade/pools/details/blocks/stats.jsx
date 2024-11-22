import numberWithCommas from "../../../../../helpers/commaSeperator";
import styles from "./blocks.module.css"

const Stats = ({data}) => {
    return (
        <div className={styles.stats}>
            <p>Pool stats</p>
            <div>
                <span>TVL</span>
                <span>$508.03M</span>
            </div>
            <div>
                <span>Volume 24h</span>
                <span>$508.03M</span>
            </div>
            <div>
                <span>{data.symbolA} Reserve</span>
                <div>
                    <span>{numberWithCommas(data.reserveA / 10 ** data.decimalA)}</span>
                    <span>$508.03M</span>
                </div>
            </div>
            <div>
                <span>{data.symbolB} Reserve</span>
                <div>
                    <span>{numberWithCommas(data.reserveB / 10 ** data.decimalB)}</span>
                    <span>$508.03M</span>
                </div>
            </div>
        </div>
    );
}

export default Stats;
