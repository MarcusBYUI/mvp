import Skeleton from "react-loading-skeleton";
import styles from "./blocks.module.css"
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";


const Loader = () => {
    const navigate = useNavigate()
    return (
        <>
            <div className={styles.title}>
                <div onClick={() => navigate("/pools")} className={styles.back}>
                    <IoIosArrowBack />
                    <span>Back</span>
                </div>
                <div>
                    <Skeleton height={30} width={180} style={{ marginBottom: 20 }} />
                    <div>
                        <Skeleton style={{ display: "block", width: 30, height: 30, borderRadius: 50 }} />
                        <Skeleton style={{ display: "block", width: 30, height: 30, borderRadius: 50 }} />
                    </div>
                    <span></span>
                </div>
            </div>
            <div className={styles.manage}>
                <h5>Manage liquidity</h5>
                <span>Earn on all trades, based on your share of the liquidity pool.</span>
                <div>
                    <button>Add Liquidity</button>
                    <button>Trade</button>
                </div>
            </div>
            <div className={styles.chart}>
                <Skeleton height={300} />
            </div>
            <div className={styles.rates}>
                <p>Token rates</p>
                <div>
                    <Skeleton width={220} />

                </div>
                <div>
                    <Skeleton width={220} />
                </div>
            </div>
            <div className={styles.refund}>
                <p>Refunds</p>
                <div>
                    <Skeleton width={120} />
                    <Skeleton width={60} />
                </div>
                <div>
                    <Skeleton width={120} />
                    <Skeleton width={60} />
                </div>
            </div>

        </>

    );
}

export default Loader;
