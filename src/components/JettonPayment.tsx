import { Address, beginCell, toNano } from "@ton/core";
import {
  SendTransactionRequest,
  useTonAddress,
  useTonConnectUI,
} from "@tonconnect/ui-react";
import { useRef } from "react";
import TonWeb from "tonweb";
import { usePopup } from "@telegram-apps/sdk-react";

enum EOpcodes {
  TRANSFER = 0xf8a7ea5,
  BURN = 0x595f07bc,
  MINT = 21,
}

export default function JettonPayment() {
  const [tonConnectUI] = useTonConnectUI();
  const addr = useTonAddress();
  const inpRef = useRef<HTMLInputElement>(null);
  const popup = usePopup(false);

  const tonweb = new TonWeb(
    new TonWeb.HttpProvider("https://testnet.toncenter.com/api/v2/jsonRPC", {
      apiKey:
        "1dab8c1b846ae871c0ea33155e2bf1edd2eac8230111f0372dcb3d3909c5babc",
    })
  );

  const sendJettonTransaction = async () => {
    const Wallet_SRC = addr;
    const Wallet_DST = inpRef.current?.value ?? "";

    // 校验目标地址是否存在
    try {
      const walletInfo = await tonweb.provider.getAddressInfo(Wallet_DST);
      console.log("walletInfo", walletInfo);
    } catch (error) {
      popup.open({
        title: "Target address has error",
        message: error as string,
        buttons: [
          {
            type: "ok",
          },
        ],
      });
      console.log("error", error);
    }
    const forwardPayload = beginCell()
      .storeUint(0, 32) // 0 opcode means we have a comment
      .storeStringTail("Hello, TON!")
      .endCell();

    const body = beginCell()
      .storeUint(EOpcodes.TRANSFER, 32) // opcode for jetton transfer
      .storeUint(0, 64) // query id
      .storeCoins(toNano(5)) // jetton amount, amount * 10^9
      .storeAddress(Address.parse(Wallet_DST)) // TON 钱包目标地址
      .storeAddress(Address.parse(Wallet_SRC)) // 额外响应
      .storeBit(0) // 没有自定义负载
      .storeCoins(toNano(0.1)) // 转发 ton 额度 (if >0, will send notification message)
      .storeBit(1) // we store forwardPayload as a reference
      .storeRef(forwardPayload)
      .endCell();

    const myTransaction: SendTransactionRequest = {
      validUntil: Math.floor(Date.now() / 1000) + 360,
      messages: [
        {
          address: "kQDAsic1NjskDUIk8BKaLInjw8IwT8gCfQxoDj5XDf1H6zJb", // sender jetton wallet
          amount: toNano(0.2).toString(), // for commission fees, excess will be returned
          payload: body.toBoc().toString("base64"), // payload with jetton transfer and comment body
        },
      ],
    };

    if (!addr)
      return popup.open({
        title: "Wallet not connected",
        message: "Please connect wallet first",
        buttons: [{ type: "ok" }],
      });
    const result = await tonConnectUI.sendTransaction(myTransaction);
    console.log("send result", result);
  };
  return (
    <div className="flex flex-col">
      <h3>Jetton Transaction</h3>
      <div className="flex mb-4">
        <label>target wallet addr：</label>
        <input ref={inpRef} type="text" className="flex-1" />
      </div>
      <button className="flex-1" onClick={sendJettonTransaction}>
        Send transaction
      </button>
    </div>
  );
}
