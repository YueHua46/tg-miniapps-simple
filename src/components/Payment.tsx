import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";

export default function Payment() {
  const [tonConnectUI] = useTonConnectUI();
  const userFriendlyAddress = useTonAddress();

  const transaction = {
    validUntil: Math.floor(Date.now() / 1000) + 60, // 60 sec
    messages: [
      {
        address: "0QCSES0TZYqcVkgoguhIb8iMEo4cvaEwmIrU5qbQgnN8fo2A",
        amount: "20000000",
        // stateInit: "base64bocblahblahblah==" // just for instance. Replace with your transaction initState or remove
      },
      {
        address: "0QCSES0TZYqcVkgoguhIb8iMEo4cvaEwmIrU5qbQgnN8fo2A-Jn",
        amount: "30000000",
        payload: "Hello World TON", // just for instance. Replace with your transaction payload or remove
      },
    ],
  };

  const sendSimpleTransaction = async () => {
    if (!userFriendlyAddress) return console.error("not connected");
    const receipt = await tonConnectUI.sendTransaction({
      validUntil: transaction.validUntil,
      messages: [transaction.messages[0]],
    });
    console.log("simple tx receipt", receipt);
  };
  const sendTransaction = async () => {
    if (!userFriendlyAddress) return console.error("not connected");
    const receipt = await tonConnectUI.sendTransaction({
      validUntil: transaction.validUntil,
      messages: [transaction.messages[1]],
    });
    console.log("tx receipt", receipt);
  };
  return (
    <div className="flex gap-4">
      <button
        className="p-4 bg-[#0098EA] rounded-3xl text-white border-none cursor-pointer"
        onClick={sendSimpleTransaction}
      >
        Send simple transaction
      </button>
      <button
        onClick={sendTransaction}
        className="p-4 bg-[#0098EA] rounded-3xl text-white border-none cursor-pointer"
      >
        Send have payload fields transaction
      </button>
    </div>
  );
}
