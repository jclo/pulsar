# Pulsar

[![NPM version][npm-image]][npm-url]
[![GitHub last commit][commit-image]][commit-url]
[![Travis CI][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Dependencies status][dependencies-image]][dependencies-url]
[![Dev Dependencies status][devdependencies-image]][devdependencies-url]
[![License][license-image]](LICENSE.md)

`Pulsar` is a boilerplate for writing a simple Web App or a PWA App relying on the bundler `Pakket`.


## Quick Startup

You can easily get your first `Pulsar` Wep App running in a couple of minutes by just typing a few command lines. But first, you need to create an empty folder. It will contain your Web App.

Then, you just need to create a `package.json` file that contains:

```json
{
  "name": "NameOfYourProject",
  "scripts": {
    "create": "npm install @mobilabs/pulsar && npm run populate",
    "populate": "pixarpulsar populate --name ${npm_package_name} --author \"${npm_package_writer_name}\" --acronym ${npm_package_writer_acronym} --email ${npm_package_writer_email} --url ${npm_package_writer_url} && npm install && npm run build && npm run test && npm run report && npm run dev"
  },
  "writer": {
    "name": "John Doe",
    "acronym": "jdo",
    "email": "jdo@johndoe.com",
    "url": "http://www.johndoe.com/"
  }
}
```

Replace `NameOfYourProject` by your project name and fill `writer` with your credentials.

And finally, type in the terminal:

```bash
npm run create.
```

That's almost all! When the script has been executed, your folder contains the following files:

```bash
Your project Folder
      |
      |_ public
      |   |_ ...              // The source files of your library,
      |   |_ ...
      |   |_ ...
      |
      |_ tasks
      |   |_ src              // The source files of your project,
      |   |_ .htaccess
      |   |_ 404.html
      |   |_ favicon.ico
      |   |_ index.html       // The entry of your Web App,
      |   |_ ...  
      |
      |_  test
      |     |_ main.js        // Your Mocha, Chai test file,
      |     |_ ...
      |
      |_ .eslintignore        // Files to be ignored by ESLint,
      |_ .eslintrc            // A Configuration file for the ESLint linter tool (if you use it),
      |_ .gitignore           // Files that Git must ignore (if you use git),
      |_ .npmignore           // Files that Npm must ignore (optional),
      |_ .travis.yml          // A configuration file for Travis CI (if you use it),
      |_ .CHANGELOG.md        // The changes between your different versions,
      |_ .gulpfile.js         // The main Gulp task,
      |_ index.js             // The link to your javascript code,
      |_ LICENSE.md           // The license that applies to your library (here MIT),
      |_ package-lock.json    // The NPM dependency tree,
      |_ package.json         // The NPM package file,
      |_ README.md            // Your README file,
```

And, your browser displays the Web App at the url `http://localhost:8888`.


### How to build it

In a terminal, type the command:

```bash
npm run build
```

It builds the Web App.

In another terminal type the command:

```bash
npm run dev
```

It starts an http server and makes the Web App visible in your browser.


### How to create a distribution version

When your development is over, type in a terminal:

```bash
npm run makedist
```

it creates the folder `_app` that contains the Web App ready to be deployed. And you can see the final result by typing:

```bash
npm run app
```

Enjoy!


## License

[MIT](LICENSE.md).

<!--- URls -->

[npm-image]: https://img.shields.io/npm/v/@mobilabs/pulsar.svg?style=flat-square
[release-image]: https://img.shields.io/github/release/jclo/pulsar.svg?include_prereleases&style=flat-square
[commit-image]: https://img.shields.io/github/last-commit/jclo/pulsar.svg?style=flat-square
[travis-image]: https://img.shields.io/travis/jclo/pulsar.svg?style=flat-square
[coveralls-image]: https://img.shields.io/coveralls/jclo/pulsar/master.svg?style=flat-square
[dependencies-image]: https://david-dm.org/jclo/pulsar/status.svg?theme=shields.io
[devdependencies-image]: https://david-dm.org/jclo/pulsar/dev-status.svg?theme=shields.io
[npm-bundle-size-image]: https://img.shields.io/bundlephobia/minzip/@mobilabs/pulsar.svg?style=flat-square
[license-image]: https://img.shields.io/npm/l/@mobilabs/pulsar.svg?style=flat-square

[npm-url]: https://www.npmjs.com/package/@mobilabs/pulsar
[release-url]: https://github.com/jclo/pulsar/tags
[commit-url]: https://github.com/jclo/pulsar/commits/master
[travis-url]: https://travis-ci.com/jclo/pulsar
[coveralls-url]: https://coveralls.io/github/jclo/pulsar?branch=master
[dependencies-url]: https://david-dm.org/jclo/pulsar
[devdependencies-url]: https://david-dm.org/jclo/pulsar?type=dev
[license-url]: http://opensource.org/licenses/MIT
[npm-bundle-size-url]: https://img.shields.io/bundlephobia/minzip/@mobilabs/pulsar
