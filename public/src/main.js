/** ************************************************************************
 *
 * Starts the App.
 *
 *
 * Private Functions:
 *  . none,
 *
 *
 * Public Function:
 *  . Pulsar                      starts the App,
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
/* global */
/* eslint-disable one-var, semi-style, no-console */


// -- Vendor Modules


// -- Local Modules
import Worker from './worker/main';
import App from './app/main';


// -- Local Constants
const sw = './sw.js';


// -- Local Variables


// -- Public ---------------------------------------------------------------

/**
 * Starts Pulsar.
 *
 * @function ()
 * @public
 * @param {}                -,
 * @returns {}              -,
 * @since 0.0.0
 */
function Pulsar() {
  Worker.start(sw, (err, msg) => {
    if (err) {
      console.log(err);
    } else {
      console.log(msg);
    }

    // Starts the App
    App.show();
  });
}

// Attaches a constant to Pulsar that provides the version of the lib.
Pulsar.VERSION = '{{lib:version}}';


// -- Starts the App
Pulsar();


// -- Export
export default Pulsar;

/* eslint-enable one-var, semi-style, no-console */
