#!/usr/bin/env bash
set -euo pipefail

if [[ $# -lt 1 ]]; then
  echo "Usage: $0 user@host [duckerchat_repo_path] [/var/www]"
  exit 1
fi

TARGET="$1"
DUCKERCHAT_ROOT="${2:-}"
REMOTE_BASE="${3:-/var/www}"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if [[ -n "$DUCKERCHAT_ROOT" ]]; then
  "$SCRIPT_DIR/sync-duckerchat-demo-data.sh" "$DUCKERCHAT_ROOT"
else
  "$SCRIPT_DIR/sync-duckerchat-demo-data.sh"
fi

"$SCRIPT_DIR/deploy-duckermind-sites.sh" "$TARGET" "$REMOTE_BASE"

echo
echo "Published DuckerChat web demo static assets, including large society graph JSON."
