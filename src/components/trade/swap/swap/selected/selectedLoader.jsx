import Skeleton from 'react-loading-skeleton';
import styles from "./selected.module.css"

const SelectedLoader = ({ text }) => {
    return (
        <div className={styles.selected}>
            <div className={styles.wallet}>
                <p>{text}</p>
                <Skeleton style={{ width: "20px", alignSelf: "center"}}/>
            </div>
            <div className={styles.token}>
                <div>
                    <Skeleton style={{ display: "block", width: 30, height: 30, borderRadius: 50 }} />
                    <Skeleton style={{ display: "block", width: 150, height: 30 }} />
                </div>
                <Skeleton style={{ display: "block", width: 80, height: 30 }} />
            </div>
            <Skeleton style={{ display: "block", width: "20px", margin: "0 0 0 auto" }} />
        </div>
    );
}

export default SelectedLoader;
