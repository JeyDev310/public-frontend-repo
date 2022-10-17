
FROM abiosoft/caddy:1.0.0-no-stats as caddy
ARG PROJECT_DIR
COPY ./dist/ /srv
COPY ./Caddyfile /etc/Caddyfile

EXPOSE 80