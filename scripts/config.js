/** ************************************************************************
 *
 * Configuration file.
 *
 *
 *
 * @namespace    -
 * @dependencies none
 * @exports      -
 * @author       -
 * @since        0.0.0
 * @version      -
 * ********************************************************************** */
/* eslint one-var: 0, semi-style: 0 */


// -- Vendor Modules


// -- Local Modules
const pack = require('../package.json');


// -- Local Constants
const libname    = 'Pulsar'
    , name       = 'wapp'
    , source     = './public/src/main.js'
    , exportname = 'Pulsar'
    ;


// -- Local Variables


// -- Main

module.exports = {
  ES6GLOB: '$__ES6GLOB',
  root: './public',
  dist: './_app',
  libdir: './public/js',
  cssdir: './public/css',
  imgdir: './public/img',
  fontsdir: './public/fonts',
  icons: './public/src/icons',
  img: './public/src',
  vendor: './public/vendor',
  libname,
  name,
  index: './index.js',
  distlink: `./_dist/lib/${name}.js`,

  // This is the entry javascript file of your library. Choose one
  // pattern among the proposed ones in src. The files 'basic.js',
  // 'functional.js', 'functional-shared.js', 'prototypal.js',
  // 'pseudoclassical.js' and pseudoclassical-auto.js' are mutually exclusives.
  source,
  export: exportname,

  // These informations are used to fill the header of the index.html file:
  app: {
    title: 'Put the title of your app here',
    description: 'Put the description of your app here',
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
    // These are the css project files to bundle together.
    // Put here your css files:
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
    './LICENSE.md',
    './public/robots.txt',
    './public/site.webmanifest',
    // PWA
    './public/manifest.json',
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
      ' * Built from ES6Pakket v2.1.2 and from {{boiler:name}} v{{boiler:name:version}}.',
      ' * ************************************************************************** */',
      ''].join('\n');
  },
};
