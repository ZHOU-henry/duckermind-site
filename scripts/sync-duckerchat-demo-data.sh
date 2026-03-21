#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SITE_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
DUCKERCHAT_ROOT="${1:-$SITE_ROOT/../DuckerChat}"
HOST="${DUCKERCHAT_SYNC_HOST:-127.0.0.1}"
PORT="${DUCKERCHAT_SYNC_PORT:-4326}"
OUT_DIR="$SITE_ROOT/site/assets/data"
LOG_FILE="${DUCKERCHAT_SYNC_LOG:-/tmp/duckerchat-site-sync.log}"

if [[ ! -f "$DUCKERCHAT_ROOT/server.js" ]]; then
  echo "DuckerChat repo not found at: $DUCKERCHAT_ROOT"
  exit 1
fi

mkdir -p "$OUT_DIR"

SERVER_PID=""
cleanup() {
  if [[ -n "$SERVER_PID" ]] && kill -0 "$SERVER_PID" >/dev/null 2>&1; then
    kill "$SERVER_PID" >/dev/null 2>&1 || true
    wait "$SERVER_PID" 2>/dev/null || true
  fi
}
trap cleanup EXIT

DUCKERCHAT_HOST="$HOST" DUCKERCHAT_PORT="$PORT" node "$DUCKERCHAT_ROOT/server.js" >"$LOG_FILE" 2>&1 &
SERVER_PID=$!

for _ in {1..40}; do
  if curl -sf "http://$HOST:$PORT/api/health" >/dev/null; then
    break
  fi
  sleep 0.5
done

curl -sf "http://$HOST:$PORT/api/health" >/dev/null

for size in 100 1000; do
  for edgeMode in overview complex; do
    curl -sf "http://$HOST:$PORT/api/rooms/ultimate-prediction-room/ultimate-prediction/society-graph?size=$size&edgeMode=$edgeMode" \
      -o "$OUT_DIR/duckerchat-society-$size-$edgeMode.json"
    echo "Wrote $OUT_DIR/duckerchat-society-$size-$edgeMode.json"
  done
done

echo "DuckerChat static demo data synced."
