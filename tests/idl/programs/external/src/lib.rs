use trezoaanchor-lang::prelude::*;

declare_id!("Externa1111111111111111111111111111111111111");

#[program]
pub mod external {
    use super::*;

    pub fn initialize(_ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(TrezoaAnchorSerialize, TrezoaAnchorDeserialize, Clone)]
pub struct MyStruct {
    some_field: u8,
}

#[derive(TrezoaAnchorSerialize, TrezoaAnchorDeserialize, Clone)]
pub enum MyEnum {
    Unit,
    Named { name: String },
    Tuple(String),
}

pub struct NonBorshStruct {
    pub data: i32,
}

#[derive(Accounts)]
pub struct Initialize {}
