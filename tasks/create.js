#!/usr/bin/env node
/* eslint  one-var: 0, semi-style: 0, no-underscore-dangle: 0,
  import/no-extraneous-dependencies: 0 */


// -- Vendor Modules
const fs           = require('fs')
    , readline     = require('readline')
    , shell        = require('shelljs')
    ;


// -- Local Modules
const site        = 'public'
    , baseapp     = process.cwd()
    , html5       = `${baseapp}/node_modules/html5-boilerplate/dist`
    ;


// -- Local Constants


// -- Local Variables


// -- Private functions --------------------------------------------------------

/**
 *  Checks if a website already exists.
 *
 * @function ()
 * @private
 * @param {}           -,
 * @returns {}         -,
 * @since 0.0.0
 */
function _checkIfAlreadyExist(dir, cb) {
  // Does the folder 'dir' exist?
  if (!fs.existsSync(dir)) {
    cb();
    return;
  }

  // The folder 'site' exists. Wait for a confirmation before overwriting it:
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: `The folder '${dir}' already exists. Do you want to overwrite it?\nChoice (y/N): `,
  });

  // Prompt the message:
  rl.prompt();

  // Read stdin:
  rl.on('line', (line) => {
    switch (line.trim()) {
      case 'y':
      case 'yes':
      case 'Y':
      case 'YES':
      case 'Yes':
        process.stdout.write('Ok, we understand that you\'re ready to overwrite the previous site.\nWe proceed...\n');
        // Delete 'site':
        shell.rm('-rf', dir);
        // Launch the 'close' event to stop reading the stdin.
        rl.close();
        break;

      case 'n':
      case 'no':
      case 'N':
      case 'NO':
      case 'No':
        process.stdout.write('Ok, it\'s a No. Bye bye!\n');
        // Abort the script:
        process.exit(0);
        break;

      default:
        process.stdout.write(`Say what? I might have heard '${line.trim()}'\n`);
        // Re-ask the confirmation:
        rl.prompt();
        break;
    }
  });

  rl.on('close', () => {
    cb();
  });
}


// -- Where the script starts --------------------------------------------------


// Check if 'site' exists?
_checkIfAlreadyExist(`${baseapp}/${site}`, () => {
  // Ok, it doesn't exist or we got the confirmation that we can overwrite
  // it. We can now create 'site':

  process.stdout.write(`creates and fills ./${site} ...\n`);
  shell.mkdir('-p', `${baseapp}/${site}/src`);

  process.stdout.write('adds .htaccess ...\n');
  shell.cp(`${html5}/.htaccess`, `${baseapp}/${site}/.htaccess-to.be.customized-`);

  process.stdout.write('adds 404.html ...\n');
  shell.cp(`${html5}/404.html`, `${baseapp}/${site}/.`);

  process.stdout.write('adds favicon.ico ...\n');
  shell.cp(`${html5}/favicon.ico`, `${baseapp}/${site}/.`);

  process.stdout.write('adds index.html ...\n');
  shell.cp(`${html5}/index.html`, `${baseapp}/${site}/index-to.be.customized-.html`);

  process.stdout.write('adds LICENSE.md ...\n');
  shell.cp(`${baseapp}/LICENSE.md`, `${baseapp}/${site}/.`);

  process.stdout.write('adds empty manifest.json ...\n');
  shell.touch(`${baseapp}/${site}/manifest-to.be.filled-.json`);

  process.stdout.write('adds an empty offline.html ...\n');
  shell.touch(`${baseapp}/${site}/offline-to.be.filled-.html`);

  process.stdout.write('adds robots.txt ...\n');
  shell.cp(`${html5}/robots.txt`, `${baseapp}/${site}/.`);

  process.stdout.write('adds site.webmanifest ...\n');
  shell.cp(`${html5}/site.webmanifest`, `${baseapp}/${site}/site.webmanifest-to.be.customized-`);

  process.stdout.write('adds empty sw.js ...\n');
  shell.touch(`${baseapp}/${site}/sw-to.be.filled-.js`);

  process.stdout.write('adds README_PWA.md ...\n');
  shell.cp(`${baseapp}/models/README_PWA.md`, `${baseapp}/${site}/.`);

  process.stdout.write('Fills the contents of "public/src" ...\n');
  shell.cp('-r', `${baseapp}/models/src/*`, `${baseapp}/${site}/src/.`);

  process.stdout.write('That\'s all!\n');
});
