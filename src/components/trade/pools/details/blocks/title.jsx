import { useNavigate } from "react-router-dom";
import styles from "./blocks.module.css"
import { IoIosArrowBack } from "react-icons/io";
import { FaArrowRightLong } from "react-icons/fa6";


const Title = ({data}) => {
    const navigate = useNavigate()
    return (
        <div className={styles.title}>
            <div onClick={() => navigate("/pools")} className={styles.back}>
                <IoIosArrowBack />
                <span>Back</span>
            </div> 
            <div>
                <h3>{data.symbolA}/{data.symbolB}</h3>
                <div>
                    <img src={data.imageA} alt={data.symbolA} />
                    <img src={data.imageB} alt={data.symbolB} />
                </div>
                <FaArrowRightLong onClick={()=>window.open("https://testnet.tonviewer.com/" + data.addressf, "_blank")}/>
            </div>
        </div>
    );
}

export default Title;
