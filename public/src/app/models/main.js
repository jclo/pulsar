/** ************************************************************************
 *
 * Fetches data from the server.
 *
 * main.js is just a literal object that contains a set of functions. It
 * can't be intantiated.
 *
 * Private Functions:
 *  . _fetch                      fetches data from the server,
 *
 *
 * Public Static Methods:
 *  . getData                     gets data from the server,
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
/* eslint-disable no-underscore-dangle, no-console */


// -- Vendor Modules


// -- Local Modules


// -- Local Constants


// -- Local Variables


// -- Private Functions ----------------------------------------------------

/**
 * Fetches Kiwi logs from the server.
 *
 * @function (arg1)
 * @private
 * @param {Function}        the function to call at the completion,
 * @returns {}              -,
 * @since 0.0.0
 */
function _fetch(callback) {
  /**
   * Sends a GET api and wait for a text response.
   * If it fails, load the local "db".
   */
  fetch('/api/v1/getData')
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      }
      return Promise.reject(resp);
    })
    .then((data) => {
      callback(null, data);
    })
    .catch((resp) => {
      console.log(`Fetch does not work for the api "/v1/getKiwiLogs". The server returns: ${resp.statusText}.`);
      console.log('So, we try to download data from a local db.');
      fetch('../../../_db/data.json').then((response) => {
        if (response.ok) {
          console.log('Done!');
          return response.json();
        }
        return Promise.reject(response);
      }).then((data) => {
        callback(null, data);
      }).catch((response) => {
        throw new Error(response);
      });
    });
}


// -- Public Static Methods ------------------------------------------------

const Model = {

  /**
   * Gets data from the server.
   *
   * @method ([arg1])
   * @public
   * @param {Function}      the function to call at the completion,
   * @returns {Object}      returns a promise,
   * @since 0.0.0
   */
  getData(callback) {
    return new Promise((resolve, reject) => {
      _fetch((err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
          if (callback) callback(data);
        }
      });
    });
  },
};


// -- Export
export default Model;

/* eslint-enable no-underscore-dangle, no-console */
