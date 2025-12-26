import { Idl, Coder } from "@trezoa-xyz/trezoaanchor";

import { TplBinaryOptionAccountsCoder } from "./accounts";
import { TplBinaryOptionEventsCoder } from "./events";
import { TplBinaryOptionInstructionCoder } from "./instructions";
import { TplBinaryOptionTypesCoder } from "./types";

/**
 * Coder for TplBinaryOption
 */
export class TplBinaryOptionCoder implements Coder {
  readonly accounts: TplBinaryOptionAccountsCoder;
  readonly events: TplBinaryOptionEventsCoder;
  readonly instruction: TplBinaryOptionInstructionCoder;
  readonly types: TplBinaryOptionTypesCoder;

  constructor(idl: Idl) {
    this.accounts = new TplBinaryOptionAccountsCoder(idl);
    this.events = new TplBinaryOptionEventsCoder(idl);
    this.instruction = new TplBinaryOptionInstructionCoder(idl);
    this.types = new TplBinaryOptionTypesCoder(idl);
  }
}
