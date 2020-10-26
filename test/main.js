// ESLint declarations:
/* global describe */
/* eslint one-var: 0, semi-style: 0 */


// -- Vendor Modules
const { JSDOM } = require('jsdom')
    , fetch     = require('node-fetch')
    ;


// -- Local Modules
const pack    = require('../package.json')
    , testlib = require('./int/lib')
    ;


// -- Local Constants
// const libname = 'Pulsar';


// -- Local Variables


// -- Main

// Create a Virtual DOM:
const HTML = `
  <!DOCTYPE html>
  <html>
    <head></head>
    <body>
      <div id="app"></div>
    </body>
  </html>
`;
const dom = new JSDOM(HTML);
global.window = dom.window;
global.document = dom.window.document;
global.navigator = { userAgent: 'node.js' };
global.fetch = fetch;

// Pixi must be defined after the virtual DOM is declared otherwise it fails
// because it can't recognize the DOM global variables.
const Pulsar = require('../public/src/main').default;

// Nota:
// If you choose 'Pulsar = require('../index')', 'display-coverage' will
// show the coverage of all the library in one file.
//
// If you want to display the coverage file by file, you must choose
// 'Pulsar = require('../src/prototypal').default'. But, in this case,
// the build isn't done, so you should pass '{{lib:name}}' as libname and
// '{{lib:version}}' as the library version.

describe('Test Pulsar:', () => {
  testlib(Pulsar, '{{lib:name}}', '{{lib:version}}', 'without new');
  // testlib(Pulsar, libname, pack.version, 'without new');
});
