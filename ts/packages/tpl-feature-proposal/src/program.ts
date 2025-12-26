// @ts-nocheck
import { PublicKey } from "@trezoa/web3.js";
import { Program, TrezoaAnchorProvider } from "@trezoa-xyz/trezoaanchor";

import { TplFeatureProposalCoder } from "./coder";

export const TPL_FEATURE_PROPOSAL_PROGRAM_ID = new PublicKey(
  "Feat1YXHhH6t1juaWF74WLcfv4XoNocjXA6sPWHNgAse"
);

interface GetProgramParams {
  programId?: PublicKey;
  provider?: TrezoaAnchorProvider;
}

export function splFeatureProposalProgram(
  params?: GetProgramParams
): Program<TplFeatureProposal> {
  return new Program<TplFeatureProposal>(
    IDL,
    params?.programId ?? TPL_FEATURE_PROPOSAL_PROGRAM_ID,
    params?.provider,
    new TplFeatureProposalCoder(IDL)
  );
}

type TplFeatureProposal = {
  version: "1.0.0";
  name: "spl_feature_proposal";
  instructions: [
    {
      name: "propose";
      accounts: [
        {
          name: "fundingAddress";
          isMut: true;
          isSigner: true;
        },
        {
          name: "featureProposalAddress";
          isMut: true;
          isSigner: true;
        },
        {
          name: "mintAddress";
          isMut: true;
          isSigner: false;
        },
        {
          name: "distributorTokenAddress";
          isMut: true;
          isSigner: false;
        },
        {
          name: "acceptanceTokenAddress";
          isMut: true;
          isSigner: false;
        },
        {
          name: "feature";
          isMut: true;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "rent";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "tokensToMint";
          type: "u64";
        },
        {
          name: "acceptanceCriteria";
          type: {
            defined: "AcceptanceCriteria";
          };
        }
      ];
    },
    {
      name: "tally";
      accounts: [
        {
          name: "featureProposalAddress";
          isMut: true;
          isSigner: false;
        },
        {
          name: "acceptanceTokenAddress";
          isMut: false;
          isSigner: false;
        },
        {
          name: "feature";
          isMut: true;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "clock";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    }
  ];
  accounts: [
    {
      name: "featureProposal";
      type: {
        kind: "enum";
        variants: [
          {
            name: "Uninitialized";
          },
          {
            name: "Pending";
            fields: [
              {
                defined: "AcceptanceCriteria";
              }
            ];
          },
          {
            name: "Accepted";
            fields: [
              {
                name: "tokens_upon_acceptance";
                type: "u64";
              }
            ];
          },
          {
            name: "Expired";
          }
        ];
      };
    }
  ];
  types: [
    {
      name: "AcceptanceCriteria";
      type: {
        kind: "struct";
        fields: [
          {
            name: "tokensRequired";
            type: "u64";
          },
          {
            name: "deadline";
            type: "i64";
          }
        ];
      };
    }
  ];
};

const IDL: TplFeatureProposal = {
  version: "1.0.0",
  name: "spl_feature_proposal",
  instructions: [
    {
      name: "propose",
      accounts: [
        {
          name: "fundingAddress",
          isMut: true,
          isSigner: true,
        },
        {
          name: "featureProposalAddress",
          isMut: true,
          isSigner: true,
        },
        {
          name: "mintAddress",
          isMut: true,
          isSigner: false,
        },
        {
          name: "distributorTokenAddress",
          isMut: true,
          isSigner: false,
        },
        {
          name: "acceptanceTokenAddress",
          isMut: true,
          isSigner: false,
        },
        {
          name: "feature",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "tokensToMint",
          type: "u64",
        },
        {
          name: "acceptanceCriteria",
          type: {
            defined: "AcceptanceCriteria",
          },
        },
      ],
    },
    {
      name: "tally",
      accounts: [
        {
          name: "featureProposalAddress",
          isMut: true,
          isSigner: false,
        },
        {
          name: "acceptanceTokenAddress",
          isMut: false,
          isSigner: false,
        },
        {
          name: "feature",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "clock",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
  ],
  accounts: [
    {
      name: "featureProposal",
      type: {
        kind: "enum",
        variants: [
          {
            name: "Uninitialized",
          },
          {
            name: "Pending",
            fields: [
              {
                defined: "AcceptanceCriteria",
              },
            ],
          },
          {
            name: "Accepted",
            fields: [
              {
                name: "tokens_upon_acceptance",
                type: "u64",
              },
            ],
          },
          {
            name: "Expired",
          },
        ],
      },
    },
  ],
  types: [
    {
      name: "AcceptanceCriteria",
      type: {
        kind: "struct",
        fields: [
          {
            name: "tokensRequired",
            type: "u64",
          },
          {
            name: "deadline",
            type: "i64",
          },
        ],
      },
    },
  ],
};
