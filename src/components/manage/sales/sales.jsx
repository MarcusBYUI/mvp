import { useState } from "react";
import styles from "./sales.module.css";
import Card from "./card/card";
import { useEffect } from "react";
import AppPagination from "../../pagination/pagination";
import {getSalesByOwner } from "../../launchpad/helper";
import { useDispatch, useSelector } from "react-redux";
import SkeletonCard from "./skeletonCard/skeletonCard";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useTonAddress } from "@tonconnect/ui-react";

const Sales = () => {
  const address = useTonAddress(false);
  const [isLoading, setIsLoading] = useState(true);
  const { message } = useSelector(
    (state) => state.notification
  );

  const [launch, setLaunch] = useState([]);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  //get sale from backend
  useEffect(() => {
    if(address.length === 0) return;

    let abortController;
    (async function () {
      abortController = new AbortController();
      setIsLoading(true)
      const res = await getSalesByOwner(address);
      setData(res.sales);
      setIsLoading(false)

    })();
    return () => abortController.abort();
  }, [dispatch, address, message]);


  return (
    <HelmetProvider>

    <Helmet>
        <title>Launchpad Creator Manager | Impulse Finance</title>
        <meta name="description" content="Launchpad Creator Manager to help devs manage created ICOs on Impulse Finance" />
        <meta property="og:title" content="Launchpad Creator Manager | Impulse Finance" />
        <meta property="og:description" content="Launchpad Creator Manager to help devs manage created ICOs on Impulse Finance" />
      </Helmet>
    <div className={styles.list}>
      
      {data.length === 0 && !isLoading ? (
        <h3 className={styles.notfound}>Nothing Found</h3>
      ) : (
        <>
            <p className={styles.kycButtonsP} style={{color: "white", marginTop: "0", fontSize: 12}}>Create a ticket on discord If your sale is over or to complete KYC or Audit for Free</p>
            <div className={styles.kycButtons}>
              <button onClick={()=>window.open("https://discord.com/channels/1147921577334276217/1221547748575150200")}>Complete KYC</button>
              <button onClick={()=>window.open("https://discord.com/channels/1147921577334276217/1221548213404962956")}>End Of Sale</button>
            </div>
          <div className={styles.listContainer}>
            {isLoading && <SkeletonCard />}

            {launch.length > 0 &&
              launch.map((item, index) => {
                return <Card key={index} data={item} />;
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

export default Sales;
