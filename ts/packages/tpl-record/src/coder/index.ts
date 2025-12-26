import { Idl, Coder } from "@trezoa-xyz/trezoaanchor";

import { TplRecordAccountsCoder } from "./accounts";
import { TplRecordEventsCoder } from "./events";
import { TplRecordInstructionCoder } from "./instructions";
import { TplRecordTypesCoder } from "./types";

/**
 * Coder for TplRecord
 */
export class TplRecordCoder implements Coder {
  readonly accounts: TplRecordAccountsCoder;
  readonly events: TplRecordEventsCoder;
  readonly instruction: TplRecordInstructionCoder;
  readonly types: TplRecordTypesCoder;

  constructor(idl: Idl) {
    this.accounts = new TplRecordAccountsCoder(idl);
    this.events = new TplRecordEventsCoder(idl);
    this.instruction = new TplRecordInstructionCoder(idl);
    this.types = new TplRecordTypesCoder(idl);
  }
}
