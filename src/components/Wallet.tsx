import { useTonWallet } from "@tonconnect/ui-react";

export const Wallet = () => {
  const wallet = useTonWallet();

  return (
    wallet && (
      <div>
        <span className="w-full">
          Connected wallet: {wallet.connectItems?.tonProof?.name}
        </span>
        <span className="w-full">Device: {wallet.device.appName}</span>
      </div>
    )
  );
};
