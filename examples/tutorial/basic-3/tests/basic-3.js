const assert = require("assert");
const trezoaanchor = require("@trezoa-xyz/trezoaanchor");
const { SystemProgram } = trezoaanchor.web3;

describe("basic-3", () => {
  const provider = trezoaanchor.TrezoaAnchorProvider.local();

  // Configure the client to use the local cluster.
  trezoaanchor.setProvider(provider);

  it("Performs CPI from puppet master to puppet", async () => {
    const puppetMaster = trezoaanchor.workspace.PuppetMaster;
    const puppet = trezoaanchor.workspace.Puppet;

    // Initialize a new puppet account.
    const newPuppetAccount = trezoaanchor.web3.Keypair.generate();
    const tx = await puppet.methods
      .initialize()
      .accounts({
        puppet: newPuppetAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([newPuppetAccount])
      .rpc();

    // Invoke the puppet master to perform a CPI to the puppet.
    await puppetMaster.methods
      .pullStrings(new trezoaanchor.BN(111))
      .accounts({
        puppet: newPuppetAccount.publicKey,
        puppetProgram: puppet.programId,
      })
      .rpc();

    // Check the state updated.
    puppetAccount = await puppet.account.data.fetch(newPuppetAccount.publicKey);
    assert.ok(puppetAccount.data.eq(new trezoaanchor.BN(111)));
  });
});
