import { Idl, Coder } from "@trezoa-xyz/trezoaanchor";

import { TplStatelessAsksAccountsCoder } from "./accounts";
import { TplStatelessAsksEventsCoder } from "./events";
import { TplStatelessAsksInstructionCoder } from "./instructions";
import { TplStatelessAsksTypesCoder } from "./types";

/**
 * Coder for TplStatelessAsks
 */
export class TplStatelessAsksCoder implements Coder {
  readonly accounts: TplStatelessAsksAccountsCoder;
  readonly events: TplStatelessAsksEventsCoder;
  readonly instruction: TplStatelessAsksInstructionCoder;
  readonly types: TplStatelessAsksTypesCoder;

  constructor(idl: Idl) {
    this.accounts = new TplStatelessAsksAccountsCoder(idl);
    this.events = new TplStatelessAsksEventsCoder(idl);
    this.instruction = new TplStatelessAsksInstructionCoder(idl);
    this.types = new TplStatelessAsksTypesCoder(idl);
  }
}
