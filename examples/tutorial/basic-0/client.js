// client.js is used to introduce the reader to generating clients from IDLs.
// It is not expected users directly test with this example. For a more
// ergonomic example, see `tests/basic-0.js` in this workspace.

const trezoaanchor = require("@trezoa-xyz/trezoaanchor");

// Configure the local cluster.
trezoaanchor.setProvider(trezoaanchor.TrezoaAnchorProvider.local());

async function main() {
  // #region main
  // Read the generated IDL.
  const idl = require("./target/idl/basic_0.json");

  // Generate the program client from IDL.
  const program = new trezoaanchor.Program(idl);

  // Execute the RPC.
  await program.rpc.initialize();
  // #endregion main
}

console.log("Running client.");
main().then(() => console.log("Success"));
