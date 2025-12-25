#!/usr/bin/env node

// Script to infinitely post orders that are immediately filled.

const process = require("process");
const trezoaanchor = require("@trezoa-xyz/trezoaanchor");
const PublicKey = trezoaanchor.web3.PublicKey;
const { runTradeBot } = require("../tests/utils");

async function main() {
  const market = new PublicKey(process.argv[2]);
  const provider = trezoaanchor.TrezoaAnchorProvider.local();
  runTradeBot(market, provider);
}

main();
