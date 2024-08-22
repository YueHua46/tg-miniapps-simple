import { beginCell } from "@ton/core";

export const transactionComment = (text: string) => {
  const cell = beginCell().storeUint(0, 32).storeStringTail(text).endCell();

  const boc = cell.toBoc();
  return boc.toString("base64");
};
