#!/usr/bin/env bash
set -euo pipefail

if [[ $# -lt 1 ]]; then
  echo "Usage: $0 user@host [/var/www]"
  exit 1
fi

TARGET="$1"
REMOTE_BASE="${2:-/var/www}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
SSH_KEY="${DUCKERMIND_SSH_KEY:-}"
SSH_OPTIONS=(-o StrictHostKeyChecking=accept-new)

ROOT_SITE_DIR="$PROJECT_ROOT/site"
AGORA_SITE_DIR="$PROJECT_ROOT/site-agora"

if [[ -n "$SSH_KEY" ]]; then
  SSH_OPTIONS=(-i "$SSH_KEY" "${SSH_OPTIONS[@]}")
fi

RSYNC_RSH=("ssh" "${SSH_OPTIONS[@]}")

rsync -av --delete -e "${RSYNC_RSH[*]}" "$ROOT_SITE_DIR"/ "$TARGET:$REMOTE_BASE/duckermind.com"/
rsync -av --delete -e "${RSYNC_RSH[*]}" "$AGORA_SITE_DIR"/ "$TARGET:$REMOTE_BASE/agora.duckermind.com"/

echo "Synced:"
echo "  $ROOT_SITE_DIR -> $TARGET:$REMOTE_BASE/duckermind.com"
echo "  $AGORA_SITE_DIR -> $TARGET:$REMOTE_BASE/agora.duckermind.com"
echo
echo "Next step on server:"
echo "  sudo caddy fmt --overwrite /etc/caddy/Caddyfile && sudo systemctl reload caddy"
