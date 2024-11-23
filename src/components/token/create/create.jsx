import { useNavigate } from "react-router-dom";
import styles from "./create.module.css"
import { IoIosArrowBack } from "react-icons/io";
import { createToken } from "../helper";
import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";
import { useDispatch } from "react-redux";
import { notificationActions } from '../../../store/notification/notification';


const Create = () => {
  const navigate = useNavigate()
  const [tonConnectUI] = useTonConnectUI();
  const address = useTonAddress()
  const dispatch = useDispatch()

  const handleSubmission = async (e)=>{
    e.preventDefault()
    if(address.length == 0) return;
    const form = new FormData(e.target)

    try {
      dispatch(notificationActions.setNotify(true))
      const newAddress = await createToken(tonConnectUI, form, address)
      
      setTimeout(() => {
        navigate("/token/edit/" + newAddress)
        dispatch(notificationActions.setNotify(false))
      }, 5000);
      
    } catch (error) {
      dispatch(notificationActions.setNotify(false))
      console.log(error);
    }
  }
  return (
    <div className={styles.create}>
      <div>
        <div>
          <h3>Token Creator</h3>
          <p>Create a deflationary token on TON</p>
        </div>
        <div>
          <div onClick={() => navigate("/token/edit/")} className={styles.edit}>
            <span>Edit A Token</span>
            <IoIosArrowBack />
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmission}>
        <div>
          <input type="text" name="name" placeholder="Jetton Name" required />
          <span>Your project unabbreviated name with spaces (usually 1-3 words). example Baby Shark Token</span>
        </div>
        <div>
          <input type="text" name="symbol" placeholder="Jetton Symbol" required />
          <span>Currency symbol appearing in balance (usually 3-5 uppercase chars). example BST</span>
        </div>
        <div>
          <input type="text" name="decimals" placeholder="Jetton Decimals" required />
          <span>The decimal precision of your token (9 is TON default). example 9</span>
        </div>
        <div>
          <input type="text" name="image" placeholder="Jetton Image" required />
          <span>Image URL link for jetteon. upload here:</span>
        </div>
        <div>
          <input type="text" name="description" placeholder="Jetton Description" required />
          <span>Optional sentence explaining about your project. example Baby shark du du du du du</span>
        </div>
        <div>
          <input type="text" name="supply" placeholder="Tokens to Mint" required />
          <span>Number of initial tokens to mint and send to your wallet address (float). example 1000000</span>
        </div>
        <div>
          <input type="text" name="tax" placeholder="Token Tax" required />
          <span>You can set to maximum of 15 or leave at 0</span>
        </div>
        <div>
          <input type="text" name="collector" placeholder="Tax Collector Address" required />
          <span>Address to send all token taxes to</span>
        </div>
        <button>{address.length == 0 ? "Connect Wallet" : "Deploy"}</button>
      </form>
    </div>
  );
}

export default Create;
