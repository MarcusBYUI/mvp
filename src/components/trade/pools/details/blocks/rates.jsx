import { FaArrowRightLong } from "react-icons/fa6";
import styles from "./blocks.module.css"

const Rates = () => {
    return (
        <div className={styles.rates}>
            <p>Token rates</p>
            <div>
                <span>1 TON ≈ 5.02748 USD₮ ($5.03)</span>
            </div>
            <div>
                <span>1 USD₮ ≈ 0.1989 TON ($5.03)</span>
            </div>
        </div>
    );
}

export default Rates;
