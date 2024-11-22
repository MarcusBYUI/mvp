import styles from "./blocks.module.css"

const Manage = () => {
    return (
        <div className={styles.manage}>
            <h5>Manage liquidity</h5>
            <span>Earn on all trades, based on your share of the liquidity pool.</span>
            <div>
                <button>Add Liquidity</button>
                <button>Trade</button>
            </div>
        </div>
    );
}

export default Manage;
