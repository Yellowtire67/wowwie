#!/bin/bash
set -e
mkdir -p /run
x11vnc -storepasswd "$VNC_PASSWORD" /run/orbit-vnc.pass >/dev/null
chmod 600 /run/orbit-vnc.pass
Xvfb :99 -screen 0 1600x1000x24 -ac +extension RANDR &
sleep 2
chromium \
  --no-sandbox \
  --disable-dev-shm-usage \
  --disable-gpu \
  --no-first-run \
  --no-default-browser-check \
  --remote-debugging-address=127.0.0.1 \
  --remote-debugging-port=9222 \
  --user-data-dir=/data/orbit-profile \
  --start-maximized \
  about:blank
