import numberWithCommas from '../../../../../helpers/commaSeperator';
import { getImageUrl } from '../../../../../helpers/utils';
import styles from "./selected.module.css"
import SelectedLoader from './selectedLoader';

const Selected = ({ openPop, data, updateAmount, text, read = false }) => {
    
    return (
        data ? <div className={styles.selected}>
            <div className={styles.wallet}>
                <p>{text}</p>
                <div>
                    <img src={getImageUrl("wallet.png")} alt="wallet" />
                    <span>{numberWithCommas(Number(data.balance) / (10 ** data.decimals))}</span>
                </div>
            </div>
            <div className={styles.token}>
                <div onClick={() => openPop(true)}>
                    <img src={data.logo} alt={data.symbol} />
                    {data.symbol.length < 7 ?
                        <span>{data.symbol.toUpperCase()}</span>
                        : <span><marquee scrollamount="2">{data.symbol.toUpperCase()}</marquee></span>}
                </div>
                <input className={`${text == "From" && (data.amount > (Number(data.balance) / (10 ** data.decimals))) ? styles.warn : ""}`} type="number" value={data.amount.toString().includes('e') ? data.amount.toFixed(9) : data.amount} placeholder='0.00' readOnly={read} onWheel={(e) => e.target.blur()} onChange={(e) => updateAmount(Number(e.target.value))} />
            </div>
            <p>$0</p>
        </div> : <SelectedLoader text={text}/>
    );
}

export default Selected;
