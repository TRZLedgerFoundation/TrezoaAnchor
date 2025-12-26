import { Idl, Coder } from "@trezoa-xyz/trezoaanchor";

import { TplBinaryOraclePairAccountsCoder } from "./accounts";
import { TplBinaryOraclePairEventsCoder } from "./events";
import { TplBinaryOraclePairInstructionCoder } from "./instructions";
import { TplBinaryOraclePairTypesCoder } from "./types";

/**
 * Coder for TplBinaryOraclePair
 */
export class TplBinaryOraclePairCoder implements Coder {
  readonly accounts: TplBinaryOraclePairAccountsCoder;
  readonly events: TplBinaryOraclePairEventsCoder;
  readonly instruction: TplBinaryOraclePairInstructionCoder;
  readonly types: TplBinaryOraclePairTypesCoder;

  constructor(idl: Idl) {
    this.accounts = new TplBinaryOraclePairAccountsCoder(idl);
    this.events = new TplBinaryOraclePairEventsCoder(idl);
    this.instruction = new TplBinaryOraclePairInstructionCoder(idl);
    this.types = new TplBinaryOraclePairTypesCoder(idl);
  }
}
