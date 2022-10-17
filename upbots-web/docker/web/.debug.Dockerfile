
ARG PROJECT_DIR=/app


FROM node:14.17-stretch as builder

ARG PROJECT_DIR
WORKDIR $PROJECT_DIR

ADD ./package.json $PROJECT_DIR/package.json
ADD ./package-lock.json $PROJECT_DIR/package-lock.json

RUN npm config set registry http://registry.npmjs.org

RUN npm install 

ADD ./contracts $PROJECT_DIR/contracts
ADD ./migrations $PROJECT_DIR/migrations
ADD ./public $PROJECT_DIR/public
ADD ./src $PROJECT_DIR/src
ADD ./test $PROJECT_DIR/test
ADD ./tsconfig.json $PROJECT_DIR/tsconfig.json
ADD ./.env.production $PROJECT_DIR/.env.production

RUN npm run build-prod 


FROM abiosoft/caddy:1.0.0-no-stats as caddy
ARG PROJECT_DIR
COPY --from=builder $PROJECT_DIR/dist/ /srv
COPY ./Caddyfile /etc/Caddyfile

EXPOSE 80
