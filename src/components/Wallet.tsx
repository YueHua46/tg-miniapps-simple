import { useTonWallet } from "@tonconnect/ui-react";

export const Wallet = () => {
  const wallet = useTonWallet();

  return (
    wallet && (
      <div>
        <span
          style={{
            width: "100%",
          }}
        >
          Connected wallet: {wallet.connectItems?.tonProof?.name}
        </span>
        <span
          style={{
            width: "100%",
          }}
        >
          Device: {wallet.device.appName}
        </span>
      </div>
    )
  );
};
