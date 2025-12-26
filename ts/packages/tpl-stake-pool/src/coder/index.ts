import { Idl, Coder } from "@trezoa-xyz/trezoaanchor";

import { TplStakePoolAccountsCoder } from "./accounts";
import { TplStakePoolEventsCoder } from "./events";
import { TplStakePoolInstructionCoder } from "./instructions";
import { TplStakePoolTypesCoder } from "./types";

/**
 * Coder for TplStakePool
 */
export class TplStakePoolCoder implements Coder {
  readonly accounts: TplStakePoolAccountsCoder;
  readonly events: TplStakePoolEventsCoder;
  readonly instruction: TplStakePoolInstructionCoder;
  readonly types: TplStakePoolTypesCoder;

  constructor(idl: Idl) {
    this.accounts = new TplStakePoolAccountsCoder(idl);
    this.events = new TplStakePoolEventsCoder(idl);
    this.instruction = new TplStakePoolInstructionCoder(idl);
    this.types = new TplStakePoolTypesCoder(idl);
  }
}
