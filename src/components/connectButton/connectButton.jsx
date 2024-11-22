//component handles wallet connection
import styles from "./connectButton.module.css";
import { getImageUrl } from '../../helpers/utils';
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';
import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";


const ConnectButton = () => {
  const [tonConnectUI] = useTonConnectUI();
  const [loading, setLoading] = useState(false)

  const address = useTonAddress();

  const connectButtonHandler = async () => {

    if (tonConnectUI.connected) {
      ///disconnect
      await tonConnectUI.disconnect()

    } else {
      if (loading) {
        return
      }
      //connect
      setLoading(true)
      await tonConnectUI.openModal()
      setLoading(false)
    }
  };

  return (
    <>
      <div onClick={connectButtonHandler} className={styles.container}>
        {!tonConnectUI.connected ? <p>Connect Wallet</p> : <p>{address.slice(0, 4)}...{address.slice(address.length - 4, address.length)}</p>}
        {!tonConnectUI.connected ? <button className={styles.connect}>
          {loading ? <ClipLoader
            color="#0098ea"
            loading={true}
            size={10}
            aria-label="Loading Spinner"
            data-testid="loader"
          /> :
            <img src={getImageUrl("connect.png")} alt="connect" />}
        </button> :
          <img className={styles.disconnect} src={getImageUrl("tcon.png")} alt="chain" />
        }
      </div>
    </>
  );
};

export default ConnectButton;
