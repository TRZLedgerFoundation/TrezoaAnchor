import { Idl, TypesCoder } from "@trezoa-xyz/trezoaanchor";

export class TplFeatureProposalTypesCoder implements TypesCoder {
  constructor(_idl: Idl) {}

  encode<T = any>(_name: string, _type: T): Buffer {
    throw new Error("TplFeatureProposal does not have user-defined types");
  }
  decode<T = any>(_name: string, _typeData: Buffer): T {
    throw new Error("TplFeatureProposal does not have user-defined types");
  }
}
