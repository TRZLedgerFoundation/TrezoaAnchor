#!/bin/bash

# This test script verifies that running 'trezoaanchor' commands
# correctly proxies to the installed TrezoaAnchor CLI binary (e.g., shows TrezoaAnchor "something")
# instead of launching AVM itself.

# Exit on first error
set -e

# --- Helper for timing and logging ---
function step_start {
    echo ""
    echo "============================================================"
    echo "🚀 Starting Step: $1"
    echo "============================================================"
    STEP_START_TIME=$(date +%s)
}

function step_end {
    local end_time=$(date +%s)
    local duration=$((end_time - STEP_START_TIME))
    echo "✅ Step completed in ${duration}s."
}


trap 'echo ""; echo "🧹 Cleaning up..."' INT TERM EXIT

step_start "Building local avm"
(cd ../.. && cargo build --package avm)
step_end

step_start "Installing local trezoaanchor-cli via avm (force to ensure fresh install)"
../../target/debug/avm install --path ../.. --force
step_end

# --- Set a Specific Version ---
step_start "Setting AVM to use a known version (e.g., latest)"
../../target/debug/avm use latest
step_end

# --- Test 'avm' Command (Should Show AVM Help) ---
step_start "Testing 'avm --help' (should show AVM usage)"
AVM_OUTPUT=$(~/.avm/bin/avm --help 2>&1) || true
if echo "$AVM_OUTPUT" | grep -q "TrezoaAnchor version manager"; then
  echo "✅ 'avm --help' shows AVM usage as expected."
else
  echo "❌ Test failed: 'avm --help' did not show expected AVM output."
  echo "$AVM_OUTPUT"
  exit 1
fi
step_end

# --- Test 'trezoaanchor' Command (Should Proxy to TrezoaAnchor CLI) ---
step_start "Testing 'trezoaanchor --version' (should show TrezoaAnchor CLI version, not AVM)"
ANCHOR_OUTPUT=$(~/.avm/bin/trezoaanchor --version 2>&1) || true
if echo "$ANCHOR_OUTPUT" | grep -q "trezoaanchor-cli"; then
  echo "✅ 'trezoaanchor --version' proxies to TrezoaAnchor CLI successfully."
elif echo "$ANCHOR_OUTPUT" | grep -q "TrezoaAnchor version manager"; then
  echo "❌ Test failed: 'trezoaanchor --version' is still launching AVM instead of proxying."
  echo "$ANCHOR_OUTPUT"
  exit 1
else
  echo "❌ Test failed: Unexpected output from 'trezoaanchor --version'."
  echo "$ANCHOR_OUTPUT"
  exit 1
fi
step_end

echo ""
echo "============================================================"
echo "🎉 All tests passed successfully! 🎉"
echo "============================================================"