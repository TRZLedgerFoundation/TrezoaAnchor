use trezoaanchor-lang::prelude::*;

declare_id!("Generics111111111111111111111111111111111111");

#[program]
pub mod generics {
    use super::*;

    pub fn generic(
        ctx: Context<GenericCtx>,
        generic_field: GenericType<u32, u64, 10>,
    ) -> Result<()> {
        ctx.accounts.generic_acc.data = generic_field;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct GenericCtx<'info> {
    generic_acc: Account<'info, GenericAccount>,

    #[account(mut)]
    payer: Signer<'info>,
    system_program: Program<'info, System>,
}

#[account]
pub struct GenericAccount {
    pub data: GenericType<u32, u64, 10>,
}

#[derive(TrezoaAnchorSerialize, TrezoaAnchorDeserialize, Clone)]
pub struct GenericType<T, U, const N: usize>
where
    T: TrezoaAnchorSerialize + TrezoaAnchorDeserialize,
    U: TrezoaAnchorSerialize + TrezoaAnchorDeserialize,
{
    pub gen1: T,
    pub gen2: U,
    pub gen3: GenericNested<u32, U>,
    pub gen4: GenericNested<T, external::MyStruct>,
    pub gen5: GenericNested<T, U>,
    pub gen6: GenericNested<u32, u64>,
    pub gen7: GenericNested<T, GenericNested<T, U>>,
    pub arr: [u8; N],
    pub warr: WrappedU8Array<N>,
    pub warrval: WrappedU8Array<10>,
    pub enm1: GenericEnum<T, U, N>,
    pub enm2: GenericEnum<GenericNested<T, u64>, u32, 30>,
}

#[derive(TrezoaAnchorSerialize, TrezoaAnchorDeserialize, Clone, Copy, Default)]
pub struct GenericNested<V, Z>
where
    V: TrezoaAnchorSerialize + TrezoaAnchorDeserialize,
    Z: TrezoaAnchorSerialize + TrezoaAnchorDeserialize,
{
    pub gen1: V,
    pub gen2: Z,
}

#[derive(TrezoaAnchorSerialize, TrezoaAnchorDeserialize, Clone)]
pub struct WrappedU8Array<const N: usize>(u8);

#[derive(TrezoaAnchorSerialize, TrezoaAnchorDeserialize, Clone)]
pub enum GenericEnum<T, U, const N: usize>
where
    T: TrezoaAnchorSerialize + TrezoaAnchorDeserialize,
    U: TrezoaAnchorSerialize + TrezoaAnchorDeserialize,
{
    Unnamed(T, U),
    Named { gen1: T, gen2: U },
    Struct(GenericNested<T, U>),
    Arr([T; N]),
}
