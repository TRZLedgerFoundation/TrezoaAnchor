import { Native, TrezoaAnchorProvider, setProvider } from "@trezoa-xyz/trezoaanchor";
import { tplAssociatedTokenAccountProgram } from "@trezoa-xyz/tpl-associated-token-account";
import { tplTokenProgram } from "@trezoa-xyz/tpl-token";
import { Keypair, PublicKey, SYSVAR_RENT_PUBKEY } from "@trezoa/web3.js";
import * as assert from "assert";

describe("spl-associated-token-coder", () => {
  // Configure the client to use the local cluster.
  const provider = TrezoaAnchorProvider.env();
  setProvider(provider);

  // Client.
  const program = tplAssociatedTokenAccountProgram({
    provider,
  });
  const systemProgram = Native.system();
  const tokenProgram = tplTokenProgram({
    provider,
  });

  it("Creates an account", async () => {
    // arrange
    const mintKeypair = Keypair.generate();
    const mintDecimals = 6;
    const [associatedToken] = await PublicKey.findProgramAddress(
      [
        provider.publicKey.toBuffer(),
        tokenProgram.programId.toBuffer(),
        mintKeypair.publicKey.toBuffer(),
      ],
      program.programId
    );

    // act
    await program.methods
      .create()
      .accounts({
        associatedAccountAddress: associatedToken,
        fundingAddress: provider.wallet.publicKey,
        systemProgram: systemProgram.programId,
        tokenMintAddress: mintKeypair.publicKey,
        tokenProgram: tokenProgram.programId,
        walletAddress: provider.wallet.publicKey,
      })
      .preInstructions(
        await Promise.all([
          tokenProgram.account.mint.createInstruction(mintKeypair),
          tokenProgram.methods
            .initializeMint(mintDecimals, provider.wallet.publicKey, null)
            .accounts({
              mint: mintKeypair.publicKey,
              rent: SYSVAR_RENT_PUBKEY,
            })
            .instruction(),
        ])
      )
      .signers([mintKeypair])
      .rpc();
    // assert
    const tokenAccount = await tokenProgram.account.account.fetch(
      associatedToken
    );
    assert.ok(tokenAccount.mint.equals(mintKeypair.publicKey));
  });
});
