#!/bin/bash

# This test script verifies that `avm` correctly installs `trezoaanchor-verify`
# and that `trezoaanchor verify` can successfully verify a known public program.

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

# --- Cleanup ---
trap 'echo ""; echo "🧹 Cleaning up..."' INT TERM EXIT

# --- Dependency Checks ---
step_start "Checking dependencies"
# Check for docker
if ! command -v docker &> /dev/null; then
  echo "❌ Docker is not installed. Please install it to run this test."
  exit 1
fi
if ! docker info > /dev/null 2>&1; then
  echo "❌ Docker is not running. Please start Docker and run the test again."
  exit 1
fi
step_end

# --- Build and Install TrezoaAnchor from Local Source ---
step_start "Building local avm"
(cd ../.. && cargo build --package avm)
step_end

step_start "Installing local trezoaanchor-cli and trezoaanchor-verify via avm"
../../target/debug/avm install --path ../.. --force
step_end

# --- Verify `trezoaanchor-verify` Installation ---
step_start "Checking for trezoaanchor-verify installation"
if ! [ -x ~/.avm/bin/trezoaanchor-verify ]; then
    echo "❌ trezoaanchor-verify was not found in ~/.avm/bin."
    exit 1
fi
echo "-> trezoaanchor-verify found successfully."
step_end

# --- Verify a Known Public Program ---
step_start "Verifying a known public program (Phoenix on Mainnet)"
OUTPUT=$(../../target/debug/trezoaanchor verify PhoeNiXZ8ByJGLkxNfZRnkUfjvmuYqLR89jjFHGqdXY \
    --repo-url https://github.com/Ellipsis-Labs/phoenix-v1 \
    -- \
    --skip-prompt \
    --url https://api.mainnet-beta.trezoa.com 2>&1) || true
step_end


# --- Check Results ---
step_start "Checking verification results"
if echo "$OUTPUT" | grep -q "Program hash matches ✅"; then
  # This is the expected outcome in a test environment without a funded mainnet wallet.
  # ⚠️ CAUTION: if you have a mainnet wallet with funds, and configured the CLI to use it, this will fail. And you will lose money.
  if echo "$OUTPUT" | grep -q "Failed to send verification transaction to the blockchain"; then
    echo "✅ Test successful: Verification passed and transaction failed as expected."
  else
    echo "❌ Test failed: Verification passed, but an unexpected error occurred."
    echo "$OUTPUT"
    exit 1
  fi
else
  echo "❌ Test failed: Verification did not pass."
  echo "$OUTPUT"
  exit 1
fi
step_end

echo ""
echo "============================================================"
echo "🎉 All tests passed successfully! 🎉"
echo "============================================================"
