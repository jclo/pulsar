/** ************************************************************************
 *
 * Creates the App.
 *
 * main.js is just a literal object that contains a set of functions. It
 * can't be intantiated.
 *
 * Private Functions:
 *  . _createApp                  inserts the App skeleton into the DOM,
 *
 *
 * Public Static Methods:
 *  . show                        creates the App,
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
/* eslint-disable no-underscore-dangle */


// -- Vendor Modules
import Vie from '@mobilabs/rview';


// -- Local Modules
import App from '../components/app/main';
import Model from '../models/main';


// -- Local Constants


// -- Local Variables


// -- Private Functions ----------------------------------------------------

/**
 * Inserts the App skeleton into the DOM.
 *
 * @function ()
 * @private
 * @param {}                -,
 * @returns {Object}        returns the App object,
 * @since 0.0.0
 */
function _createApp() {
  return Vie.render({
    el: '#app',
    children: { '<App />': App },
    template: `
      <div>
        <App />
      </div>
    `,
  }).$getChild('<App />');
}


// -- Public Static Methods ------------------------------------------------

const View = {

  /**
   * Creates the App.
   *
   * @method ()
   * @public
   * @param {}              -,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  show() {
    this.app = _createApp();
    return this;
  },
};


// -- Export
export default View;

/* eslint-enable no-underscore-dangle */
