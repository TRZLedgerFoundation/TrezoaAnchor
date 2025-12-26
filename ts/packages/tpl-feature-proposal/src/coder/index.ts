import { Idl, Coder } from "@trezoa-xyz/trezoaanchor";

import { TplFeatureProposalAccountsCoder } from "./accounts";
import { TplFeatureProposalEventsCoder } from "./events";
import { TplFeatureProposalInstructionCoder } from "./instructions";
import { TplFeatureProposalTypesCoder } from "./types";

/**
 * Coder for TplFeatureProposal
 */
export class TplFeatureProposalCoder implements Coder {
  readonly accounts: TplFeatureProposalAccountsCoder;
  readonly events: TplFeatureProposalEventsCoder;
  readonly instruction: TplFeatureProposalInstructionCoder;
  readonly types: TplFeatureProposalTypesCoder;

  constructor(idl: Idl) {
    this.accounts = new TplFeatureProposalAccountsCoder(idl);
    this.events = new TplFeatureProposalEventsCoder(idl);
    this.instruction = new TplFeatureProposalInstructionCoder(idl);
    this.types = new TplFeatureProposalTypesCoder(idl);
  }
}
