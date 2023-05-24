// ESLint declarations:
/* global describe */
/* eslint one-var: 0, semi-style: 0 */


// -- Vendor Modules
const { JSDOM } = require('jsdom')
    , fetch     = require('node-fetch')
    ;


// -- Local Modules
const testlib = require('./int/lib')
    , pack    = require('../package.json')
    ;


// -- Local Constants
const libname = 'Pulsar';


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

// Nota:
// If you want that 'display-coverage' shows the coverage files by files,
// you should set 'Pulsar' and 'testlib' like this:
//  . const Pulsar = require('../src/<file>').default;
//  . testlib(Pulsar, '{{lib:name}}', '{{lib:version}}', 'without new');
//
// But, if you want that 'display-coverage' shows the coverage in one file,
// you should set 'Pulsar' and 'testlib' like this:
//  . const Pulsar = require('../index');
//  . testlib(Pulsar, libname, pack.version, 'without new');

const Pulsar = require('../public/src/main').default;
// const Pulsar = require('../index');

describe('Test Pulsar:', () => {
  testlib(Pulsar, '{{lib:name}}', '{{lib:version}}', 'without new');
  // testlib(Pulsar, libname, pack.version, 'without new');
});

// - oOo --
