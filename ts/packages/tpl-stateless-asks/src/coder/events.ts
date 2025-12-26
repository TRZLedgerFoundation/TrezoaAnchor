import { Idl, Event, EventCoder } from "@trezoa-xyz/trezoaanchor";
import { IdlEvent } from "@trezoa-xyz/trezoaanchor/dist/cjs/idl";

export class TplStatelessAsksEventsCoder implements EventCoder {
  constructor(_idl: Idl) {}

  decode<E extends IdlEvent = IdlEvent, T = Record<string, string>>(
    _log: string
  ): Event<E, T> | null {
    throw new Error("TplStatelessAsks program does not have events");
  }
}
