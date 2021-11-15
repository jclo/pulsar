/* eslint one-var: 0, semi-style: 0 */


// -- Vendor Modules


// -- Local Modules
const pack = require('../package.json');


// -- Local Constants
const libname    = 'Pulsar'
    , source     = './public/src/main.js'
    , exportname = 'Pulsar'
    ;


// -- Local Variables


// -- Main

module.exports = {
  ES6GLOB: '$__ES6GLOB',
  dist: './_app',
  root: './public',
  jsdir: './public/js',
  cssdir: './public/css',
  imgdir: './public/img',
  fontsdir: './public/fonts',
  icons: './public/src/icons/**/*',
  img: './public/src/**/img/**/*',
  vendor: './public/vendor/**/*',
  libname,
  index: './index.js',

  // This is the entry javascript file for your library.
  source,
  exportname,
  bundle: 'wapp',

  // These informations are used to fill the header of the index.html file:
  app: {
    title: 'Put the title of your app here',
    description: 'Put the description of your app here',
    canonical: 'https://www.mydomain.com',
  },
  company: {
    name: 'Put the name of your company here',
    slogan: 'Put the slogan of your company here',
    copyright: 'Copyright &copy; {{copyright:year}} {{company:name}}. All rights reserved.',
  },

  // These are the vendor libraries associated to the project.
  vlibs: {
    dest: './public/vendor',
    lib: [
      // Put here the vendor scripts you have to use for your project:
      // example: './node_modules/jquery/dist/jquery.js',
    ],
  },

  css: [
    // These are the css project files to bundle together. These two files
    // must always be the first:
    './node_modules/html5-boilerplate/dist/css/normalize.css',
    './node_modules/html5-boilerplate/dist/css/main.css',
    // Now put here your css files:
    // From vendor:
    // example: './node_modules/font-awesome/css/font-awesome.css',
    // From project:
    './public/src/app/components/app/app.css',
  ],

  fonts: [
    // Put here the fonts required for your project:
    // example: './node_modules/font-awesome/fonts/**/*',
  ],

  webfiles: [
    // These are the files to copy to the root path of the web app,
    './public/.htaccess',
    './public/404.html',
    './public/favicon.ico',
    './LICENSE.md',
    './public/robots.txt',
    './public/site.webmanifest',
    // PWA
    './public/manifest.json',
    './public/offline.html',
    './public/sw.js',
  ],

  get license() {
    return ['/*! ****************************************************************************',
      ` * ${libname} v${pack.version}`,
      ' *',
      ` * ${pack.description}.`,
      ' * (you can download it from npm or github repositories)',
      ` * Copyright (c) ${(new Date()).getFullYear()} ${pack.author.name} <${pack.author.email}> (${pack.author.url}).`,
      ' * Released under the MIT license. You may obtain a copy of the License',
      ' * at: http://www.opensource.org/licenses/mit-license.php).',
      ' * Built from ES6Pakket v1.0.7 and from {{boiler:name}} v{{boiler:name:version}}.',
      ' * ************************************************************************** */',
      ''].join('\n');
  },
};
