const trezoaanchor = require("@trezoa-xyz/trezoaanchor");
const serumCmn = require("@trezoa-serum/common");
const TokenInstructions = require("@trezoa-serum/serum").TokenInstructions;
const utils = require("../../deps/stake/tests/utils");

const lockup = trezoaanchor.workspace.Lockup;
const registry = trezoaanchor.workspace.Registry;
const provider = trezoaanchor.TrezoaAnchorProvider.env();
// hack so we don't have to update serum-common library
// to the new TrezoaAnchorProvider class and Provider interface
provider.send = provider.sendAndConfirm;

let lockupAddress = null;
let mint = null;
let god = null;

let registrarAccount = null;
let registrarSigner = null;
let nonce = null;
let poolMint = null;

const registrar = new trezoaanchor.web3.Account();
const rewardQ = new trezoaanchor.web3.Account();
const withdrawalTimelock = new trezoaanchor.BN(4);
const stakeRate = new trezoaanchor.BN(2);
const rewardQLen = 170;
let member = null;

let memberAccount = null;
let memberSigner = null;
let balances = null;
let balancesLocked = null;

const WHITELIST_SIZE = 10;

async function setupStakePool(mint, god) {
  // Registry genesis.
  const [_registrarSigner, _nonce] =
    await trezoaanchor.web3.PublicKey.findProgramAddress(
      [registrar.publicKey.toBuffer()],
      registry.programId
    );
  registrarSigner = _registrarSigner;
  nonce = _nonce;
  poolMint = await serumCmn.createMint(provider, registrarSigner);

  try {
    // Init registry.
    await registry.state.rpc.new({
      accounts: { lockupProgram: lockup.programId },
    });

    // Init lockup.
    await lockup.state.rpc.new({
      accounts: {
        authority: provider.wallet.publicKey,
      },
    });
  } catch (err) {
    // Skip errors for convenience when developing locally,
    // since the state constructors can only be called once.
  }

  // Initialize stake pool.
  await registry.rpc.initialize(
    mint,
    provider.wallet.publicKey,
    nonce,
    withdrawalTimelock,
    stakeRate,
    rewardQLen,
    {
      accounts: {
        registrar: registrar.publicKey,
        poolMint,
        rewardEventQ: rewardQ.publicKey,
        rent: trezoaanchor.web3.SYSVAR_RENT_PUBKEY,
      },
      signers: [registrar, rewardQ],
      instructions: [
        await registry.account.registrar.createInstruction(registrar),
        await registry.account.rewardQueue.createInstruction(rewardQ, 8250),
      ],
    }
  );
  registrarAccount = await registry.account.registrar.fetch(
    registrar.publicKey
  );
  console.log("Registrar", registrar.publicKey.toString());
  console.log("Wallet", registry.provider.wallet.publicKey.toString());
  // Create account for staker.
  const seed = trezoaanchor.utils.sha256
    .hash(`${registrar.publicKey.toString()}:Member`)
    .slice(0, 32);
  member = await trezoaanchor.web3.PublicKey.createWithSeed(
    registry.provider.wallet.publicKey,
    seed,
    registry.programId
  );
  const [_memberSigner, nonce2] =
    await trezoaanchor.web3.PublicKey.findProgramAddress(
      [registrar.publicKey.toBuffer(), member.toBuffer()],
      registry.programId
    );
  memberSigner = _memberSigner;
  const [mainTx, _balances] = await utils.createBalanceSandbox(
    provider,
    registrarAccount,
    memberSigner
  );
  const [lockedTx, _balancesLocked] = await utils.createBalanceSandbox(
    provider,
    registrarAccount,
    memberSigner
  );
  balances = _balances;
  balancesLocked = _balancesLocked;
  const tx = registry.transaction.createMember(nonce2, {
    accounts: {
      registrar: registrar.publicKey,
      member: member,
      beneficiary: provider.wallet.publicKey,
      memberSigner,
      balances,
      balancesLocked,
      tokenProgram: TokenInstructions.TOKEN_PROGRAM_ID,
      rent: trezoaanchor.web3.SYSVAR_RENT_PUBKEY,
    },
    instructions: [
      trezoaanchor.web3.SystemProgram.createAccountWithSeed({
        fromPubkey: registry.provider.wallet.publicKey,
        newAccountPubkey: member,
        basePubkey: registry.provider.wallet.publicKey,
        seed,
        lamports:
          await registry.provider.connection.getMinimumBalanceForRentExemption(
            registry.account.member.size
          ),
        space: registry.account.member.size,
        programId: registry.programId,
      }),
    ],
  });
  const signers = [provider.wallet.payer];
  const allTxs = [mainTx, lockedTx, { tx, signers }];
  await provider.sendAll(allTxs);
  memberAccount = await registry.account.member.fetch(member);

  // Deposit into stake program.
  const depositAmount = new trezoaanchor.BN(120);
  await registry.rpc.deposit(depositAmount, {
    accounts: {
      depositor: god,
      depositorAuthority: provider.wallet.publicKey,
      tokenProgram: TokenInstructions.TOKEN_PROGRAM_ID,
      vault: memberAccount.balances.vault,
      beneficiary: provider.wallet.publicKey,
      member: member,
    },
  });

  // Stake.
  const stakeAmount = new trezoaanchor.BN(10);
  await registry.rpc.stake(stakeAmount, false, {
    accounts: {
      // Stake instance.
      registrar: registrar.publicKey,
      rewardEventQ: rewardQ.publicKey,
      poolMint,
      // Member.
      member: member,
      beneficiary: provider.wallet.publicKey,
      balances,
      balancesLocked,
      // Program signers.
      memberSigner,
      registrarSigner,
      // Misc.
      clock: trezoaanchor.web3.SYSVAR_CLOCK_PUBKEY,
      tokenProgram: TokenInstructions.TOKEN_PROGRAM_ID,
    },
  });
}

module.exports = {
  setupStakePool,
};
