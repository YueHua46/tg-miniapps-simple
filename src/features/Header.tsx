import { TonConnectButton } from "@tonconnect/ui-react";
// import { ModalControl } from "../components/ModalControl";

export const Header = () => {
  return (
    <header
      className="flex"
      style={{ display: "flex", flexDirection: "column", width: "100vw" }}
    >
      <TonConnectButton />
      <span>My App with React UI</span>
      {/* <ModalControl /> */}
    </header>
  );
};
