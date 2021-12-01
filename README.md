<p align="center">
  <img src="https://github.com/starkware-libs/cairo-playground/blob/dev/src/assets/svg/starknet-logo.svg?raw=true"  alt=""/>
</p>

<p align="center">
  <img src="https://github.com/starkware-libs/cairo-playground/blob/dev/src/assets/svg/cairo-logo.svg?raw=true"  alt=""/>
</p>

<!-- tag line -->
<h2 align='center'>Cairo Playground</h2>
<h4 align='center'>
Cairo version: <a href="https://cairo-lang.org/playground"> https://cairo-lang.org/playground </a>
<br/>
StarkNet version: <a href="https://starknet.io/playground"> https://starknet.io/playground </a>
</h4>

<!-- primary badges -->
<p align="center">
    <a href="https://github.com/facebook/react">
        <img src="https://badges.aleen42.com/src/react.svg" alt="">
    </a>    
    <a href="https://github.com/prettier/prettier">
        <img src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg" alt="">
    </a>
    <a href="https://starkware.co/">
        <img src="https://img.shields.io/badge/powered_by-StarkWare-navy" alt="">
    </a>
</p>

Playground environment for those who want to learn and get to know [Cairo](https://www.cairo-lang.org/) language better.\
Build and debug simple Cairo programs or even build, compile and deploy Cairo smart contracts.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## App Modes

We are managing 2 different build flows to support `Cairo` and `StarkNet` modes. Components will dynamically build the
UI according to the mode value in the `AppProvider`.

`Cairo` - The default mode. Here you can write simple Cairo programs, run, debug and prove them using SHARP.

`StarkNet` - Dedicated mode for StarkNet, our L2 network over Ethereum. In this mode you can write Cairo smart contracts, compile and deploy them to the network.

## Prerequisites

1. Install `npm` and `Node.js`. See [Guide](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).
2. Make sure you've `yarn` installed globally on your machine `npm i -g yarn`.

## Installation

Clone and run `yarn` to install dependencies:

```
git clone https://github.com/starkware-libs/cairo-playground.git
cd cairo-playground
yarn install
```

## Development

`yarn run start` - starts the development server with the default `Cairo` mode.

`yarn run start:starknet` - starts the development server with `StarkNet` mode.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.\
The page will reload if you make edits.\
You will also see any lint errors in the console.

## Production

`yarn run build` - builds the default `Cairo` mode.

`yarn run build:starknet` - builds the `StarkNet` mode.

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## `.env` Files

`.env` files are increasingly popular as a way to configure an application. Their values are injected into the
application bundle during build time.\
The appropriate files are loading according to the `NODE_ENV` value.\
`.env` (global values for all environments)\
`.env.development` (values for development env, i.e `NODE_ENV=development`)\
`.env.test` (values for testing env, i.e, `NODE_ENV=test`)\
`.env.production` (values for production env, i.e, `NODE_ENV=production`)

> Note: each file can be overridden on a local environment using matching `.env.[ENV].local` file.

## Shuffle Environments Variables

### `yarn run start --use-real-sharp`

By default, SHARP endpoint isn't available on local environment. i.e, you can't prove programs when running on local
machine.\
For making this feature available so the app will use SHARP endpoint, you can use the above flag.

### `yarn run start --use-starknet-alpha`

By default, StarkNet endpoint isn't available on local environment. i.e, you can't deploy programs when running on your
local machine.\
For making this feature available so the app will use StarkNet endpoint, you can use the above flag.

### `yarn run start --use-starknet-alpha --starknet-mode`

Runs the app on local env in StarkNet mode with deploy feature available.

### `yarn run start --use-real-sharp --cairo-mode`

Runs the app on local env in Cairo mode with prove feature available.

## Contributing

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull
requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see
the [tags on this repository](https://github.com/starkware-libs/starknet-bridge).

## License

TBD
