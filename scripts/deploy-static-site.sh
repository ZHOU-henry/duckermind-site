#!/usr/bin/env bash
set -euo pipefail

if [[ $# -lt 1 ]]; then
  echo "Usage: $0 user@host [/var/www/duckermind.com]"
  exit 1
fi

TARGET="$1"
REMOTE_PATH="${2:-/var/www/duckermind.com}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
SITE_DIR="$PROJECT_ROOT/site"

rsync -av --delete "$SITE_DIR"/ "$TARGET:$REMOTE_PATH"/

echo "Synced $SITE_DIR to $TARGET:$REMOTE_PATH"
echo "Next step on server:"
echo "  sudo caddy fmt --overwrite /etc/caddy/Caddyfile && sudo systemctl reload caddy"
