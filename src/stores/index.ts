import WebApp from "@twa-dev/sdk";
import { create } from "zustand";

interface IGlobalStore {
  mainButtonText: string;
  mainButtonVisible: boolean;
  setMainButtonText: (text: string) => void;
  triggerMainButton: () => void;
  handleBackButton: () => void;
  handleSettingsButton: () => void;
}

const initialGlobalState = {
  mainButtonText: "Close Webview",
  mainButtonVisible: true,
  backButtonText: "Back",
};

const useGlobalStore = create<IGlobalStore>((set, get) => ({
  ...initialGlobalState,
  setMainButtonText: (text) => {
    set({ mainButtonText: text });
    WebApp.MainButton.setParams({
      text,
    });
  },
  triggerMainButton: () => {
    const isVisible = !get().mainButtonVisible;
    set({ mainButtonVisible: isVisible });
    WebApp.MainButton.setParams({
      is_visible: isVisible,
    });
  },
  handleBackButton: () => {
    WebApp.showAlert("Back button pressed");
  },
  handleSettingsButton: () => {
    WebApp.showAlert("Settings button pressed");
  },
}));

export { useGlobalStore };
