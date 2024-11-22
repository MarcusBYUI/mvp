import { useContext, useState } from "react";
import styles from "./pools.module.css";
import Card from "./card/card";
import { useEffect } from "react";
import AppPagination from "../../pagination/pagination";
import { useDispatch, useSelector } from "react-redux";
import { MyContext } from "../../../helpers/mycontext";
import SkeletonCard from "./skeletonCard/skeletonCard";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { getPoolsByOwner } from "../../nftpool/helper";

const Pools = () => {
  const { address, venomProvider, pubKey } = useContext(MyContext);
  const [isLoading, setIsLoading] = useState(true);
  const { message } = useSelector(
    (state) => state.notification
  );

  const [launch, setLaunch] = useState([]);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  //get sale from backend
  useEffect(() => {
    if(!address) return;

    let abortController;
    (async function () {
      abortController = new AbortController();
      setIsLoading(true)
      const res = await getPoolsByOwner(address);
      setData(res.pools);
      setIsLoading(false)

    })();
    return () => abortController.abort();
  }, [dispatch, address, message]);


  return (
    <HelmetProvider>

    <Helmet>
        <title>NFT Staking Pool Creator Manager | Impulse Finance</title>
        <meta name="description" content="NFT Staking Pool Creator Manager to help devs manage created NFT staking pools on Impulse Finance" />
        <meta property="og:title" content="NFT Staking Pool Creator Manager | Impulse Finance" />
        <meta property="og:description" content="NFT Staking Pool Creator Manager to help devs manage created NFT staking pools on Impulse Finance" />
      </Helmet>
    <div className={styles.list}>
      
      {data.length === 0 && !isLoading ? (
        <h3 className={styles.notfound}>Nothing Found</h3>
      ) : (
        <>
          <div className={styles.listContainer}>
            {isLoading && <SkeletonCard />}

            {launch.length > 0 &&
              launch.map((item, index) => {
                return <Card key={index} data={item} address={address} venomProvider={venomProvider} pubKey={pubKey} />;
              })}
          </div>
          <div className={styles.paginationContainer}>
            <AppPagination callback={setLaunch} rawData={data} pageSize={9} />
          </div>
        </>
      )}
    </div>
    </HelmetProvider>
  );
};

export default Pools;
