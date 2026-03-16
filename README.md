# Duckermind Site

Static portfolio and program site for `duckermind.com`.

## What This Contains

- `site/`
  - root homepage for `duckermind.com`
  - portfolio overview pages
  - detail pages for:
    - Agora
    - Noesis
    - Peras
    - Physis
    - Titan
- `infra/caddy/Caddyfile.example`
  - root-site serving
  - first-phase subdomain redirects
  - commented examples for later swapping subdomains to dedicated apps

## First-Phase Domain Architecture

- `duckermind.com` -> main portfolio site
- `www.duckermind.com` -> main portfolio site
- `agora.duckermind.com` -> redirects to `https://duckermind.com/projects/agora/`
- `noesis.duckermind.com` -> redirects to `https://duckermind.com/projects/noesis/`
- `peras.duckermind.com` -> redirects to `https://duckermind.com/projects/peras/`
- `physis.duckermind.com` -> redirects to `https://duckermind.com/projects/physis/`
- `titan.duckermind.com` -> redirects to `https://duckermind.com/projects/titan/`

This gives each MVP a stable project domain immediately while keeping deployment
simple on one server. Later, each subdomain can be changed from `redir` to
`reverse_proxy` or a new static root without changing the public brand map.

## Suggested Deployment On The Server

Copy `site/` to:

```bash
sudo mkdir -p /var/www/duckermind.com
sudo rsync -av --delete /path/to/duckermind-site/site/ /var/www/duckermind.com/
```

Then adapt `infra/caddy/Caddyfile.example` into `/etc/caddy/Caddyfile` and
reload:

```bash
sudo caddy fmt --overwrite /etc/caddy/Caddyfile
sudo systemctl reload caddy
```
