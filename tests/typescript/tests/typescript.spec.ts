import * as trezoaanchor from "@trezoa-xyz/trezoaanchor";

describe("typescript", () => {
  // Configure the client to use the local cluster.
  trezoaanchor.setProvider(trezoaanchor.TrezoaAnchorProvider.env());

  it("Is initialized!", async () => {
    // Add your test here.
    const program = trezoaanchor.workspace.Typescript;
    const tx = await program.rpc.initialize();
    console.log("Your transaction signature", tx);
  });
});
