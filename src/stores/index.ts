import WebApp from "@twa-dev/sdk";
import { NavigateFunction } from "react-router-dom";
import { create } from "zustand";

interface IGlobalStore {
  mainButtonText: string;
  mainButtonVisible: boolean;
  setMainButtonText: (text: string) => void;
  handleMainButton: () => void;
  triggerMainButton: () => void;
  backButtonVisible: boolean;
  handleBackButton: (navigage: NavigateFunction) => void;
  settingsButtonVisible: boolean;
  handleSettingsButton: () => void;
}

const initialGlobalState = {
  mainButtonText: "Close Webview",
  mainButtonVisible: true,
  backButtonVisible: true,
  backButtonText: "Back",
  settingsButtonVisible: true,
};

const useGlobalStore = create<IGlobalStore>((set, get) => ({
  ...initialGlobalState,
  setMainButtonText: (text) => {
    set({ mainButtonText: text });
    WebApp.MainButton.setParams({ text });
  },
  handleMainButton: () => {
    WebApp.close();
  },
  triggerMainButton: () => {
    const isVisible = !get().mainButtonVisible;
    set({ mainButtonVisible: isVisible });
    WebApp.MainButton.isVisible = isVisible;
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
