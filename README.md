# Duckermind Site

Static company and program site system for `duckermind.com` and
`agora.duckermind.com`.

## What This Contains

- `site/`
  - root homepage for `duckermind.com`
  - portfolio architecture page
  - operating-model page
  - top-level project pages for `Polis`, `Kinema`, `Autogenesis`, and `DuckerChat`
  - preserved subproject pages for `Agora`, `Noesis`, `Peras`, `Titan`, and `Physis`
  - a new `Mimesis` biomimetic subproject page under `Autogenesis`
- `site-agora/`
  - standalone premium static surface for `agora.duckermind.com`
- `docs/design-reference-atlas.md`
  - design research notes distilled from 20+ official AI / tech / lab websites
- `docs/third-party-assets.md`
  - provenance notes for imported homepage imagery
- `infra/caddy/Caddyfile.example`
  - root-site serving
  - standalone Agora static-site serving
  - first-phase redirects for the other project hosts
  - commented examples for later swapping any host to a dedicated app

## First-Phase Domain Architecture

- `duckermind.com` -> main company and portfolio site
- `www.duckermind.com` -> main company and portfolio site
- `agora.duckermind.com` -> standalone Agora static product surface
- `noesis.duckermind.com` -> redirects to `https://duckermind.com/projects/noesis/`
- `peras.duckermind.com` -> redirects to `https://duckermind.com/projects/peras/`
- `physis.duckermind.com` -> redirects to `https://duckermind.com/projects/physis/`
- `titan.duckermind.com` -> redirects to `https://duckermind.com/projects/titan/`
- planned next host: `autogenesis.duckermind.com` -> `https://duckermind.com/projects/autogenesis/`

This gives the parent company and the lead product their own public surfaces
immediately while keeping the rest of the portfolio on a low-friction routing
ladder. Later, any subdomain can move from `redir` to `reverse_proxy` or its
own static root without changing the public brand map.

## Current Public Architecture

Duckermind now presents four top-level programs on the public site:

- `Polis`
  - `Agora`
  - `Noesis`
  - `Peras`
- `Kinema`
  - `Titan`
  - `Physis`
- `Autogenesis`
  - `AI4AI`
  - `Mimesis`
- `DuckerChat`

## Suggested Deployment On The Server

Copy `site/` and `site-agora/` to:

```bash
sudo mkdir -p /var/www/duckermind.com
sudo mkdir -p /var/www/agora.duckermind.com
sudo rsync -av --delete /path/to/duckermind-site/site/ /var/www/duckermind.com/
sudo rsync -av --delete /path/to/duckermind-site/site-agora/ /var/www/agora.duckermind.com/
```

Then adapt `infra/caddy/Caddyfile.example` into `/etc/caddy/Caddyfile` and
reload:

```bash
sudo caddy fmt --overwrite /etc/caddy/Caddyfile
sudo systemctl reload caddy
```

For remote sync from a local machine, use:

```bash
DUCKERMIND_SSH_KEY=/path/to/Duckermind-main.pem \
  ./scripts/deploy-duckermind-sites.sh admin@your-server
```
