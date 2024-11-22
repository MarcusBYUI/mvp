import Header from './components/header/header';
import Sub from './components/header/sub/sub';
import { Navigate, Route, Routes, useSearchParams } from "react-router-dom";
import Pool from "./pages/pool/pool";
import Token from "./pages/token/token";

import Manage from "./pages/manage/manage";
import Tasks from "./pages/tasks/tasks";
import Footer from "./components/footer/footer";
import Upload from "./pages/upload/upload";
import Role from "./pages/role/role";
import Locker from "./pages/locker/locker";
import Sale from "./components/tasks/sale/sale";
import Swap from "./components/trade/swap/swap";
import Liquidity from "./components/trade/liquidity/liquidity";
import Stats from "./components/trade/swap/stats/stats";
import Launchpad from './pages/launchpad/launchpad';
const Root = () => {
    let [searchParams] = useSearchParams();
    const params = searchParams.get("ref");
    const referral = params ? params : "#";
    return <>
        <Header />

        <div className="snowflakes" aria-hidden="true">
            <div className="snowflake">
                ❅
            </div>
            <div className="snowflake">
                ❅
            </div>
            <div className="snowflake">
                ❆
            </div>
            <div className="snowflake">
                ❄
            </div>
            <div className="snowflake">
                ❅
            </div>
            <div className="snowflake">
                ❆
            </div>
            <div className="snowflake">
                ❄
            </div>
            <div className="snowflake">
                ❅
            </div>
            <div className="snowflake">
                ❆
            </div>
            <div className="snowflake">
                ❄
            </div>
        </div>

        <main>
            <Sub />
            <Routes>
                <Route path="swap" element={<Swap />} />
                <Route path="liquidity/*" element={<Liquidity />} />
                <Route path="analytics/*" element={<Stats />} />
                <Route path="launchpad/*" element={<Launchpad />} />
                <Route path="locker/*" element={<Locker />} />
                <Route path="manage/*" element={<Manage />} />
                <Route path="earn/*" element={<Pool />} />
                <Route path="role" element={<Role />} />
                <Route path="token/*" element={<Token />} />
                <Route path="tasks/*" element={<Tasks />} />
                <Route path="upload" element={<Upload />} />
                <Route path="public" element={<Sale referral={referral} />} />
                <Route path={"*"} element={<Navigate replace to="/" />} />
            </Routes>
        </main>
        <Footer />
    </>
}

export default Root;
