import { Address, beginCell, toNano } from "@ton/core";
import {
  SendTransactionRequest,
  useTonAddress,
  useTonConnectUI,
} from "@tonconnect/ui-react";
import WebApp from "@twa-dev/sdk";

export default function JettonPayment() {
  const [tonConnectUI] = useTonConnectUI();
  const addr = useTonAddress();
  const destinationAddress = Address.parse(
    "UQArrRcY9BMuNiqWdtQVF0I2aAad6skfTT51H9VGmfg9bZBi"
  );

  const forwardPayload = beginCell()
    .storeUint(0, 32) // 0 opcode means we have a comment
    .storeStringTail("Hello, TON!")
    .endCell();

  const body = beginCell()
    .storeUint(0xf8a7ea5, 32) // opcode for jetton transfer
    .storeUint(0, 64) // query id
    .storeCoins(toNano(5)) // jetton amount, amount * 10^9
    .storeAddress(destinationAddress) // TON wallet destination address
    .storeAddress(destinationAddress) // response excess destination
    .storeBit(0) // no custom payload
    .storeCoins(toNano(0.02)) // forward amount (if >0, will send notification message)
    .storeBit(1) // we store forwardPayload as a reference
    .storeRef(forwardPayload)
    .endCell();

  const jettonWalletContract = Address.parse(
    "kQBCpjVlzKdqgBgWz2b8wA9XbKaduykaxafLenGlVTsGC575"
  );

  const myTransaction: SendTransactionRequest = {
    validUntil: Math.floor(Date.now() / 1000) + 360,
    messages: [
      {
        address: jettonWalletContract.toString(), // sender jetton wallet
        amount: toNano(0.05).toString(), // for commission fees, excess will be returned
        payload: body.toBoc().toString("base64"), // payload with jetton transfer and comment body
      },
    ],
  };

  const sendJettonTransaction = async () => {
    if (!addr) return WebApp.showAlert("Please connect wallet first");
    const result = await tonConnectUI.sendTransaction(myTransaction);
    console.log("send result", result);
  };
  return (
    <div>
      <h3>Jetton Transaction</h3>
      <button onClick={sendJettonTransaction}>Send transaction</button>
    </div>
  );
}
