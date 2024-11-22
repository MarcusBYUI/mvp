import styles from "./skeletonCard.module.css";
import Skeleton from "react-loading-skeleton";
const SkeletonCard = () => {
  return Array(6)
    .fill(0)
    .map((_, i) => {
      return (
        <div key={i} className={styles.border}>
          <div className={styles.bg}>
            <div className={styles.card}>
              <div className={styles.head}>
                <div>
                  <Skeleton style={{ width: 150, height: 20 }} />
                  <Skeleton style={{ width: 70, height: 8, margin: "5 0" }} />
                  <div style={{ display: "flex", gap: 5 }}>
                    <Skeleton circle width={12} height={12} />
                    <Skeleton circle width={12} height={12} />
                    <Skeleton circle width={12} height={12} />
                    <Skeleton circle width={12} height={12} />
                  </div>
                </div>
                <Skeleton circle width={63} height={63} />
              </div>
              <div style={{ padding: "18px 25px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    margin: "10px 0 0 0",
                  }}
                >
                  <Skeleton height={4} width={80} />
                  <Skeleton height={4} width={80} />
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Skeleton height={4} width={80} />
                  <Skeleton height={4} width={80} />
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Skeleton height={4} width={80} />
                  <Skeleton height={4} width={80} />
                </div>
               

                <div
                  style={{
                    margin: "22px 0 0 0",
                  }}
                >
                  
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
};

export default SkeletonCard;
