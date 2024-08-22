import "./App.css";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { Header } from "./features/Header";
import Footer from "./features/Footer";
import Main from "./features/Main";
import "./polyfills";

function App() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100vw",
      }}
    >
      <TonConnectUIProvider manifestUrl="https://github.com/user-attachments/files/16706686/tonconnect-manifest.json">
        <Header />
        <Main />
        <Footer />
      </TonConnectUIProvider>
    </div>
  );
}

export default App;
