const trezoaanchor = require("@trezoa-xyz/trezoaanchor");
const { assert } = require("chai");

describe("sysvars", () => {
  // Configure the client to use the local cluster.
  trezoaanchor.setProvider(trezoaanchor.TrezoaAnchorProvider.local());
  const program = trezoaanchor.workspace.Sysvars;

  it("Is initialized!", async () => {
    const tx = await program.methods
      .sysvars()
      .accounts({
        clock: trezoaanchor.web3.SYSVAR_CLOCK_PUBKEY,
        rent: trezoaanchor.web3.SYSVAR_RENT_PUBKEY,
        stakeHistory: trezoaanchor.web3.SYSVAR_STAKE_HISTORY_PUBKEY,
      })
      .rpc();
    console.log("Your transaction signature", tx);
  });

  it("Fails when the wrong pubkeys are provided", async () => {
    try {
      await program.methods
        .sysvars()
        .accounts({
          clock: trezoaanchor.web3.SYSVAR_CLOCK_PUBKEY,
          rent: trezoaanchor.web3.SYSVAR_RENT_PUBKEY,
          stakeHistory: trezoaanchor.web3.SYSVAR_REWARDS_PUBKEY,
        })
        .rpc();
      assert.ok(false);
    } catch (err) {
      const errMsg = "The given public key does not match the required sysvar";
      assert.strictEqual(err.error.errorMessage, errMsg);
      assert.strictEqual(err.error.errorCode.number, 3015);
    }
  });
});
