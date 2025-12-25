import * as trezoaanchor from "@trezoa-xyz/trezoaanchor";
import { Program } from "@trezoa-xyz/trezoaanchor";
import { assert } from "chai";
import { MultipleSuitesRunSingle } from "../../target/types/multiple_suites_run_single";

describe("multiple-suites-run-single", () => {
  // Configure the client to use the local cluster.
  trezoaanchor.setProvider(trezoaanchor.TrezoaAnchorProvider.env());

  const program = trezoaanchor.workspace
    .MultipleSuitesRunSingle as Program<MultipleSuitesRunSingle>;

  it("Is initialized!", async () => {
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });
});
