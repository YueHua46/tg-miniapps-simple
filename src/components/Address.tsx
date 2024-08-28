import { useTonAddress } from "@tonconnect/ui-react";

export const Address = () => {
  const userFriendlyAddress = useTonAddress();
  const rawAddress = useTonAddress(false);

  return (
    rawAddress && (
      <div className="w-full">
        <div className="w-full">
          User-friendly address: {userFriendlyAddress}
        </div>
        <div className="w-full overflow-x-hidden">
          Raw address: {rawAddress}
        </div>
      </div>
    )
  );
};
