# YAKGS - Yet Another Kittens Game Script
An automation script for [Kittens Game](http://bloodrizer.ru/games/kittens/).

## Features

* Automatically craft items.
* Set a minimum number of items required to craft something.
* Automatically shatter time crystals and trade the unobtainium or craft eludium.
* Automatically send hunters.
* Automatically praise the sun.
* Automatically observe astronomical events.
* Automatically feed necrocorns to the elders.
* Backup and synchronize your save game, even between multiple computers.

## Planned Features

* In-game unicorn and alicorn efficiency calculator.
* Notifications for when something happens (resource almost full; blackcoin price reaching 1100 etc.).

If you have suggestions for a feature, feel free to [open an issue](https://github.com/Mrtenz/yakgs/issues/new).

## Getting Started

If you simply want to use this userscript, you can download one of the releases from [here](https://github.com/Mrtenz/yakgs/releases).

If you want to compile it yourself, follow these instructions:

* Clone the repo with `git clone`.
* Install dependencies with `yarn`.
* Build with `yarn run build`.

This will create a `yakgs.user.js` file in `dist/`, that you can import in your browser.

### Development

* Download source files of Kittens Game from [here](https://bitbucket.org/bloodrizer/kitten-game/src) and put them in `dist/`.
* Install `yakgs.dev.user.js` to your browser.
* Start a development server with `yarn run dev`.
* Go to `http://localhost:8080` in your browser.

## Screenshots
There are some screenshots of some of the functionality of version 1.1.0 [here](https://imgur.com/a/8M672fr).
