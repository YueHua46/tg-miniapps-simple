import "./App.css";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { Header } from "./features/Header";
import Footer from "./features/Footer";
import Main from "./features/Main";

function App() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100vw",
      }}
    >
      <TonConnectUIProvider manifestUrl="https://192.168.170.254:5173/docs/tonconnect-manifest.json">
        <Header />
        <Main />
        <Footer />
      </TonConnectUIProvider>
    </div>
  );
}

export default App;
