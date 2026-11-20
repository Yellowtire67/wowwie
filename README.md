# Orbit Web Browser — v3 foundation

This is a private web-in-web browser foundation. It runs a real Chromium desktop in a container and embeds its live interactive display in the Orbit page using noVNC. It is not a screenshot-polling mockup.

## Important requirements

- Docker Engine + Docker Compose
- A Linux host or VPS for a remotely hosted instance
- Do not expose this to the public internet without HTTPS and strong credentials
- This is a single-user foundation, not a multi-user hosted service

## Run locally

1. Copy `.env.example` to `.env`.
2. Replace both passwords with long, unique passwords.
3. Run `docker compose up --build`.
4. Open `http://localhost:8080`.
5. Sign in using `ORBIT_USER` and `ORBIT_PASSWORD`.
6. The VNC display may separately ask for `VNC_PASSWORD`.

## Browser location control

The Location panel changes the geolocation reported by Chromium pages through the browser's geolocation API. It does not change the public IP address, GPS, operating-system location, or IP-based location databases. Reload the site after applying a new location.

## VPN status

No VPN is bundled or active. A real VPN needs a legitimate provider, an endpoint, credentials/configuration, and routing all browser traffic through its tunnel. Do not trust a "connected" label unless the remote browser's public IP has been checked from inside the remote browser. Provider selection and secure tunnel integration are a separate deployment step.

## Current limitations

- One remote Chromium desktop; no multi-tab session manager outside Chromium's own UI.
- noVNC provides interactive remote desktop streaming, but latency depends on server distance, CPU, bandwidth and browser workload.
- Audio support depends on the host/VNC setup and is not enabled in this first foundation.
- No automatic downloads-to-local-device workflow yet.
- No multi-user account system, saved profiles UI, or session scheduler yet.
- A site may block automation, remote hosting, media playback, or login.
- Do not enter sensitive account credentials until you have secured the host with HTTPS and reviewed the deployment.

## Deployment

This Docker-based design is intended for a VPS or a host that supports Docker, Xvfb and the required networking. The earlier Railway-only screenshot prototype is not a suitable host for this full desktop architecture without additional infrastructure.
