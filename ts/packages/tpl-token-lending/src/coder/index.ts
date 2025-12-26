import { Idl, Coder } from "@trezoa-xyz/trezoaanchor";

import { TplTokenLendingAccountsCoder } from "./accounts";
import { TplTokenLendingEventsCoder } from "./events";
import { TplTokenLendingInstructionCoder } from "./instructions";
import { TplTokenLendingTypesCoder } from "./types";

/**
 * Coder for TplTokenLending
 */
export class TplTokenLendingCoder implements Coder {
  readonly accounts: TplTokenLendingAccountsCoder;
  readonly events: TplTokenLendingEventsCoder;
  readonly instruction: TplTokenLendingInstructionCoder;
  readonly types: TplTokenLendingTypesCoder;

  constructor(idl: Idl) {
    this.accounts = new TplTokenLendingAccountsCoder(idl);
    this.events = new TplTokenLendingEventsCoder(idl);
    this.instruction = new TplTokenLendingInstructionCoder(idl);
    this.types = new TplTokenLendingTypesCoder(idl);
  }
}
