const trezoaanchor = require("@trezoa-xyz/trezoaanchor");
const serumCmn = require("@trezoa-serum/common");

async function createBalanceSandbox(provider, r, registrySigner) {
  const spt = trezoaanchor.web3.Keypair.generate();
  const vault = trezoaanchor.web3.Keypair.generate();
  const vaultStake = trezoaanchor.web3.Keypair.generate();
  const vaultPw = trezoaanchor.web3.Keypair.generate();

  const lamports = await provider.connection.getMinimumBalanceForRentExemption(
    165
  );

  const createSptIx = await serumCmn.createTokenAccountInstrs(
    provider,
    spt.publicKey,
    r.poolMint,
    registrySigner,
    lamports
  );
  const createVaultIx = await serumCmn.createTokenAccountInstrs(
    provider,
    vault.publicKey,
    r.mint,
    registrySigner,
    lamports
  );
  const createVaultStakeIx = await serumCmn.createTokenAccountInstrs(
    provider,
    vaultStake.publicKey,
    r.mint,
    registrySigner,
    lamports
  );
  const createVaultPwIx = await serumCmn.createTokenAccountInstrs(
    provider,
    vaultPw.publicKey,
    r.mint,
    registrySigner,
    lamports
  );
  let tx0 = new trezoaanchor.web3.Transaction();
  tx0.add(
    ...createSptIx,
    ...createVaultIx,
    ...createVaultStakeIx,
    ...createVaultPwIx
  );
  let signers0 = [spt, vault, vaultStake, vaultPw];

  const tx = { tx: tx0, signers: signers0 };

  return [
    tx,
    {
      spt: spt.publicKey,
      vault: vault.publicKey,
      vaultStake: vaultStake.publicKey,
      vaultPw: vaultPw.publicKey,
    },
  ];
}

module.exports = {
  createBalanceSandbox,
};
