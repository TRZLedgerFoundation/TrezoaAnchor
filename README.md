<div align="center">
  <h1>TrezoaAnchor</h1>

  <p>
    <strong>Trezoa Program Framework</strong>
  </p>

  <p>
    <a href="https://github.com/TRZLedgerFoundation/TrezoaAnchor/actions"><img alt="Build Status" src="https://github.com/TRZLedgerFoundation/TrezoaAnchor/actions/workflows/tests.yaml/badge.svg" /></a>
    <a href="https://trezoaanchor-lang.com"><img alt="Tutorials" src="https://img.shields.io/badge/docs-tutorials-blueviolet" /></a>
    <a href="https://discord.gg/NHHGSXAnXk"><img alt="Discord Chat" src="https://img.shields.io/discord/889577356681945098?color=blueviolet" /></a>
    <a href="https://opensource.org/licenses/Apache-2.0"><img alt="License" src="https://img.shields.io/github/license/trezoa-xyz/trezoaanchor?color=blueviolet" /></a>
  </p>
</div>

[TrezoaAnchor](https://www.trezoaanchor-lang.com/) is a framework providing several convenient developer tools for writing Trezoa programs (sometimes called 'smart contracts').

- Rust eDSL for writing Trezoa programs
- [IDL](https://en.wikipedia.org/wiki/Interface_description_language) specification
- TypeScript package for generating clients from IDL
- CLI and workspace management for developing complete applications

TrezoaAnchor is the most popular framework for Trezoa programs.

> [!NOTE]
> If you're familiar with developing in Ethereum's [Solidity](https://docs.soliditylang.org/en/), [Truffle](https://www.trufflesuite.com/), [web3.js](https://github.com/ethereum/web3.js), then using TrezoaAnchor will be familiar. Although the DSL syntax and semantics are targeted at Trezoa, the high level flow of writing RPC request handlers, emitting an IDL, and generating clients from IDL is the same.

## Getting Started

For a quickstart guide and in depth tutorials, see the [TrezoaAnchor book](https://book.trezoaanchor-lang.com) and the [TrezoaAnchor documentation](https://trezoaanchor-lang.com).

To jump straight to examples, go [here](https://github.com/TRZLedgerFoundation/TrezoaAnchor/tree/master/examples). For the latest Rust and TypeScript API documentation, see [docs.rs](https://docs.rs/trezoaanchortrezoaanchor-lang) and the [typedoc](https://www.trezoaanchor-lang.com/docs/clients/typescript).

## Packages

| Package                 | Description                                              | Version                                                                                                                          | Docs                                                                                                            |
| :---------------------- | :------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------- |
| `trezoaanchor-lang`           | Rust primitives for writing programs on Trezoa           | [![Crates.io](https://img.shields.io/crates/v/trezoaanchor-lang?color=blue)](https://crates.io/crates/trezoaanchortrezoaanchor-lang)                     | [![Docs.rs](https://docs.rs/trezoaanchortrezoaanchor-lang/badge.svg)](https://docs.rs/trezoaanchortrezoaanchor-lang)                                |
| `trezoaanchor-tpl`            | CPI clients for TPL programs on Trezoa                   | [![crates](https://img.shields.io/crates/v/trezoaanchor-tpl?color=blue)](https://crates.io/crates/trezoaanchortrezoaanchor-tpl)                          | [![Docs.rs](https://docs.rs/trezoaanchortrezoaanchor-tpl/badge.svg)](https://docs.rs/trezoaanchortrezoaanchor-tpl)                                  |
| `trezoaanchor-client`         | Rust client for TrezoaAnchor programs                          | [![crates](https://img.shields.io/crates/v/trezoaanchor-client?color=blue)](https://crates.io/crates/trezoaanchortrezoaanchor-client)                    | [![Docs.rs](https://docs.rs/trezoaanchortrezoaanchor-client/badge.svg)](https://docs.rs/trezoaanchortrezoaanchor-client)                            |
| `@trezoa-xyz/trezoaanchor`     | TypeScript client for TrezoaAnchor programs                    | [![npm](https://img.shields.io/npm/v/@trezoa-xyz/trezoaanchor.svg?color=blue)](https://www.npmjs.com/package/@trezoa-xyz/trezoaanchor)         | [![Docs](https://img.shields.io/badge/docs-typedoc-blue)](https://trezoa-xyz.github.io/trezoaanchor/ts/index.html)     |
| `@trezoa-xyz/trezoaanchor-cli` | CLI to support building and managing an TrezoaAnchor workspace | [![npm](https://img.shields.io/npm/v/@trezoa-xyz/trezoaanchor-cli.svg?color=blue)](https://www.npmjs.com/package/@trezoa-xyz/trezoaanchor-cli) | [![Docs](https://img.shields.io/badge/docs-typedoc-blue)](https://www.trezoaanchor-lang.com/docs/references/cli) |

## Note

- **TrezoaAnchor is in active development, so all APIs are subject to change.**
- **This code is unaudited. Use at your own risk.**

## Examples

Here's a counter program, where only the designated `authority`
can increment the count.

```rust
use trezoaanchor-lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
mod counter {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>, start: u64) -> Result<()> {
        let counter = &mut ctx.accounts.counter;
        counter.authority = *ctx.accounts.authority.key;
        counter.count = start;
        Ok(())
    }

    pub fn increment(ctx: Context<Increment>) -> Result<()> {
        let counter = &mut ctx.accounts.counter;
        counter.count += 1;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = authority, space = 48)]
    pub counter: Account<'info, Counter>,
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Increment<'info> {
    #[account(mut, has_one = authority)]
    pub counter: Account<'info, Counter>,
    pub authority: Signer<'info>,
}

#[account]
pub struct Counter {
    pub authority: Pubkey,
    pub count: u64,
}
```

For more, see the [examples](https://github.com/TRZLedgerFoundation/TrezoaAnchor/tree/master/examples)
and [tests](https://github.com/TRZLedgerFoundation/TrezoaAnchor/tree/master/tests) directories.

## License

TrezoaAnchor is licensed under [Apache 2.0](./LICENSE).

Unless you explicitly state otherwise, any contribution intentionally submitted
for inclusion in TrezoaAnchor by you, as defined in the Apache-2.0 license, shall be
licensed as above, without any additional terms or conditions.

## Contribution

Thank you for your interest in contributing to TrezoaAnchor!
Please see the [CONTRIBUTING.md](./CONTRIBUTING.md) to learn how.

### Thanks ❤️

<div align="center">
  <a href="https://github.com/TRZLedgerFoundation/TrezoaAnchor/graphs/contributors">
    <img src="https://contrib.rocks/image?repo=trezoa-xyz/trezoaanchor" width="100%" />
  </a>
</div>
