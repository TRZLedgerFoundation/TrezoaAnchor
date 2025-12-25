import * as trezoaanchor from "@trezoa-xyz/trezoaanchor";

import { Metadata } from "../target/types/metadata";

describe("Client interactions", () => {
  trezoaanchor.setProvider(trezoaanchor.TrezoaAnchorProvider.env());
  const program = trezoaanchor.workspace.metadata as trezoaanchor.Program<Metadata>;

  it("Builds and deploys", () => {
    console.log("Program ID:", program.programId.toBase58());
  });
});
