import { TonConnectButton } from "@tonconnect/ui-react";

export const Header = () => {
  return (
    <header className="flex flex-col">
      <TonConnectButton />
      <span>My App with React UI</span>
    </header>
  );
};
