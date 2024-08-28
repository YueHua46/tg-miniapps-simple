import "./App.css";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import "./polyfills";
import { useGlobalStore } from "./stores";
import WebApp from "@twa-dev/sdk";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SDKProvider } from "@telegram-apps/sdk-react";
import Root from "./features/Root";

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
    <SDKProvider acceptCustomStyles debug>
      <TonConnectUIProvider manifestUrl="https://github.com/user-attachments/files/16706686/tonconnect-manifest.json">
        <Root />
      </TonConnectUIProvider>
    </SDKProvider>
  );
}

export default App;
