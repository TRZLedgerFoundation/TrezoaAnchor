// Tests are for whether we are able to call native Trezoa programs and fetch
// program state through TrezoaAnchor client and not for whether internal program logic
// works as intended. For the latter case, check out the program's repository.
//
// Tests are for the latest versions of the programs as of 2022-08-20, in order for
// tests to work, make sure the programs are up-to date in your local validator.

import * as TPL from "./spl";
import { mainTest, programTest } from "./utils";

// You can remove `await`s if you want to run tests in parallel(faster).
mainTest(async () => {
  await programTest(TPL.associatedTokenAccountTests);
  await programTest(TPL.binaryOptionTests);
  await programTest(TPL.binaryOraclePairTests);
  await programTest(TPL.featureProposalTests);
  await programTest(TPL.memoTests);
  await programTest(TPL.nameServiceTests);
  await programTest(TPL.recordTests);
  await programTest(TPL.splTokenTests);
  await programTest(TPL.stakePoolTests);
  await programTest(TPL.statelessAsksTests);
  await programTest(TPL.tokenSwapTests);
});
