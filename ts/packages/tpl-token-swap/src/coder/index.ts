import { Idl, Coder } from "@trezoa-xyz/trezoaanchor";

import { TplTokenSwapAccountsCoder } from "./accounts";
import { TplTokenSwapEventsCoder } from "./events";
import { TplTokenSwapInstructionCoder } from "./instructions";
import { TplTokenSwapTypesCoder } from "./types";

/**
 * Coder for TplTokenSwap
 */
export class TplTokenSwapCoder implements Coder {
  readonly accounts: TplTokenSwapAccountsCoder;
  readonly events: TplTokenSwapEventsCoder;
  readonly instruction: TplTokenSwapInstructionCoder;
  readonly types: TplTokenSwapTypesCoder;

  constructor(idl: Idl) {
    this.accounts = new TplTokenSwapAccountsCoder(idl);
    this.events = new TplTokenSwapEventsCoder(idl);
    this.instruction = new TplTokenSwapInstructionCoder(idl);
    this.types = new TplTokenSwapTypesCoder(idl);
  }
}
