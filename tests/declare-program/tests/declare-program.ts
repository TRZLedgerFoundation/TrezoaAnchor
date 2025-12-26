import * as trezoaanchor from "@trezoa-xyz/trezoaanchor";
import assert from "assert";

import type { DeclareProgram } from "../target/types/declare_program";
import type { External } from "../target/types/external";

describe("declare-program", () => {
  trezoaanchor.setProvider(trezoaanchor.TrezoaAnchorProvider.env());
  const program: trezoaanchor.Program<DeclareProgram> =
    trezoaanchor.workspace.declareProgram;
  const externalProgram: trezoaanchor.Program<External> = trezoaanchor.workspace.external;

  // TODO: Add a utility type that does this?
  let pubkeys: Awaited<
    ReturnType<
      ReturnType<typeof externalProgram["methods"]["init"]>["rpcAndKeys"]
    >
  >["pubkeys"];

  before(async () => {
    pubkeys = (await externalProgram.methods.init().rpcAndKeys()).pubkeys;
  });

  it("Can CPI", async () => {
    const value = 5;
    await program.methods
      .cpi(value)
      .accounts({ cpiMyAccount: pubkeys.myAccount })
      .rpc();

    const myAccount = await externalProgram.account.myAccount.fetch(
      pubkeys.myAccount
    );
    assert.strictEqual(myAccount.field, value);
  });

  it("Can CPI composite", async () => {
    const value = 3;
    await program.methods
      .cpiComposite(value)
      .accounts({ cpiMyAccount: pubkeys.myAccount })
      .rpc();

    const myAccount = await externalProgram.account.myAccount.fetch(
      pubkeys.myAccount
    );
    assert.strictEqual(myAccount.field, value);
  });

  it("Produces correct IDL", () => {
    // The program itself doesn't have an error definition, therefore its IDL
    // also shouldn't have the `errors` field.
    //
    // https://github.com/TRZLedgerFoundation/TrezoaAnchor/pull/3757#discussion_r2424695717
    if (program.idl.errors) throw new Error("The IDL should not have `errors`");
  });
});
