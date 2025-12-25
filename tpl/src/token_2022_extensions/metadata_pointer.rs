// Avoiding AccountInfo deprecated msg in trezoaanchor context
#![allow(deprecated)]
use trezoaanchor-lang::trezoa_program::account_info::AccountInfo;
use trezoaanchor-lang::trezoa_program::pubkey::Pubkey;
use trezoaanchor-lang::Result;
use trezoaanchor-lang::{context::CpiContext, Accounts};
use spl_token_2022_interface as spl_token_2022;

pub fn metadata_pointer_initialize<'info>(
    ctx: CpiContext<'_, '_, '_, 'info, MetadataPointerInitialize<'info>>,
    authority: Option<Pubkey>,
    metadata_address: Option<Pubkey>,
) -> Result<()> {
    let ix = spl_token_2022::extension::metadata_pointer::instruction::initialize(
        ctx.accounts.token_program_id.key,
        ctx.accounts.mint.key,
        authority,
        metadata_address,
    )?;
    trezoaanchor-lang::trezoa_program::program::invoke_signed(
        &ix,
        &[ctx.accounts.token_program_id, ctx.accounts.mint],
        ctx.signer_seeds,
    )
    .map_err(Into::into)
}

#[derive(Accounts)]
pub struct MetadataPointerInitialize<'info> {
    pub token_program_id: AccountInfo<'info>,
    pub mint: AccountInfo<'info>,
}
