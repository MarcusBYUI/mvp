
import { Navigate, Route, Routes } from "react-router-dom";
import Add from "./add/add";
import { Helmet, HelmetProvider } from "react-helmet-async";
import List from "./list/list";
import Details from './details/details';
import { useEffect } from "react";
import { useTonAddress } from "@tonconnect/ui-react";
import { tokenList } from "./helper";
import { useDispatch, useSelector } from "react-redux";
import { swapActions } from "../../../store/swap/swap";

const Pools = () => {
    //get token list here and refresh
    const address = useTonAddress()
    const dispatch = useDispatch()
    const { message } = useSelector(
        (state) => state.notification
    );

    useEffect(() => {
        let interval;
        (async function () {
            setInterval(async () => {
                const res = await tokenList(address)
                dispatch(swapActions.setTokens(res))
            }, 9000);

        })();
        return () => clearInterval(interval);
    }, [address, dispatch, message]);

    return (
        <HelmetProvider>
            <Helmet>
                <title>Pools | Impulse Finance</title>
                <meta name="description" content="Decentralized Pool Manager for Impulse Finance AMM exchange" />
                <meta property="og:title" content="Pool | Impulse Finance" />
                <meta property="og:description" content="Decentralized Pool Manager for Impulse Finance AMM exchange" />
            </Helmet>
            <Routes>
                <Route path="" element={<List />} />
                <Route path="/:contract" element={<Details />} />
                <Route path="add" element={<Add />} />
                <Route path={"*"} element={<Navigate replace to="liquidity" />} />
            </Routes>
        </HelmetProvider>

    );
}

export default Pools;
