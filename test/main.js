// ESLint declarations:
/* global describe */
/* eslint one-var: 0, semi-style: 0 */


// -- Vendor Modules
import { JSDOM } from 'jsdom';


// -- Local Modules
import testlib from './int/lib.js';
import pack from '../package.json' with { type: 'json' };


// -- Local Constants
const libname = 'Pulsar';


// -- Local Variables


// -- Main
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
// global.navigator = { userAgent: 'node.js' };

// Nota:
// If you want that 'display-coverage' shows the coverage files by files,
// you should set 'Pulsar' and 'testlib' like this:
//  . const Pulsar = require('../src/<file>').default;
//  . testlib(Pulsar, '{{lib:name}}', '{{lib:version}}', 'without new');
//
// But, if you want that 'display-coverage' shows the coverage in one file,
// you should set 'Pulsar' and 'testlib' like this:
//  . import Pulsar from '../index.js';
//  . testlib(Pulsar, libname, pack.version, 'without new');

const Pulsar = (await import('../public/src/main.js')).default;
// const Pulsar (await import('../index.js')).default;

describe('Test Pulsar:', () => {
  testlib(Pulsar, '{{lib:name}}', '{{lib:version}}', 'without new');
  // testlib(Pulsar, libname, pack.version, 'without new');
});


// - oOo --
