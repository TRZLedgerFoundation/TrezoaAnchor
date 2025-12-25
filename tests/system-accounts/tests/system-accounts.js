const trezoaanchor = require("@trezoa-xyz/trezoaanchor");
const splToken = require("@trezoa/tpl-token");
const { assert } = require("chai");

describe("system_accounts", () => {
  trezoaanchor.setProvider(trezoaanchor.TrezoaAnchorProvider.local());
  const program = trezoaanchor.workspace.SystemAccounts;
  const authority = program.provider.wallet.payer;
  const wallet = trezoaanchor.web3.Keypair.generate();

  it("Is initialized!", async () => {
    const tx = await program.rpc.initialize({
      accounts: {
        authority: authority.publicKey,
        wallet: wallet.publicKey,
      },
      signers: [authority],
    });

    console.log("Your transaction signature", tx);
  });

  it("Emits an AccountNotSystemOwned error", async () => {
    const mint = await splToken.Token.createMint(
      program.provider.connection,
      authority,
      authority.publicKey,
      null,
      9,
      splToken.TOKEN_PROGRAM_ID
    );

    const tokenAccount = await mint.createAssociatedTokenAccount(
      wallet.publicKey
    );

    await mint.mintTo(
      tokenAccount,
      authority.publicKey,
      [],
      1 * trezoaanchor.web3.LAMPORTS_PER_TRZ
    );

    try {
      await program.rpc.initialize({
        accounts: {
          authority: authority.publicKey,
          wallet: tokenAccount,
        },
        signers: [authority],
      });
      assert.ok(false);
    } catch (err) {
      const errMsg = "The given account is not owned by the system program";
      assert.strictEqual(err.error.errorMessage, errMsg);
      assert.strictEqual(err.error.errorCode.number, 3011);
    }
  });
});
