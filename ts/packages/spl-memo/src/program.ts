import { PublicKey } from "@trezoa/web3.js";
import { Program, TrezoaAnchorProvider } from "@trezoa-xyz/trezoaanchor";

import { SplMemoCoder } from "./coder";

export const TPL_MEMO_PROGRAM_ID = new PublicKey(
  "Memo1UhkJRfHyvLMcVucJwxXeuD728EqVDDwQDxFMNo"
);

interface GetProgramParams {
  programId?: PublicKey;
  provider?: TrezoaAnchorProvider;
}

export function splMemoProgram(params?: GetProgramParams): Program<SplMemo> {
  return new Program<SplMemo>(
    IDL,
    params?.programId ?? TPL_MEMO_PROGRAM_ID,
    params?.provider,
    new SplMemoCoder(IDL)
  );
}

type SplMemo = {
  version: "3.0.1";
  name: "spl_memo";
  instructions: [
    {
      name: "addMemo";
      accounts: [];
      args: [
        {
          name: "memo";
          type: "string";
        }
      ];
    }
  ];
};

const IDL: SplMemo = {
  version: "3.0.1",
  name: "spl_memo",
  instructions: [
    {
      name: "addMemo",
      accounts: [],
      args: [
        {
          name: "memo",
          type: "string",
        },
      ],
    },
  ],
};
