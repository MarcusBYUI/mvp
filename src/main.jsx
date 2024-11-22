import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import "./index.css";
import { Provider } from "react-redux/es/exports.js";
import store from "./store/index.jsx";
import { BrowserRouter } from "react-router-dom";
import 'react-tooltip/dist/react-tooltip.css'
import { ScrollToTop } from "./hooks/scrollToTop";
import 'react-loading-skeleton/dist/skeleton.css'
import { SkeletonTheme } from "react-loading-skeleton";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
TimeAgo.addDefaultLocale(en);



ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <SkeletonTheme baseColor="#000319" highlightColor="#12a8ff50">
    <BrowserRouter>
      <ScrollToTop />
      <TonConnectUIProvider manifestUrl={`${window.location.origin}/tonconnect-manifest.json`}>
        <App />
        </TonConnectUIProvider>
    </BrowserRouter>
    </SkeletonTheme>
  </Provider>
);
