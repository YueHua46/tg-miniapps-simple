import { beginCell, Cell } from "@ton/core";

export const string2bocBase64 = (text: string) => {
  const cell = beginCell().storeUint(0, 32).storeStringTail(text).endCell();

  const boc = cell.toBoc();
  return boc.toString("base64");
};

export const boc2hash = (boc: string) => {
  return Cell.fromBase64(boc).hash().toString("hex");
};
