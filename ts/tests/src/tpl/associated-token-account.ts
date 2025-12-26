import { tplAssociatedTokenAccountProgram } from "@trezoa-xyz/tpl-associated-token-account";
import { tplTokenProgram } from "@trezoa-xyz/tpl-token";
import { Keypair, PublicKey, SystemProgram } from "@trezoa/web3.js";

import { TPL_ATA_PROGRAM_ID, TPL_TOKEN_PROGRAM_ID } from "../constants";
import {
  createMint,
  getAta,
  getProvider,
  loadKp,
  sendAndConfirmTx,
  test,
} from "../utils";

export async function associatedTokenAccountTests() {
  const provider = await getProvider();
  const ataProgram = tplAssociatedTokenAccountProgram({
    provider,
    programId: TPL_ATA_PROGRAM_ID,
  });
  const tokenProgram = tplTokenProgram({
    provider,
    programId: TPL_TOKEN_PROGRAM_ID,
  });
  const kp = await loadKp();

  let mintPk: PublicKey;
  let ataPk: PublicKey;

  async function create() {
    mintPk = await createMint();
    ataPk = await getAta(mintPk, kp.publicKey);

    const createAtaIx = await ataProgram.methods
      .create()
      .accounts({
        associatedAccountAddress: ataPk,
        fundingAddress: kp.publicKey,
        systemProgram: SystemProgram.programId,
        tokenMintAddress: mintPk,
        tokenProgram: tokenProgram.programId,
        walletAddress: kp.publicKey,
      })
      .instruction();

    await sendAndConfirmTx([createAtaIx], [kp]);
  }

  async function createIdempotent() {
    const randomPk = new Keypair().publicKey;

    const createAtaIdempotentIx = await ataProgram.methods
      .createIdempotent()
      .accounts({
        associatedAccountAddress: await getAta(mintPk, randomPk),
        fundingAddress: kp.publicKey,
        systemProgram: SystemProgram.programId,
        tokenMintAddress: mintPk,
        tokenProgram: tokenProgram.programId,
        walletAddress: randomPk,
      })
      .instruction();

    await sendAndConfirmTx([createAtaIdempotentIx], [kp]);
  }

  async function recoverNested() {
    // Create ata address for the ata
    const nestedAtaPk = await getAta(mintPk, ataPk);
    const createAtaIx = await ataProgram.methods
      .create()
      .accounts({
        associatedAccountAddress: nestedAtaPk,
        fundingAddress: kp.publicKey,
        systemProgram: SystemProgram.programId,
        tokenMintAddress: mintPk,
        tokenProgram: tokenProgram.programId,
        walletAddress: ataPk,
      })
      .instruction();
    const recoverNestedIx = await ataProgram.methods
      .recoverNested()
      .accounts({
        destinationAssociatedAccountAddress: ataPk,
        nestedAssociatedAccountAddress: nestedAtaPk,
        nestedTokenMintAddress: mintPk,
        ownerAssociatedAccountAddress: ataPk,
        ownerTokenMintAddress: mintPk,
        tokenProgram: tokenProgram.programId,
        walletAddress: kp.publicKey,
      })
      .instruction();

    await sendAndConfirmTx([createAtaIx], [kp]);
    await sendAndConfirmTx([recoverNestedIx], [kp]);
  }

  await test(create);
  await test(createIdempotent);
  await test(recoverNested);
}
