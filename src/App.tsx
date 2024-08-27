import "./App.css";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { Header } from "./features/Header";
import TonTransaction from "./features/Transaction";
import "./polyfills";
import Links from "./features/Links";
import { Address } from "./components/Address";
import MainButton from "./features/MainButton";
import { useGlobalStore } from "./stores";
import WebApp from "@twa-dev/sdk";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function App() {
  const globalState = useGlobalStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // init
    WebApp.MainButton.setParams({
      text: globalState.mainButtonText,
      is_visible: globalState.mainButtonVisible,
    });
    WebApp.MainButton.onClick(() => {
      globalState.closeMainButton();
    });
    WebApp.SettingsButton.isVisible = globalState.settingsButtonVisible;
    WebApp.SettingsButton.onClick(() => {
      globalState.handleSettingsButton();
    });
    WebApp.BackButton.isVisible = globalState.backButtonVisible;
    WebApp.BackButton.onClick(() => {
      globalState.handleBackButton(navigate);
    });
  }, []);

  useEffect(() => {
    // 检查当前路由是否是主页，如果是主页则隐藏返回按钮
    console.log("location.pathname", location.pathname);
    if (location.pathname === "/") {
      globalState.setBackButtonVisible(false);
    } else {
      globalState.setBackButtonVisible(true);
    }
  }, [location.pathname]);
  return (
    <div className="flex flex-col w-screen p-4 box-border">
      <TonConnectUIProvider manifestUrl="https://github.com/user-attachments/files/16706686/tonconnect-manifest.json">
        <Header />
        <Address />
        <Links />
        {/* main button */}
        <MainButton />
        <TonTransaction />
      </TonConnectUIProvider>
    </div>
  );
}

export default App;
