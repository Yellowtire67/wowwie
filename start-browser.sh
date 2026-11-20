#!/bin/bash
set -e

mkdir -p /run /data
export DISPLAY=:99

# Create the VNC password file
x11vnc -storepasswd "$VNC_PASSWORD" /run/orbit-vnc.pass
chmod 600 /run/orbit-vnc.pass

# Wait for the virtual display to start
until [ -S /tmp/.X11-unix/X99 ]; do
  sleep 1
done

exec chromium \
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
