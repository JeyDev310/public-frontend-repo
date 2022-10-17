# UpBots - V2 WebApp

| env | build | deploy | deploy link |
|-----|-------|--------|--------|
| dev |   [![Build Status](https://drone.infra.upbots.com/api/badges/upbots/front/status.svg?ref=refs/heads/develop)](https://drone.infra.upbots.com/upbots/front)    |    [![Build Status](https://drone.infra.upbots.com/api/badges/upbots/front/status.svg?ref=refs/heads/release/dev)](https://drone.infra.upbots.com/upbots/front)    | [deploy to dev](https://github.com/upbots/front/compare/release%2Fdev...upbots:develop?expand=1&title=deploy%20to%20dev&body=describe%20your%20changes) |
| staging |    [![Build Status](https://drone.infra.upbots.com/api/badges/upbots/front/status.svg?ref=refs/heads/staging)](https://drone.infra.upbots.com/upbots/front)   |    [![Build Status](https://drone.infra.upbots.com/api/badges/upbots/front/status.svg?ref=refs/heads/release/staging)](https://drone.infra.upbots.com/upbots/front) |[deploy to staging](https://github.com/upbots/front/compare/release%2Fstaging...upbots:staging?expand=1&title=deploy%20to%20staging&body=describe%20your%20changes) |
| prod |   [![Build Status](https://drone.infra.upbots.com/api/badges/upbots/front/status.svg?ref=refs/heads/master)](https://drone.infra.upbots.com/upbots/front)  |    [![Build Status](https://drone.infra.upbots.com/api/badges/upbots/front/status.svg?ref=refs/heads/release/prod)](https://drone.infra.upbots.com/upbots/front)  |[deploy to prod](https://github.com/upbots/front/compare/release%2Fprod...upbots:master?expand=1&title=deploy%20to%20prod&body=describe%20your%20changes) |

## Website live links:
- [Develop](https://next.develop.upbots.com/)
- [Staging](https://staging.next.upbots.com/)
- [Production](https://next.upbots.com/)

## Project installation requirements

### Node version
```
v14.17.3
```

### NPM version
```
v6
```

## Env
```
Once you pulled the project need to create .env file and fill in all needed variables (you can check .env.example file as example).
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
