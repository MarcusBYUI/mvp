import PropTypes from "prop-types";
import styles from "./create.module.css";
import { useNavigate } from "react-router";


const Input = ({ data, required, num, read }) => {
  const navigate = useNavigate()
  return (
    <div className={styles.input}>
      {data.button ? (
        <div>
          <p>{data.title}</p> <button type="button" onClick={() => { navigate("/token/create") }}>Create Token</button>
        </div>
      ) : (
        <p>{data.title}</p>
      )}
      {data.date ? (
        <input
          type="datetime-local"
          value={data.value}
          onChange={(e) => data.setValue(e.target.value)}
          min={new Date()}
        />
      ) : data.desc ? (
        <textarea cols="30" onChange={(e) => data.setValue(e.target.value)} required rows="10" value={data.value}></textarea>
      ) : num ?
        <input

          onChange={(e) => data.setValue(e.target.value)}
          type="number"
          value={data.value}
          onWheel={(e) => e.target.blur()}
        /> : required && num ? (
          <input
            required
            onChange={(e) => data.setValue(e.target.value)}
            type="number"
            value={data.value}
            onWheel={(e) => e.target.blur()}
          />
        ) : required && num && read ? (
          <input
            required
            onChange={(e) => data.setValue(e.target.value)}
            type="number"
            value={data.value}
            readOnly
            onWheel={(e) => e.target.blur()}
          />
        ) : required ? (
          <input
            required
            onChange={(e) => data.setValue(e.target.value)}
            type="text"
            value={data.value}
          />
        ) : (
          <input
            onChange={(e) => data.setValue(e.target.value)}
            type="text"
            value={data.value}

          />
        )}
      <span onClick={data.upload ? () => window.open("https://" + window.location.host + "/upload", '_blank') : () => { }}>{data.description}</span>

    </div>
  );
};

export default Input;

Input.propTypes = {
  data: PropTypes.object,
  required: PropTypes.bool,
  num: PropTypes.bool,
  read: PropTypes.bool
};
