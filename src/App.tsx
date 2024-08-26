import "./App.css";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { Header } from "./features/Header";
import Transaction from "./features/Transaction";
import "./polyfills";
import Links from "./features/Links";
import { Address } from "./components/Address";
import MainButton from "./features/MainButton";
import { useGlobalStore } from "./stores";
import WebApp from "@twa-dev/sdk";
import { useEffect } from "react";

function App() {
  const globalState = useGlobalStore();
  useEffect(() => {
    WebApp.MainButton.setParams({
      text: globalState.mainButtonText,
      is_visible: globalState.mainButtonVisible,
    });
    WebApp.SettingsButton.isVisible = globalState.settingsButtonVisible;
    WebApp.SettingsButton.onClick(() => {
      globalState.handleSettingsButton();
    });
    WebApp.BackButton.isVisible = globalState.backButtonVisible;
    WebApp.BackButton.onClick(() => {
      globalState.handleBackButton();
    });
  }, []);
  return (
    <div className="flex flex-col w-screen p-4 box-border">
      <TonConnectUIProvider manifestUrl="https://github.com/user-attachments/files/16706686/tonconnect-manifest.json">
        <Header />
        <Address />
        <Links />
        {/* main button */}
        <MainButton />
        <Transaction />
      </TonConnectUIProvider>
    </div>
  );
}

export default App;
