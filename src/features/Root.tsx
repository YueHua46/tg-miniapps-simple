import { Header } from "./Header";
import { Address } from "../components/Address";
import Links from "./Links";
import MainButton from "./MainButton";
import TonTransaction from "./Transaction";
import {
  useBackButton,
  useViewport,
  useBiometryManagerRaw,
  useMainButton,
  useSettingsButton,
} from "@telegram-apps/sdk-react";
import { useEffect } from "react";
import { useGlobalStore } from "../stores";
import { useLocation, useNavigate } from "react-router-dom";

export default function Root() {
  const location = useLocation();
  const navigate = useNavigate();
  const globalState = useGlobalStore();
  // BackButton initializes synchronously. So, bb will be
  // the BackButton instance.
  const bb = useBackButton(false);
  const mb = useMainButton(false);
  const sb = useSettingsButton(false);

  // Viewport is being initialized asynchronously, so signal may return undefined.
  // After some time it will receive a valid value.
  const vp = useViewport();

  useEffect(() => {
    console.log(vp); // will be undefined and then Viewport instance.
  }, [vp]);

  const bm = useBiometryManagerRaw();

  useEffect(() => {
    if (bm.error) {
      console.error("Something went wrong for BiometryManager", bm.error);
    }
  }, [bm]);

  //   初始化 webapp
  useEffect(() => {
    // 初始化 main button
    mb.setParams({
      text: globalState.mainButtonText,
      isVisible: globalState.mainButtonVisible,
      isEnabled: globalState.mainButtonEnabled,
    });

    // 初始化 setting button
    if (globalState.settingsButtonVisible) sb.show();
    else sb.hide();

    // 监听
    mb.on("click", () => {
      globalState.closeMainButton();
    });
    bb.on("click", () => {
      globalState.handleBackButton(navigate);
    });
  }, []);

  useEffect(() => {
    if (location.pathname === "/") bb.hide();
    else bb.show();
  }, [location.pathname]);

  return (
    <div className="flex flex-col w-screen w-full h-full p-4 box-border">
      <Header />
      <Address />
      <Links />
      {/* main button */}
      <MainButton />
      <TonTransaction />
    </div>
  );
}
