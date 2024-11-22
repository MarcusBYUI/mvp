import styles from "./details.module.css";

const Details = () => {

    return (
        <div className={styles.details}>
            <p>Transction Breakdown</p>
            
            <div>
                <span>Est. pool share</span>
                <p>18%</p>
            </div>
            <div>
                <span>Fee tier</span>
                <p>0.21%</p>
            </div>
           
        </div>
    );
}

export default Details;
