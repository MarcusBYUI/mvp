import { NavLink, useNavigate } from "react-router-dom";
import ConnectButton from "../connectButton/connectButton";
import styles from "./header.module.css";
import { getImageUrl } from "../../helpers/utils";

const Header = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.header}>
        <div>
          <div onClick={() => navigate("/launchpad")}>
            <img loading="lazy" src={getImageUrl("logo.png")} alt="" />
            <h3>Impulse Finance</h3>
          </div>
          <div>
            <ul>
              <NavLink
                className={({ isActive }) =>
                  isActive ? styles.active : undefined
                }
                to="/swap"
              >
                Swap
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? styles.active : undefined
                }
                to="/pools"
              >
                Pools
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? styles.active : undefined
                }
                to="/token"
              >
                Token
              </NavLink>
              

            </ul>
            <ConnectButton />
          </div>

        </div>

      </div >

    </>
  );
};

export default Header;
