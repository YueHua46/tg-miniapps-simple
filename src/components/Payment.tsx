import { toNano } from "@ton/core";
import {
  CHAIN,
  SendTransactionRequest,
  useTonAddress,
  useTonConnectUI,
} from "@tonconnect/ui-react";
import { transactionComment } from "../utils/generatorTxComment";

export default function Payment() {
  const [tonConnectUI] = useTonConnectUI();
  const userFriendlyAddress = useTonAddress();

  const tx: SendTransactionRequest = {
    // 有效期为该交易的有效期为从现在开始的 10 分钟（以 Unix 纪元秒为单位）。
    validUntil: Math.floor(Date.now() / 1000) + 600,
    network: CHAIN.TESTNET,
    messages: [
      // 发送一个带有 0.005 TON的交易到指定地址
      {
        address: "0QCSES0TZYqcVkgoguhIb8iMEo4cvaEwmIrU5qbQgnN8fo2A", // 必选
        amount: toNano("0.005").toString(), // 必选
      },
      // 发送一个带有 0.005 TON 与 payload 的交易到指定地址。
      {
        // 收件人地址。
        address: "0QCSES0TZYqcVkgoguhIb8iMEo4cvaEwmIrU5qbQgnN8fo2A",
        // 以 nanoTON 形式发送的金额。例如，0.005 TON 等于 5000000 nanoTON
        amount: toNano("0.005").toString(),
        // （可选）boc base64 格式的有效负载.
        payload: transactionComment("Hello,TON!"),
      },
    ],
  };

  const sendSimpleTransaction = async () => {
    if (!userFriendlyAddress) return console.error("not connected");
    const receipt = await tonConnectUI.sendTransaction({
      validUntil: tx.validUntil,
      messages: [tx.messages[0]],
    });
    console.log("simple tx receipt", receipt);
  };
  const sendTransaction = async () => {
    if (!userFriendlyAddress) return console.error("not connected");
    const receipt = await tonConnectUI.sendTransaction({
      validUntil: tx.validUntil,
      messages: [tx.messages[1]],
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
