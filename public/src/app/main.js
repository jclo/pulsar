/** ************************************************************************
 *
 * Starts the App.
 *
 * main.js is just a literal object that contains a set of functions. It
 * can't be intantiated.
 *
 * Private Functions:
 *  . none,
 *
 *
 * Public Static Methods:
 *  . show                        renders the App into the DOM,
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
/* - */


// -- Vendor Modules


// -- Local Modules
import View from './views/main.js';


// -- Local Constants


// -- Local Variables


// -- Private Functions ----------------------------------------------------
// none,


// -- Public Static Methods ------------------------------------------------

const App = {

  /**
   * Renders the App into the DOM.
   *
   * @method ()
   * @public
   * @param {}              -,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  show() {
    View.show();
    return this;
  },
};


// -- Export
export default App;

/* - */
