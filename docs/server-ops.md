# Server Ops

## Prefer `admin + sudo`

After the initial machine bootstrap, avoid logging in as `root` for normal
operations.

### Verify `admin` can use sudo

```bash
id admin
sudo -l
```

If `admin` is missing from the sudo group:

```bash
sudo usermod -aG sudo admin
```

To start a new shell with the refreshed group membership:

```bash
su - admin
```

### Disable direct root SSH login later

Only do this after confirming `admin` login works.

```bash
sudo cp /etc/ssh/sshd_config /etc/ssh/sshd_config.bak
sudo sed -i 's/^#\\?PermitRootLogin.*/PermitRootLogin no/' /etc/ssh/sshd_config
sudo sed -i 's/^#\\?PasswordAuthentication.*/PasswordAuthentication yes/' /etc/ssh/sshd_config
sudo systemctl restart ssh
```

Keep one active `admin` session open while testing a second login window, so
you do not lock yourself out.

## DNS Records

Root records:

- `A  duckermind.com      -> 43.99.83.184`
- `CNAME www              -> duckermind.com`

Project subdomains to add in Cloudflare:

- `A  agora               -> 43.99.83.184`
- `A  noesis              -> 43.99.83.184`
- `A  peras               -> 43.99.83.184`
- `A  physis              -> 43.99.83.184`
- `A  titan               -> 43.99.83.184`

Keep them proxied by Cloudflare.

## First-Phase Routing

Use the root site as the public atlas. Redirect each subdomain into the
matching detail page until that project gets its own standalone deployment.

### Caddy pattern

```caddy
duckermind.com, www.duckermind.com {
    root * /var/www/duckermind.com
    file_server
    encode zstd gzip
}

agora.duckermind.com {
    redir https://duckermind.com/projects/agora/ 308
}
```

### Later cutover example

When `agora.duckermind.com` is ready to point at the live product:

```caddy
agora.duckermind.com {
    reverse_proxy 127.0.0.1:3200
}
```
