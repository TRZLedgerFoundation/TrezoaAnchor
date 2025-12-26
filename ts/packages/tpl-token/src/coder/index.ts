import { Idl, Coder } from "@trezoa-xyz/trezoaanchor";

import { TplTokenAccountsCoder } from "./accounts";
import { TplTokenEventsCoder } from "./events";
import { TplTokenInstructionCoder } from "./instructions";
import { TplTokenTypesCoder } from "./types";

/**
 * Coder for TplToken
 */
export class TplTokenCoder implements Coder {
  readonly accounts: TplTokenAccountsCoder;
  readonly events: TplTokenEventsCoder;
  readonly instruction: TplTokenInstructionCoder;
  readonly types: TplTokenTypesCoder;

  constructor(idl: Idl) {
    this.accounts = new TplTokenAccountsCoder(idl);
    this.events = new TplTokenEventsCoder(idl);
    this.instruction = new TplTokenInstructionCoder(idl);
    this.types = new TplTokenTypesCoder(idl);
  }
}
