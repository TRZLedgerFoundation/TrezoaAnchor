import { Idl, Coder } from "@trezoa-xyz/trezoaanchor";

import { TplGovernanceAccountsCoder } from "./accounts";
import { TplGovernanceEventsCoder } from "./events";
import { TplGovernanceInstructionCoder } from "./instructions";
import { TplGovernanceTypesCoder } from "./types";

/**
 * Coder for TplGovernance
 */
export class TplGovernanceCoder implements Coder {
  readonly accounts: TplGovernanceAccountsCoder;
  readonly events: TplGovernanceEventsCoder;
  readonly instruction: TplGovernanceInstructionCoder;
  readonly types: TplGovernanceTypesCoder;

  constructor(idl: Idl) {
    this.accounts = new TplGovernanceAccountsCoder(idl);
    this.events = new TplGovernanceEventsCoder(idl);
    this.instruction = new TplGovernanceInstructionCoder(idl);
    this.types = new TplGovernanceTypesCoder(idl);
  }
}
