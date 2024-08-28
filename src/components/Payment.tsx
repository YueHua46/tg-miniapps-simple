import { toNano } from "@ton/core";
import {
  CHAIN,
  SendTransactionRequest,
  useTonAddress,
  useTonConnectUI,
} from "@tonconnect/ui-react";
import { boc2hash, string2bocBase64 } from "../utils";
import { usePopup } from "@telegram-apps/sdk-react";

export default function Payment() {
  const [tonConnectUI] = useTonConnectUI();
  const userFriendlyAddress = useTonAddress();
  const popup = usePopup();

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
        payload: string2bocBase64("Hello,TON!"),
      },
    ],
  };

  const sendSimpleTransaction = async () => {
    if (!userFriendlyAddress)
      return popup.open({
        title: "Payment error",
        message: "Wallet not connected",
        buttons: [
          {
            type: "ok",
          },
        ],
      });
    const receipt = await tonConnectUI.sendTransaction({
      validUntil: tx.validUntil,
      messages: [tx.messages[0]],
    });
    console.log("simple tx receipt", boc2hash(receipt.boc));
    // boc to
  };
  const sendTransaction = async () => {
    if (!userFriendlyAddress)
      return popup.open({
        title: "Payment error",
        message: "Wallet not connected",
        buttons: [
          {
            type: "ok",
          },
        ],
      });
    const receipt = await tonConnectUI.sendTransaction({
      validUntil: tx.validUntil,
      messages: [tx.messages[1]],
    });
    console.log("tx receipt", boc2hash(receipt.boc));
  };

  const sendAllTransaction = async () => {
    if (!userFriendlyAddress)
      return popup.open({
        title: "Payment error",
        message: "Wallet not connected",
        buttons: [
          {
            type: "ok",
          },
        ],
      });
    const receipt = await tonConnectUI.sendTransaction(tx);
    console.log("all tx receipt", boc2hash(receipt.boc));
  };
  return (
    <div className="flex flex-col gap-4">
      <h3>TON Transaction</h3>
      <button onClick={sendSimpleTransaction}>Send simple transaction</button>
      <button onClick={sendTransaction}>
        Send have payload fields transaction
      </button>
      <button onClick={sendAllTransaction}>Send all transaction</button>
    </div>
  );
}
