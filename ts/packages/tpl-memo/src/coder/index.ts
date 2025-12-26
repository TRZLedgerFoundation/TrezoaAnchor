import { Idl, Coder } from "@trezoa-xyz/trezoaanchor";

import { TplMemoAccountsCoder } from "./accounts";
import { TplMemoEventsCoder } from "./events";
import { TplMemoInstructionCoder } from "./instructions";
import { TplMemoTypesCoder } from "./types";

/**
 * Coder for TplMemo
 */
export class TplMemoCoder implements Coder {
  readonly accounts: TplMemoAccountsCoder;
  readonly events: TplMemoEventsCoder;
  readonly instruction: TplMemoInstructionCoder;
  readonly types: TplMemoTypesCoder;

  constructor(idl: Idl) {
    this.accounts = new TplMemoAccountsCoder(idl);
    this.events = new TplMemoEventsCoder(idl);
    this.instruction = new TplMemoInstructionCoder(idl);
    this.types = new TplMemoTypesCoder(idl);
  }
}
