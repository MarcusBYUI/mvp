import { Link } from "react-router-dom";
import styles from "./footer.module.css";

const Footer = () => {

  return (
    <footer className={styles.footer}>
      
      <div className={styles.links}>
        <div>
          <p>Impulse Finance</p>
          {/* <Link to="/swap">Swap</Link> */}
          <Link to="/launchpad">Launchpad</Link>
          {/* <Link to="/private" style={{ cursor: "pointer" }} >Buy $IMPULSE</Link> */}
          {/* <Link to="/tasks">Testnet Tasks</Link>
          <a target="_blank" rel="noreferrer" href="https://venomtest.impulsefinance.org/">Visit TestNet</a>
          <a target="_blank" rel="noreferrer" href="https://docs.impulsefinance.org/pitch-deck">Pitch Deck</a> */}
          <a target="_blank" rel="noreferrer" href="https://venom.impulsefinance.org">Venom</a>
          <a target="_blank" rel="noreferrer" href="https://docs.impulsefinance.org">Docs</a>
          <a target="_blank" rel="noreferrer" href="https://discord.com/channels/1147921577334276217/1147935575601590412">Support</a>
          {/* <a target="_blank" rel="noreferrer" href="https://discord.com/channels/1147921577334276217/1147935575601590412">Investors</a> */}
        </div>
        <div>
          {/* <p>Earn</p>
          <Link to="/earn/farm">Liquidity Farm</Link>
          <Link to="/earn/token">Token Pools</Link>
          <Link to="/earn/nft">NFT Pools</Link> */}
          {/* <Link to="/earn/nft">Liquidity Farm</Link> */}
        </div>
        
        <div>
        <p>Manage</p>

          <a target="_blank" rel="noreferrer" href="https://minter.ton.org/" >Create Token</a>
          <Link to="/launchpad/create" style={{ cursor: "pointer" }} >Create ICO</Link>
          {/* <Link to="/earn/token/create" style={{ cursor: "pointer" }} >Create Token Pool</Link>
          <Link to="/earn/nft/create" style={{ cursor: "pointer" }} >Create NFT Pool</Link>
          <Link to="/locker/create" style={{ cursor: "pointer" }} >Create Token/Liquidity Locker</Link> */}
          <Link to="/manage" style={{ cursor: "pointer" }} >Management</Link>
        </div>
        
        <div>
          <p>Socials</p>
          <a target="_blank" rel="noreferrer" href="https://twitter.com/impulsetoken">Twitter</a>
          <a target="_blank" rel="noreferrer" href="https://discord.gg/xpsHhM8Wm4">Discord</a>
          <a target="_blank" rel="noreferrer" href="https://t.me/impulse_ann">Telegram Announcement</a>
          <a target="_blank" rel="noreferrer" href="https://t.me/impulsediscussion">Telegram Discussion</a>
          <a target="_blank" rel="noreferrer" href="https://medium.com/@impulsefinance">Medium</a>
        </div>
      </div>
      <hr />
      <p>Copyright {new Date().getFullYear()}. Impulse Finance</p>
    </footer>
  );
};

export default Footer;
