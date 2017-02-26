# simple-html5-boilerplate

This is a simple HTML5 boilerplate for new web developers. It contains the bare minimum to get a HTML5 website set up and a build system that compiles ES2015 to ES5, as well as optimises JS and CSS files for production.

BrowserSync is also used to automatically refresh the page when changes are made.

## Installation

Requires Node.js and Gulp

`git clone https://github.com/kheob/simple-html5-boilerplate.git MyNewSite`

`cd MyNewSite`

`npm install`

## Usage

Use `gulp` to start the file watcher. `gulp build` will build the project for production into the `dist` folder.

ES6 code in `src/js/app.js` will be transpiled into ES5 code.