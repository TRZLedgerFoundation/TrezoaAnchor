const { assert } = require("chai");
const trezoaanchor = require("@trezoa-xyz/trezoaanchor");

describe("composite", () => {
  const provider = trezoaanchor.TrezoaAnchorProvider.local();

  // Configure the client to use the local cluster.
  trezoaanchor.setProvider(provider);

  it("Is initialized!", async () => {
    const program = trezoaanchor.workspace.Composite;

    const dummyA = trezoaanchor.web3.Keypair.generate();
    const dummyB = trezoaanchor.web3.Keypair.generate();

    const tx = await program.rpc.initialize({
      accounts: {
        dummyA: dummyA.publicKey,
        dummyB: dummyB.publicKey,
        rent: trezoaanchor.web3.SYSVAR_RENT_PUBKEY,
      },
      signers: [dummyA, dummyB],
      instructions: [
        await program.account.dummyA.createInstruction(dummyA),
        await program.account.dummyB.createInstruction(dummyB),
      ],
    });

    await program.rpc.compositeUpdate(
      new trezoaanchor.BN(1234),
      new trezoaanchor.BN(4321),
      {
        accounts: {
          foo: {
            dummyA: dummyA.publicKey,
          },
          bar: {
            dummyB: dummyB.publicKey,
          },
        },
      }
    );

    const dummyAAccount = await program.account.dummyA.fetch(dummyA.publicKey);
    const dummyBAccount = await program.account.dummyB.fetch(dummyB.publicKey);

    assert.isTrue(dummyAAccount.data.eq(new trezoaanchor.BN(1234)));
    assert.isTrue(dummyBAccount.data.eq(new trezoaanchor.BN(4321)));
  });
});
