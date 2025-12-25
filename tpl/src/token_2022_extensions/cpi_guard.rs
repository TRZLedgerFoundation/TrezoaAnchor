// Avoiding AccountInfo deprecated msg in trezoaanchor context
#![allow(deprecated)]
use trezoaanchor-lang::trezoa_program::account_info::AccountInfo;
use trezoaanchor-lang::trezoa_program::pubkey::Pubkey;
use trezoaanchor-lang::Result;
use trezoaanchor-lang::{context::CpiContext, Accounts};
use spl_token_2022_interface as spl_token_2022;

pub fn cpi_guard_enable<'info>(ctx: CpiContext<'_, '_, '_, 'info, CpiGuard<'info>>) -> Result<()> {
    let ix = spl_token_2022::extension::cpi_guard::instruction::enable_cpi_guard(
        ctx.accounts.token_program_id.key,
        ctx.accounts.account.key,
        ctx.accounts.account.owner,
        &[],
    )?;
    trezoaanchor-lang::trezoa_program::program::invoke_signed(
        &ix,
        &[
            ctx.accounts.token_program_id,
            ctx.accounts.account,
            ctx.accounts.owner,
        ],
        ctx.signer_seeds,
    )
    .map_err(Into::into)
}

pub fn cpi_guard_disable<'info>(ctx: CpiContext<'_, '_, '_, 'info, CpiGuard<'info>>) -> Result<()> {
    let ix = spl_token_2022::extension::cpi_guard::instruction::disable_cpi_guard(
        ctx.accounts.token_program_id.key,
        ctx.accounts.account.key,
        ctx.accounts.account.owner,
        &[],
    )?;

    trezoaanchor-lang::trezoa_program::program::invoke_signed(
        &ix,
        &[
            ctx.accounts.token_program_id,
            ctx.accounts.account,
            ctx.accounts.owner,
        ],
        ctx.signer_seeds,
    )
    .map_err(Into::into)
}

#[derive(Accounts)]
pub struct CpiGuard<'info> {
    pub token_program_id: AccountInfo<'info>,
    pub account: AccountInfo<'info>,
    pub owner: AccountInfo<'info>,
}
