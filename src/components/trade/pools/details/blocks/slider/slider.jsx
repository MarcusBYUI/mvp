
import styles from './slider.module.css';

const PercentageSlider = ({value, setValue}) => {

  const handleSliderChange = (event) => {
    setValue(event.target.value);
  };

  const backgroundStyle = {
    background: `linear-gradient(90deg, #12AAFF ${value}%, #0B2442 ${value}%)`
  };

  return (
    <section className={styles.sliderContainer}>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        className={styles.slider}
        onChange={handleSliderChange}
        style={backgroundStyle}
      />
      <div className={styles.sliderValues}>
        <span>0%</span>
        <span>100%</span>
      </div>
      <p
        className={styles.sliderValue}
        style={{ left: `calc(${value}% - -2px)` }}
      >
        {value}%
      </p>
    </section>
  );
};

export default PercentageSlider;
