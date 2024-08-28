import { MainButton } from "@telegram-apps/sdk-react";
import WebApp from "@twa-dev/sdk";
import { NavigateFunction } from "react-router-dom";
import { create } from "zustand";

interface IGlobalStore {
  mainButtonText: string;
  mainButtonVisible: boolean;
  mainButtonEnabled: boolean;
  setMainButtonText: (text: string) => void;
  closeMainButton: () => void;
  triggerMainButton: (mb: MainButton) => void;
  backButtonVisible: boolean;
  setBackButtonVisible: (visible: boolean) => void;
  handleBackButton: (navigage: NavigateFunction) => void;
  settingsButtonVisible: boolean;
  handleSettingsButton: () => void;
}

const initialGlobalState = {
  mainButtonText: "Close Webview",
  mainButtonVisible: true,
  mainButtonEnabled: true,
  backButtonVisible: false,
  settingsButtonVisible: true,
};

const useGlobalStore = create<IGlobalStore>((set, get) => ({
  ...initialGlobalState,
  setMainButtonText: (text) => {
    set({ mainButtonText: text });
    WebApp.MainButton.setParams({ text });
  },
  closeMainButton: () => {
    WebApp.close();
  },
  triggerMainButton: (mb: MainButton) => {
    const isVisible = !get().mainButtonVisible;
    set({ mainButtonVisible: isVisible });
    mb.setParams({
      isVisible,
    });
  },
  setBackButtonVisible: (visible) => {
    set({ backButtonVisible: visible });
    WebApp.BackButton.isVisible = visible;
  },
  handleBackButton: (navigage: NavigateFunction) => {
    console.log("WebApp", WebApp);
    navigage(-1);
    WebApp.showAlert("Back button pressed");
  },
  handleSettingsButton: () => {
    console.log("WebApp", WebApp);
    WebApp.showAlert("Settings button pressed");
  },
}));

export { useGlobalStore };
