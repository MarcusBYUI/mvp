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

                </div>
                <Skeleton circle width={63} height={63} />
              </div>
              <div style={{ padding: "18px 25px" }}>
                <div
                >
                  <Skeleton height={8} width={40} style={{ marginBottom: -18, display: "block" }} />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      margin: "10px 0 0 0",
                      alignItems: "center"
                    }}
                  >
                    <Skeleton height={15} width={90} />
                    <Skeleton height={25} width={60} />
                  </div>
                </div>
                <div
                >
                  <Skeleton height={8} width={40} style={{ marginBottom: -18, display: "block" }} />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      margin: "10px 0 0 0",
                      alignItems: "center"
                    }}
                  >
                    <Skeleton height={15} width={90} />
                    <Skeleton height={25} width={60} />
                  </div>
                </div>
                <div
                >
                  <Skeleton height={8} width={40} style={{ marginBottom: -18, display: "block" }} />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      margin: "10px 0 0 0",
                      alignItems: "center"
                    }}
                  >
                    <Skeleton height={15} width={90} />
                    <Skeleton height={25} width={60} />
                  </div>
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
