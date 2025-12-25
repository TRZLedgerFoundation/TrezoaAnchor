const trezoaanchor = require("@trezoa-xyz/trezoaanchor");

describe("basic-0", () => {
  // Configure the client to use the local cluster.
  trezoaanchor.setProvider(trezoaanchor.TrezoaAnchorProvider.local());

  it("Uses the workspace to invoke the initialize instruction", async () => {
    // #region code
    // Read the deployed program from the workspace.
    const program = trezoaanchor.workspace.Basic0;

    // Execute the RPC.
    await program.methods.initialize().rpc();
    // #endregion code
  });
});
