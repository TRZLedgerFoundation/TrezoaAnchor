import * as trezoaanchor from "@trezoa-xyz/trezoaanchor";
import { assert } from "chai";

describe("Workspace", () => {
  trezoaanchor.setProvider(trezoaanchor.TrezoaAnchorProvider.env());

  it("Can lazy load workspace programs", () => {
    assert.doesNotThrow(() => {
      // Program exists, should not throw
      trezoaanchor.workspace.relationsDerivation;
    });

    assert.throws(() => {
      // IDL path in TrezoaAnchor.toml doesn't exist but other tests still run
      // successfully because workspace programs are getting loaded on-demand
      trezoaanchor.workspace.nonExistent;
    }, /non-existent\.json/);
  });

  it("Can get workspace programs by their name independent of casing", () => {
    const camel = trezoaanchor.workspace.relationsDerivation;
    const pascal = trezoaanchor.workspace.RelationsDerivation;
    const kebab = trezoaanchor.workspace["relations-derivation"];
    const snake = trezoaanchor.workspace["relations_derivation"];

    const compareProgramNames = (...programs: trezoaanchor.Program[]) => {
      return programs.every(
        (program) => program.rawIdl.metadata.name === "relations_derivation"
      );
    };

    assert(compareProgramNames(camel, pascal, kebab, snake));
  });

  it("Can use numbers in program names", () => {
    assert.doesNotThrow(() => {
      trezoaanchor.workspace.numbers123;
      trezoaanchor.workspace.Numbers123;
      trezoaanchor.workspace["numbers-123"];
      trezoaanchor.workspace["numbers_123"];
    });
  });
});
