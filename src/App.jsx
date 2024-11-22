import Header from "./components/header/header";
import { Navigate, Route, Routes } from "react-router-dom";
import './App.css';

import { useSelector } from "react-redux";
import { Message } from "./components/message/message";

import Footer from "./components/footer/footer";
import Upload from "./pages/upload/upload";
import Trade from './pages/trade/trade';
import Pools from "./components/trade/pools/pools";
import Token from "./pages/token/token";


function App() {
  const { notify, message, loading } = useSelector(
    (state) => state.notification
  );

  return (
    <>
      {notify && <Message message={message} loading={loading} />}
        <Header />        

        <main>
          <Routes>
            <Route path="swap" element={<Trade />} />
            <Route path="pools/*" element={<Pools />} />
            <Route path="token/*" element={<Token />} />
            <Route path="upload" element={<Upload />} />
            <Route path={"*"} element={<Navigate replace to="/swap" />} />
          </Routes>
        </main>
        <Footer />

    </>
  );
}

export default App;
