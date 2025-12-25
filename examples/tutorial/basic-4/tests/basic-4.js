const assert = require("assert");
const trezoaanchor = require("@trezoa-xyz/trezoaanchor");

describe("basic-4", () => {
  const provider = trezoaanchor.TrezoaAnchorProvider.local();

  // Configure the client to use the local cluster.
  trezoaanchor.setProvider(provider);

  const program = trezoaanchor.workspace.Basic4,
    counterSeed = trezoaanchor.utils.bytes.utf8.encode("counter");

  let counterPubkey;

  before(async () => {
    [counterPubkey] = await trezoaanchor.web3.PublicKey.findProgramAddress(
      [counterSeed],
      program.programId
    );
  });

  it("Is runs the constructor", async () => {
    // Initialize the program's state struct.
    await program.methods
      .initialize()
      .accounts({
        counter: counterPubkey,
        authority: provider.wallet.publicKey,
        systemProgram: trezoaanchor.web3.SystemProgram.programId,
      })
      .rpc();

    // Fetch the state struct from the network.
    const counterAccount = await program.account.counter.fetch(counterPubkey);

    assert.ok(counterAccount.count.eq(new trezoaanchor.BN(0)));
  });

  it("Executes a method on the program", async () => {
    await program.methods
      .increment()
      .accounts({
        counter: counterPubkey,
        authority: provider.wallet.publicKey,
      })
      .rpc();

    const counterAccount = await program.account.counter.fetch(counterPubkey);
    assert.ok(counterAccount.count.eq(new trezoaanchor.BN(1)));
  });
});
