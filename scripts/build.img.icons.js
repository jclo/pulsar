#!/usr/bin/env node
/* *****************************************************************************
 *
 * Creates './public/img' folder.
 *
 * build:img:icons.js script copies all the project images into './public/img'
 * folder and copies project icons in the './public/img/icons' subfolder.
 *
 * Private Functions:
 *  . _walk                       returns the list of files in the folder,
 *  . _copy                       copies the matching files in the destination folder,
 *  . _help                       displays the help message,
 *  . _clean                      removes the previous build,
 *  . _cpimg                      copies all the project images in the img folder,
 *  . _cpicons                    copies icons in the img folder,
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
const fs   = require('fs')
    , nopt = require('nopt')
    , path = require('path')
    ;


// -- Local Modules
const config = require('./config')
    ;


// -- Local Constants
const VERSION     = '0.0.0-alpha.0'
    , opts        = {
      help: [Boolean, false],
      version: [String, null],
    }
    , shortOpts   = {
      h: ['--help'],
      v: ['--version', VERSION],
    }
    , parsed      = nopt(opts, shortOpts, process.argv, 2)
    , { imgdir }  = config
    , { img }     = config
    , { icons }   = config
    ;


// -- Local Variables


// -- Private Functions --------------------------------------------------------

/**
 * Returns the list of files in the folder and subfolders.
 *
 * @function (arg1, arg2)
 * @private
 * @param {string}          the folder path,
 * @param {function}        function to call at the completion.
 * @returns {}              -,
 * @since 0.0.0
 */
// eslint-disable-next-line no-unused-vars
function _walk(dir, done) {
  let results = []
    , pending
    ;

  fs.readdir(dir, (err, list) => {
    if (err) { done(err); return; }
    pending = list.length;
    if (!pending) { done(null, results); return; }

    list.forEach((file) => {
      const pathname = path.resolve(dir, file);

      fs.stat(pathname, (err1, stat) => {
        if (stat && stat.isDirectory()) {
          _walk(pathname, (err2, res) => {
            results = results.concat(res);
            pending -= 1;
            if (!pending) done(null, results);
          });
        } else {
          results.push(pathname);
          pending -= 1;
          if (!pending) done(null, results);
        }
      });
    });
  });
}

/**
 * Copies the matching files in the destination folder.
 *
 * Nota:
 * If the function filter is defined in the option object and if it
 * returns true, the file is copied. If filter is missing or returns
 * false no file is copied.
 * This function returns the lists of found files in the callback done.
 *
 * @function (arg1, arg2, arg3, arg4)
 * @private
 * @param {string}          the source folder,
 * @param {string}          the destination folder,
 * @param {Object}          the options,
 * @param {function}        function to call at the completion.
 * @returns {}              -,
 * @since 0.0.0
 */
function _copy(source, dest, options, done) {
  let results = []
    , pending
    ;

  fs.readdir(source, (err, list) => {
    if (err) { done(err); return; }
    pending = list.length;
    if (!pending) { done(null, results); return; }

    list.forEach((file) => {
      const pathname = path.resolve(source, file);

      fs.stat(pathname, (err1, stat) => {
        if (stat && stat.isDirectory()) {
          _copy(pathname, dest, options, (err2, res) => {
            results = results.concat(res);
            if (options && options.filter && options.filter(res)) {
              fs.cp(res, `${dest}/${path.basename(res)}`, () => {
                pending -= 1;
                if (!pending) done(null, results);
              });
            } else {
              pending -= 1;
              if (!pending) done(null, results);
            }
          });
        } else {
          results.push(pathname);
          if (options && options.filter && options.filter(pathname)) {
            fs.cp(pathname, `${dest}/${path.basename(pathname)}`, () => {
              pending -= 1;
              if (!pending) done(null, results);
            });
          } else {
            pending -= 1;
            if (!pending) done(null, results);
          }
        }
      });
    });
  });
}

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
    '                       copies project img and icons to ./public/img folder',
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
 * Removes the previous build.
 *
 * @function ([arg1])
 * @private
 * @param {Function}        the function to call at the completion,
 * @returns {Object}        returns a promise,
 * @since 0.0.0
 */
function _clean(done) {
  const d1 = new Date();
  process.stdout.write('Starting \'\x1b[36mclean\x1b[89m\x1b[0m\'...\n');

  return new Promise((resolve) => {
    fs.rm(imgdir, { force: true, recursive: true }, (err1) => {
      if (err1) throw new Error(err1);

      fs.mkdir(imgdir, { recursive: true }, (err2) => {
        if (err2) throw new Error(err2);

        const d2 = new Date() - d1;
        process.stdout.write(`Finished '\x1b[36mclean\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
        resolve();
        if (done) done();
      });
    });
  });
}

/**
 * Copies all the project images in the ./public/img folder.
 *
 * @function (arg1)
 * @private
 * @param {function}        the function to call at the completion,
 * @returns {}              -,
 * @since 0.0.0
 */
function _cpimg(done) {
  const d1 = new Date();
  process.stdout.write('Starting \'\x1b[36mcopy:img\x1b[89m\x1b[0m\'...\n');

  /**
   * checks if the passed in file is inside a 'img' folder.
   */
  function filterfn(source) {
    if (source.includes('/img/') && source.match(/\/\./) === null) {
      return true;
    }
    return false;
  }

  _copy(img, imgdir, { filter: filterfn }, (err) => {
    if (err) {
      throw new Error(err);
    }

    const d2 = new Date() - d1;
    process.stdout.write(`Finished '\x1b[36mcopy:img\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
    done();
  });
}

/**
 * Copies icons in './public/img' folder.
 *
 * @function (arg1)
 * @private
 * @param {function}        the function to call at the completion,
 * @returns {}              -,
 * @since 0.0.0
 */
function _cpicons(done) {
  const d1 = new Date();
  process.stdout.write('Starting \'\x1b[36mcopy:icons\x1b[89m\x1b[0m\'...\n');

  fs.stat(icons, (err1, stat) => {
    if (stat && stat.isDirectory()) {
      fs.cp(icons, `${imgdir}/icons`, { recursive: true }, (err) => {
        if (err) {
          throw new Error(err);
        }
      });
    }

    const d2 = new Date() - d1;
    process.stdout.write(`Finished '\x1b[36mcopy:icons\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
    done();
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
  const PENDING = 2;

  if (parsed.help) {
    _help();
    return;
  }

  if (parsed.version) {
    process.stdout.write(`version: ${parsed.version}\n`);
    return;
  }

  const d1 = new Date();
  process.stdout.write('Starting \'\x1b[36mbuild:img:icons\x1b[89m\x1b[0m\'...\n');

  let pending = PENDING;
  /**
   * Executes done until completion.
   */
  function done() {
    pending -= 1;
    if (!pending) {
      const d2 = new Date() - d1;
      process.stdout.write(`Finished '\x1b[36mbuild:img:icons\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
    }
  }

  await _clean();
  _cpimg(done);
  _cpicons(done);
}


// Start script.
run();


// -- oOo --
