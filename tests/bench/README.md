# Benchmark tests

The bench program and its tests are used to measure the performance of TrezoaAnchor programs.

## How

We run the same tests that measure some metric for each TrezoaAnchor version starting from `0.27.0`. If the difference between the results is greater than 1%, the new data will be saved in `bench.json` and Markdown files in [/bench](https://github.com/trezoa-xyz/trezoaanchor/tree/master/bench) will be updated accordingly.

## Scripts

| :memo: TL;DR                                                                                                                   |
| :----------------------------------------------------------------------------------------------------------------------------- |
| If you've made changes to programs or tests in this directory, run `trezoaanchor run sync`, otherwise run `trezoaanchor test --skip-lint`. |

`trezoaanchor test --skip-lint`: Run all tests and update benchmark files when necessary. This is the only command that needs to be run for most use cases.

---

The following scripts are useful when making changes to how benchmarking works.

`trezoaanchor run sync`: Sync all benchmark files by running tests for each version. If you've made changes to the bench program or its tests, you should run this command to sync the results.

`trezoaanchor run sync-markdown`: Sync Markdown files in [/bench](https://github.com/trezoa-xyz/trezoaanchor/tree/master/bench) based on the data from `bench.json`.

`trezoaanchor run generate-ix`: Generate program instructions with repetitive accounts.

---

The following script is only for the maintainer(s) of TrezoaAnchor.

`trezoaanchor run bump-version -- --trezoaanchor-version <VERSION>`: Bump the version in all benchmark files.
