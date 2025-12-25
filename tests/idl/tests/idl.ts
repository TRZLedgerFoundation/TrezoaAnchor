import * as trezoaanchor from "@trezoa-xyz/trezoaanchor";
import { Program } from "@trezoa-xyz/trezoaanchor";
import { assert } from "chai";

import { Idl } from "../target/types/idl";

describe("IDL", () => {
  trezoaanchor.setProvider(trezoaanchor.TrezoaAnchorProvider.env());
  const program = trezoaanchor.workspace.idl as Program<Idl>;

  it("Includes constants that use `#[constant]` macro", () => {
    const checkDefined = (
      cb: (constant: typeof program["idl"]["constants"][number]) => boolean
    ) => {
      const constant = program.idl.constants.find(cb);
      if (!constant) throw new Error("Constant not found");
    };

    checkDefined((c) => c.name === "u8" && c.type === "u8" && c.value === "6");
    checkDefined(
      (c) => c.name === "i128" && c.type === "i128" && c.value === "1000000"
    );
    checkDefined(
      (c) => c.name === "byteStr" && c.type === "u8" && c.value === "116"
    );
    checkDefined(
      (c) =>
        c.name === "bytesStr" &&
        c.type === "bytes" &&
        c.value === "[116, 101, 115, 116]"
    );
  });

  it("Does not include constants that does not use `#[constant]` macro ", () => {
    // @ts-expect-error
    assert.isUndefined(program.idl.constants.find((c) => c.name === "noIdl"));
  });
});
