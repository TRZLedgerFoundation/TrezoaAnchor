import { Idl, Coder } from "@trezoa-xyz/trezoaanchor";

import { TplAssociatedTokenAccountAccountsCoder } from "./accounts";
import { TplAssociatedTokenAccountEventsCoder } from "./events";
import { TplAssociatedTokenAccountInstructionCoder } from "./instructions";
import { TplAssociatedTokenAccountTypesCoder } from "./types";

/**
 * Coder for TplAssociatedTokenAccount
 */
export class TplAssociatedTokenAccountCoder implements Coder {
  readonly accounts: TplAssociatedTokenAccountAccountsCoder;
  readonly events: TplAssociatedTokenAccountEventsCoder;
  readonly instruction: TplAssociatedTokenAccountInstructionCoder;
  readonly types: TplAssociatedTokenAccountTypesCoder;

  constructor(idl: Idl) {
    this.accounts = new TplAssociatedTokenAccountAccountsCoder(idl);
    this.events = new TplAssociatedTokenAccountEventsCoder(idl);
    this.instruction = new TplAssociatedTokenAccountInstructionCoder(idl);
    this.types = new TplAssociatedTokenAccountTypesCoder(idl);
  }
}
