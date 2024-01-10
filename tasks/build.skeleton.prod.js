#!/usr/bin/env node
/* *****************************************************************************
 *
 * Creates the production folder.
 *
 * build:skeleton:prod.js script creates the productiion folder and copies the
 * files defined in config.js.
 *
 * Private Functions:
 *  . _help                       displays the help message,
 *  . _clean                      removes the previous production folder,
 *  . _doskeleton                 creates the production folder and copies files,
 *  . _dowsw                      updates sw.js for production,
 *  . _doindexhtml                updates index.html for production,
 *  . _doofflinehtml              updates offline.html for production,
 *
 *
 * Public Static Methods:
 *  . run                         executes the script,
 *
 *
 * @namespace    -
 * @dependencies none
 * @exports      -
 * @author       -
 * @since        0.0.0
 * @version      -
 * ************************************************************************** */
/* eslint one-var: 0, semi-style: 0, no-underscore-dangle: 0,
  import/no-extraneous-dependencies: 0 */


// -- Vendor Modules
const fs         = require('fs')
    , path       = require('path')
    , nopt       = require('nopt')
    , { minify } = require('terser')
    ;


// -- Local Modules
const config = require('./config')
    , pack   = require('../package.json')
    ;


// -- Local Constants
const VERSION = '0.0.0-alpha.0'
    , opts = {
      help: [Boolean, false],
      version: [String, null],
    }
    , shortOpts = {
      h: ['--help'],
      v: ['--version', VERSION],
    }
    , parsed = nopt(opts, shortOpts, process.argv, 2)
    , { dist }     = config
    , { webfiles } = config
    , { root }     = config
    , { libname }  = config
    , { bundle }   = config
    ;


// -- Local Variables


// -- Private Functions --------------------------------------------------------

/**
 * Dispays the help message.
 *
 * @function ()
 * @private
 * @param {}                -,
 * @returns {}              -,
 * @since 0.0.0
 */
function _help() {
  const message = ['',
    'Usage: command [options]',
    '',
    '                       creates the production folder and copies the files defined in config.js',
    '',
    'Options:',
    '',
    '-h, --help             output usage information',
    '-v, --version          output the version number',
    '',
  ].join('\n');

  process.stdout.write(`${message}\n`);
}

/**
 * Removes the previous production folder,
 *
 * @function ()
 * @private
 * @param {}                -,
 * @returns {Object}        returns a promise,
 * @since 0.0.0
 */
function _clean() {
  const d1 = new Date();
  process.stdout.write('Starting \'\x1b[36mclean\x1b[89m\x1b[0m\'...\n');

  return new Promise((resolve) => {
    fs.rm(dist, { force: true, recursive: true }, (err1) => {
      if (err1) throw new Error(err1);

      fs.mkdir(dist, { recursive: true }, (err2) => {
        if (err2) throw new Error(err2);

        const d2 = new Date() - d1;
        process.stdout.write(`Finished '\x1b[36mclean\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
        resolve();
      });
    });
  });
}

/**
 * Creates the production folder and copies files.
 *
 * @function (arg1)
 * @private
 * @param {Function}        the function to call at the completion,
 * @returns {}              -,
 * @since 0.0.0
 */
function _doskeleton(done) {
  const d1 = new Date();
  process.stdout.write('Starting \'\x1b[36mdoskeleton\x1b[89m\x1b[0m\'...\n');

  /**
   * Wait all processes completed;
   */
  let pending = webfiles.length;
  function _next() {
    pending -= 1;
    if (!pending) {
      const d2 = new Date() - d1;
      process.stdout.write(`Finished '\x1b[36mdoskeleton\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
      done();
    }
  }

  let filename;
  for (let i = 0; i < webfiles.length; i++) {
    filename = path.basename(webfiles[i]);
    fs.cp(webfiles[i], `${dist}/${filename}`, (err) => {
      if (err) throw new Error(err);
      _next();
    });
  }
}

/**
 * Updates sw.js for production.
 *
 * @function ()
 * @private
 * @param {}                -,
 * @returns {}              -,
 * @since 0.0.0
 */
function _dosw(done) {
  const d1 = new Date();
  process.stdout.write('Starting \'\x1b[36mdosw\x1b[89m\x1b[0m\'...\n');

  fs.readFile(`${root}/sw.js`, 'utf-8', (err1, res) => {
    if (err1) throw new Error(err1);

    const sw = res
      .replace(`js/${bundle}.js`, `js/${bundle}.min.js`)
      .replace(`js/${bundle}.mjs`, `js/${bundle}.min.mjs`)
    ;

    minify(sw, {})
      .then((result) => {
        fs.writeFile(`${dist}/sw.js`, `${result.code}`, { encooding: 'utf8' }, (err2) => {
          if (err2) throw new Error(err2);

          const d2 = new Date() - d1;
          process.stdout.write(`Finished '\x1b[36mdosw\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
          done();
        });
      });
  });
}

/**
 * Updates index.html for production.
 *
 * @function ()
 * @private
 * @param {}                -,
 * @returns {}              -,
 * @since 0.0.0
 */
function _doindexhtml(done) {
  const d1 = new Date();
  process.stdout.write('Starting \'\x1b[36mdoindexhtml\x1b[89m\x1b[0m\'...\n');

  fs.readFile(`${root}/index.html`, 'utf-8', (err, res) => {
    if (err) throw new Error(err);

    const index = res
      .replace('{{app:name}}', `${libname}`)
      .replace('{{app:version}}', pack.version)
      // .replace('{{app:canonical-link}}', config.app.canonical)
      .replace('{{app:title}}', config.app.title)
      .replace('{{app:description}}', config.app.description)
      .replace('{{company:name}}', config.company.name)
      .replace('{{company:slogan}}', config.company.slogan)
      .replace('{{company:copyright}}', config.company.copyright)
      .replace(`js/${bundle}.js`, `js/${bundle}.min.js`)
      .replace(`js/${bundle}.mjs`, `js/${bundle}.min.mjs`)
    ;

    fs.writeFile(`${dist}/index.html`, index, (er) => {
      if (err) throw new Error(er);

      const d2 = new Date() - d1;
      process.stdout.write(`Finished '\x1b[36mdoindexhtml\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
      done();
    });
  });
}

/**
 * Updates offline.html for production.
 *
 * @function ()
 * @private
 * @param {}                -,
 * @returns {}              -,
 * @since 0.0.0
 */
function _doofflinehtml(done) {
  const d1 = new Date();
  process.stdout.write('Starting \'\x1b[36mdoofflinehtml\x1b[89m\x1b[0m\'...\n');

  fs.readFile(`${root}/offline.html`, 'utf-8', (err, res) => {
    if (err) throw new Error(err);

    const index = res
      .replace('{{app:name}}', `${libname}`)
      .replace('{{app:version}}', pack.version)
      // .replace('{{app:canonical-link}}', config.app.canonical)
      .replace('{{app:title}}', config.app.title)
      .replace('{{app:description}}', config.app.description)
      .replace('{{company:name}}', config.company.name)
      .replace('{{company:slogan}}', config.company.slogan)
      .replace('{{company:copyright}}', config.company.copyright)
      .replace(`js/${bundle}.js`, `js/${bundle}.min.js`)
      .replace(`js/${bundle}.mjs`, `js/${bundle}.min.mjs`)
    ;

    fs.writeFile(`${dist}/offline.html`, index, (er) => {
      if (err) throw new Error(er);

      const d2 = new Date() - d1;
      process.stdout.write(`Finished '\x1b[36mdoofflinehtml\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
      done();
    });
  });
}


// -- Main ---------------------------------------------------------------------

/**
 * Executes the script.
 *
 * @function ()
 * @public
 * @param {}                -,
 * @returns {}              -,
 * @since 0.0.0
 */
async function run() {
  const PENDING = 4;

  if (parsed.help) {
    _help();
    return;
  }

  if (parsed.version) {
    process.stdout.write(`version: ${parsed.version}\n`);
    return;
  }

  const d1 = new Date();
  process.stdout.write('Starting \'\x1b[36mbuild:skeleton:prod\x1b[89m\x1b[0m\'...\n');

  let pending = PENDING;
  /**
   * Executes done until completion.
   */
  function done() {
    pending -= 1;
    if (!pending) {
      const d2 = new Date() - d1;
      process.stdout.write(`Finished '\x1b[36mbuild:skeleton:prod\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
    }
  }

  await _clean();
  _doskeleton(done);
  _dosw(done);
  _doindexhtml(done);
  _doofflinehtml(done);
}


// Start script.
run();


// -- oOo --
