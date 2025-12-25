import * as trezoaanchor from "@trezoa-xyz/trezoaanchor";

import { Lamports } from "../../target/types/lamports";

describe("lamports", () => {
  // Configure the client to use the local cluster
  trezoaanchor.setProvider(trezoaanchor.TrezoaAnchorProvider.env());

  const program = trezoaanchor.workspace.Lamports as trezoaanchor.Program<Lamports>;

  it("Can transfer from/to PDA", async () => {
    await program.methods
      .transfer(new trezoaanchor.BN(trezoaanchor.web3.LAMPORTS_PER_TRZ))
      .rpc();
  });

  it("Returns an error on overflow", async () => {
    await program.methods.overflow().rpc();
  });
});
