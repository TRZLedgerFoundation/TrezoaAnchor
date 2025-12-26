import { Idl, Coder } from "@trezoa-xyz/trezoaanchor";

import { TplNameServiceAccountsCoder } from "./accounts";
import { TplNameServiceEventsCoder } from "./events";
import { TplNameServiceInstructionCoder } from "./instructions";
import { TplNameServiceTypesCoder } from "./types";

/**
 * Coder for TplNameService
 */
export class TplNameServiceCoder implements Coder {
  readonly accounts: TplNameServiceAccountsCoder;
  readonly events: TplNameServiceEventsCoder;
  readonly instruction: TplNameServiceInstructionCoder;
  readonly types: TplNameServiceTypesCoder;

  constructor(idl: Idl) {
    this.accounts = new TplNameServiceAccountsCoder(idl);
    this.events = new TplNameServiceEventsCoder(idl);
    this.instruction = new TplNameServiceInstructionCoder(idl);
    this.types = new TplNameServiceTypesCoder(idl);
  }
}
