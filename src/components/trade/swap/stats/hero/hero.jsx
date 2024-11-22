import styles from "./hero.module.css"

const Hero = () => {
    return (
        <div className={styles.heroborder}>
        <div className={styles.herobg}>
          <div className={styles.hero}>
            <div>
              <h1>Impulse Locker</h1>
              <p>Lp Lock and Token Vesting. Keep tokens and liquidity safe.</p>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Hero;
