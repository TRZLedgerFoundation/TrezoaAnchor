#!/bin/bash

active_version=$(trezoa -V | awk '{print $2}')
if [ "$active_version" != "3.0.0" ]; then
  agave-install init 3.0.0
fi

git submodule update --init --recursive --depth 1
cd ts/packages/borsh && yarn --frozen-lockfile && yarn build && yarn link --force && cd ../../../
cd ts/packages/trezoaanchor-errors && yarn --frozen-lockfile && yarn build && yarn link --force && cd ../../../
cd ts/packages/trezoaanchor && yarn --frozen-lockfile && yarn build:node && yarn link && cd ../../../
cd ts/packages/tpl-associated-token-account && yarn --frozen-lockfile && yarn build:node && yarn link && cd ../../../
cd ts/packages/tpl-token && yarn --frozen-lockfile && yarn build:node && yarn link && cd ../../../
cd examples/tutorial && yarn link @trezoa-xyz/trezoaanchor @trezoa-xyz/borsh && yarn --frozen-lockfile && cd ../../
cd tests && yarn link @trezoa-xyz/trezoaanchor @trezoa-xyz/borsh @trezoa-xyz/tpl-associated-token-account @trezoa-xyz/tpl-token && yarn --frozen-lockfile && cd ..
cargo install --path cli trezoaanchor-cli --locked --force --debug
