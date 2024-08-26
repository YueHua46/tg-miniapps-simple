import { TonConnectButton } from "@tonconnect/ui-react";

export const Header = () => {
  return (
    <header
      className="flex"
      style={{ display: "flex", flexDirection: "column", width: "100vw" }}
    >
      <TonConnectButton />
      <span className="text-white">My App with React UI</span>
    </header>
  );
};
