#!/usr/bin/env bash
set -euo pipefail

BASE=${1:-http://localhost:3000}

echo "Checking /api/v3/events"
curl -sfS "$BASE/api/v3/events" > /dev/null

echo "Checking /api/v3/events?kind=alert"
curl -sfS "$BASE/api/v3/events?kind=alert" > /dev/null

echo "All smoke checks passed"
