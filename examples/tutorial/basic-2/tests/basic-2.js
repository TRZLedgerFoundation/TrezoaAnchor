const assert = require("assert");
const trezoaanchor = require("@trezoa-xyz/trezoaanchor");
const { SystemProgram } = trezoaanchor.web3;

describe("basic-2", () => {
  const provider = trezoaanchor.TrezoaAnchorProvider.local();

  // Configure the client to use the local cluster.
  trezoaanchor.setProvider(provider);

  // Counter for the tests.
  const counter = trezoaanchor.web3.Keypair.generate();

  // Program for the tests.
  const program = trezoaanchor.workspace.Basic2;

  it("Creates a counter", async () => {
    await program.methods
      .create(provider.wallet.publicKey)
      .accounts({
        counter: counter.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([counter])
      .rpc();

    let counterAccount = await program.account.counter.fetch(counter.publicKey);

    assert.ok(counterAccount.authority.equals(provider.wallet.publicKey));
    assert.ok(counterAccount.count.toNumber() === 0);
  });

  it("Updates a counter", async () => {
    await program.methods
      .increment()
      .accounts({
        counter: counter.publicKey,
        authority: provider.wallet.publicKey,
      })
      .rpc();

    const counterAccount = await program.account.counter.fetch(
      counter.publicKey
    );

    assert.ok(counterAccount.authority.equals(provider.wallet.publicKey));
    assert.ok(counterAccount.count.toNumber() == 1);
  });
});
