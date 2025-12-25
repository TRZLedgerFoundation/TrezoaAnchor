import * as trezoaanchor from "@trezoa-xyz/trezoaanchor";
import { TrezoaAnchorError, Program } from "@trezoa-xyz/trezoaanchor";
import splToken from "@trezoa/tpl-token";
import { DeclareId } from "../target/types/declare_id";
import { assert } from "chai";

describe("declare_id", () => {
  trezoaanchor.setProvider(trezoaanchor.TrezoaAnchorProvider.local());
  const program = trezoaanchor.workspace.DeclareId as Program<DeclareId>;

  it("throws error!", async () => {
    try {
      await program.methods.initialize().rpc();
      assert.ok(false);
    } catch (_err) {
      assert.isTrue(_err instanceof TrezoaAnchorError);
      const err: TrezoaAnchorError = _err;
      assert.strictEqual(err.error.errorCode.number, 4100);
    }
  });
});
