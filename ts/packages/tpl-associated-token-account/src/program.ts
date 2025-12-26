import { PublicKey } from "@trezoa/web3.js";
import { Program, TrezoaAnchorProvider } from "@trezoa-xyz/trezoaanchor";

import { TplAssociatedTokenAccountCoder } from "./coder";

export const TPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID = new PublicKey(
  "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
);

interface GetProgramParams {
  programId?: PublicKey;
  provider?: TrezoaAnchorProvider;
}

export function tplAssociatedTokenAccountProgram(
  params?: GetProgramParams
): Program<TplAssociatedTokenAccount> {
  return new Program<TplAssociatedTokenAccount>(
    params?.programId ? { ...IDL, address: params.programId.toString() } : IDL,
    params?.provider,
    new TplAssociatedTokenAccountCoder(IDL)
  );
}

type TplAssociatedTokenAccount = {
  address: string;
  metadata: {
    name: "splAssociatedTokenAccount";
    version: "1.1.1";
    spec: "0.1.0";
  };
  instructions: [
    {
      name: "create";
      discriminator: [0];
      accounts: [
        {
          name: "fundingAddress";
          writable: true;
          signer: true;
        },
        {
          name: "associatedAccountAddress";
          writable: true;
        },
        {
          name: "walletAddress";
        },
        {
          name: "tokenMintAddress";
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
        {
          name: "tokenProgram";
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
        }
      ];
      args: [];
    },
    {
      name: "createIdempotent";
      discriminator: [1];
      accounts: [
        {
          name: "fundingAddress";
          writable: true;
          signer: true;
        },
        {
          name: "associatedAccountAddress";
          writable: true;
        },
        {
          name: "walletAddress";
        },
        {
          name: "tokenMintAddress";
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
        {
          name: "tokenProgram";
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
        }
      ];
      args: [];
    },
    {
      name: "recoverNested";
      discriminator: [2];
      accounts: [
        {
          name: "nestedAssociatedAccountAddress";
          writable: true;
        },
        {
          name: "nestedTokenMintAddress";
        },
        {
          name: "destinationAssociatedAccountAddress";
          writable: true;
        },
        {
          name: "ownerAssociatedAccountAddress";
        },
        {
          name: "ownerTokenMintAddress";
        },
        {
          name: "walletAddress";
          writable: true;
          signer: true;
        },
        {
          name: "tokenProgram";
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
        }
      ];
      args: [];
    }
  ];
  errors: [
    {
      code: 0;
      name: "invalidOwner";
      msg: "Associated token account owner does not match address derivation";
    }
  ];
};

const IDL: TplAssociatedTokenAccount = {
  address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
  metadata: {
    name: "splAssociatedTokenAccount",
    version: "1.1.1",
    spec: "0.1.0",
  },
  instructions: [
    {
      name: "create",
      discriminator: [0],
      accounts: [
        {
          name: "fundingAddress",
          writable: true,
          signer: true,
        },
        {
          name: "associatedAccountAddress",
          writable: true,
        },
        {
          name: "walletAddress",
        },
        {
          name: "tokenMintAddress",
        },
        {
          name: "systemProgram",
          address: "11111111111111111111111111111111",
        },
        {
          name: "tokenProgram",
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
        },
      ],
      args: [],
    },
    {
      name: "createIdempotent",
      discriminator: [1],
      accounts: [
        {
          name: "fundingAddress",
          writable: true,
          signer: true,
        },
        {
          name: "associatedAccountAddress",
          writable: true,
        },
        {
          name: "walletAddress",
        },
        {
          name: "tokenMintAddress",
        },
        {
          name: "systemProgram",
          address: "11111111111111111111111111111111",
        },
        {
          name: "tokenProgram",
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
        },
      ],
      args: [],
    },
    {
      name: "recoverNested",
      discriminator: [2],
      accounts: [
        {
          name: "nestedAssociatedAccountAddress",
          writable: true,
        },
        {
          name: "nestedTokenMintAddress",
        },
        {
          name: "destinationAssociatedAccountAddress",
          writable: true,
        },
        {
          name: "ownerAssociatedAccountAddress",
        },
        {
          name: "ownerTokenMintAddress",
        },
        {
          name: "walletAddress",
          writable: true,
          signer: true,
        },
        {
          name: "tokenProgram",
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
        },
      ],
      args: [],
    },
  ],
  errors: [
    {
      code: 0,
      name: "invalidOwner",
      msg: "Associated token account owner does not match address derivation",
    },
  ],
};
