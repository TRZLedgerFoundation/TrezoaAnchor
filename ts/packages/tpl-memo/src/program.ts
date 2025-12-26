import { PublicKey } from "@trezoa/web3.js";
import { Program, TrezoaAnchorProvider } from "@trezoa-xyz/trezoaanchor";

import { TplMemoCoder } from "./coder";

export const TPL_MEMO_PROGRAM_ID = new PublicKey(
  "Memo1UhkJRfHyvLMcVucJwxXeuD728EqVDDwQDxFMNo"
);

interface GetProgramParams {
  programId?: PublicKey;
  provider?: TrezoaAnchorProvider;
}

export function splMemoProgram(params?: GetProgramParams): Program<TplMemo> {
  return new Program<TplMemo>(
    IDL,
    params?.programId ?? TPL_MEMO_PROGRAM_ID,
    params?.provider,
    new TplMemoCoder(IDL)
  );
}

type TplMemo = {
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

const IDL: TplMemo = {
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
