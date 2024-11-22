import { useNavigate } from "react-router-dom";
import styles from "./blocks.module.css"
import { useState } from "react";

const Header = () => {
  const [all, setAll] = useState(true)
  const navigate = useNavigate()
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.state}>
          <button
            onClick={() => setAll(true)}
            className={all ? styles.active : ""}
          >
            Pools
          </button>
          <button
            onClick={() => setAll(false)}
            className={!all ? styles.active : ""}
          >
            Your Pools
          </button>
        </div>
        <button onClick={() => navigate("add")}>Add Liquidity</button>
      </div>
      <input className={styles.search} type="text" placeholder="Search by assets name or address" />
    </div>
  );
}

export default Header;
