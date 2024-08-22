import { useTonConnectModal } from "@tonconnect/ui-react";

export const ModalControl = () => {
  const { state, open, close } = useTonConnectModal();

  return (
    <div>
      <div>Modal state: {state?.status}</div>
      <button onClick={open}>Open modal</button>
      <button
        onClick={() => {
          close("action-cancelled");
        }}
      >
        Close modal
      </button>
    </div>
  );
};
