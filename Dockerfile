
FROM node:22-bookworm

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y --no-install-recommends \
    chromium \
    xvfb \
    x11vnc \
    novnc \
    websockify \
    nginx \
    supervisor \
    xdg-utils \
    ca-certificates \
    fonts-liberation \
    fonts-noto-color-emoji \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json ./
RUN npm install --omit=dev

COPY server.js ./
COPY public ./public
COPY nginx.conf /etc/nginx/sites-enabled/default
COPY supervisord.conf /etc/supervisor/conf.d/orbit.conf
COPY start-browser.sh /usr/local/bin/start-browser.sh

RUN chmod +x /usr/local/bin/start-browser.sh \
    && mkdir -p /run/nginx /var/log/supervisor

EXPOSE 8080

CMD ["/usr/bin/supervisord", "-n"]
