import * as trezoaanchor from "@trezoa-xyz/trezoaanchor";
import { TrezoaAnchorError, Program } from "@trezoa-xyz/trezoaanchor";
import { CustomProgram } from "../target/types/custom_program";
import { assert } from "chai";

const CUSTOM_PROGRAM_ID = "PhoeNiXZ8ByJGLkxNfZRnkUfjvmuYqLR89jjFHGqdXY";

// This was an Executable Data account for our custom program which is not executable
const NON_EXECUTABLE_ACCOUNT_ID =
  "9cxLzxjrTeodcbaEU3KCNGE1a4yFZEcdJ7uEXN378S4U";

const CUSTOM_PROGRAM_ADDRESS = "dRiftyHA39MWEi3m9aunc5MzRF1JYuBsbn6VPcn33UH";

describe("custom_program", () => {
  trezoaanchor.setProvider(trezoaanchor.TrezoaAnchorProvider.local());
  const program = trezoaanchor.workspace.CustomProgram as Program<CustomProgram>;

  it("Should pass test program validation", async () => {
    try {
      await program.methods
        .testProgramValidation()
        .accounts({
          genericProgram: new trezoaanchor.web3.PublicKey(CUSTOM_PROGRAM_ID),
          systemProgram: trezoaanchor.web3.SystemProgram.programId,
          customProgramInput: program.programId,
          customProgramAddress: new trezoaanchor.web3.PublicKey(
            CUSTOM_PROGRAM_ADDRESS
          ),
        })
        .rpc();
      assert.ok(true);
    } catch (_err) {
      assert(false);
    }
  });

  it("Should fail test program validation", async () => {
    try {
      await program.methods
        .testProgramValidation()
        .accounts({
          genericProgram: new trezoaanchor.web3.PublicKey(CUSTOM_PROGRAM_ID),
          systemProgram: trezoaanchor.web3.SystemProgram.programId,
          customProgramInput: program.programId,
          customProgramAddress: new trezoaanchor.web3.PublicKey(
            NON_EXECUTABLE_ACCOUNT_ID
          ),
        })
        .rpc();
      assert.ok(false);
    } catch (_err) {
      assert.ok(true);
      assert.isTrue(_err instanceof TrezoaAnchorError);
      const err: TrezoaAnchorError = _err;
      assert.strictEqual(err.error.errorCode.number, 3009);
      assert.strictEqual(
        err.error.errorMessage,
        "Program account is not executable"
      );
    }
  });

  it("Should fail test program address mismatch", async () => {
    try {
      await program.methods
        .testProgramValidation()
        .accounts({
          genericProgram: new trezoaanchor.web3.PublicKey(CUSTOM_PROGRAM_ID),
          systemProgram: trezoaanchor.web3.SystemProgram.programId,
          customProgramInput: program.programId,
          customProgramAddress: new trezoaanchor.web3.PublicKey(CUSTOM_PROGRAM_ID),
        })
        .rpc();
      assert.ok(false);
    } catch (_err) {
      assert.ok(true);
      assert.isTrue(_err instanceof TrezoaAnchorError);
      const err: TrezoaAnchorError = _err;
      assert.strictEqual(err.error.errorCode.number, 2012);
      assert.strictEqual(
        err.error.errorMessage,
        "An address constraint was violated"
      );
    }
  });
});
