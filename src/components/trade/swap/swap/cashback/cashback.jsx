import { getImageUrl } from "../../../../../helpers/utils";
import styles from "./cashback.module.css"

const Cashback = () => {
    return (
        <div className={styles.cashback}>
            <div>
                <p>CashBack</p>
                <div>
                    <img src={getImageUrl("tcon.png")} alt="ton" />
                    <p>1.78</p>
                </div>
            </div>
            <a>Visit Impulse Mini App to claim cashback</a>
        </div>
    );
}

export default Cashback;
