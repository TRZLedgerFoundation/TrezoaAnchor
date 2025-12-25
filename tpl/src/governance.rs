/// A macro is exposed so that we can embed the program ID.
#[macro_export]
macro_rules! vote_weight_record {
    ($id:expr) => {
        /// TrezoaAnchor wrapper for the TPL governance program's VoterWeightRecord type.
        #[derive(Clone)]
        pub struct VoterWeightRecord(spl_governance_addin_api::voter_weight::VoterWeightRecord);

        impl trezoaanchor-lang::AccountDeserialize for VoterWeightRecord {
            fn try_deserialize(buf: &mut &[u8]) -> trezoaanchor-lang::Result<Self> {
                let mut data = buf;
                let vwr: spl_governance_addin_api::voter_weight::VoterWeightRecord =
                    trezoaanchor-lang::TrezoaAnchorDeserialize::deserialize(&mut data)
                        .map_err(|_| trezoaanchor-lang::error::ErrorCode::AccountDidNotDeserialize)?;
                if !trezoaanchor-lang::trezoa_program::program_pack::IsInitialized::is_initialized(&vwr) {
                    return Err(trezoaanchor-lang::error::ErrorCode::AccountDidNotSerialize.into());
                }
                Ok(VoterWeightRecord(vwr))
            }

            fn try_deserialize_unchecked(buf: &mut &[u8]) -> trezoaanchor-lang::Result<Self> {
                let mut data = buf;
                let vwr: spl_governance_addin_api::voter_weight::VoterWeightRecord =
                    trezoaanchor-lang::TrezoaAnchorDeserialize::deserialize(&mut data)
                        .map_err(|_| trezoaanchor-lang::error::ErrorCode::AccountDidNotDeserialize)?;
                Ok(VoterWeightRecord(vwr))
            }
        }

        impl trezoaanchor-lang::AccountSerialize for VoterWeightRecord {
            fn try_serialize<W: std::io::Write>(&self, writer: &mut W) -> trezoaanchor-lang::Result<()> {
                trezoaanchor-lang::TrezoaAnchorSerialize::serialize(&self.0, writer)
                    .map_err(|_| trezoaanchor-lang::error::ErrorCode::AccountDidNotSerialize)?;
                Ok(())
            }
        }

        impl trezoaanchor-lang::Owner for VoterWeightRecord {
            fn owner() -> Pubkey {
                $id
            }
        }

        impl std::ops::Deref for VoterWeightRecord {
            type Target = spl_governance_addin_api::voter_weight::VoterWeightRecord;

            fn deref(&self) -> &Self::Target {
                &self.0
            }
        }

        impl std::ops::DerefMut for VoterWeightRecord {
            fn deref_mut(&mut self) -> &mut Self::Target {
                &mut self.0
            }
        }

        #[cfg(feature = "idl-build")]
        impl trezoaanchor-lang::IdlBuild for VoterWeightRecord {}

        #[cfg(feature = "idl-build")]
        impl trezoaanchor-lang::Discriminator for VoterWeightRecord {
            const DISCRIMINATOR: &'static [u8] = &[];
        }
    };
}
