import { useTonAddress } from "@tonconnect/ui-react";

export const Address = () => {
  const userFriendlyAddress = useTonAddress();
  const rawAddress = useTonAddress(false);

  return (
    rawAddress && (
      <div>
        <div
          style={{
            width: "100%",
          }}
        >
          User-friendly address: {userFriendlyAddress}
        </div>
        <div
          style={{
            width: "100%",
          }}
        >
          Raw address: {rawAddress}
        </div>
      </div>
    )
  );
};
