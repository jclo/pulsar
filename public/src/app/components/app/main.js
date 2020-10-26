/** ************************************************************************
 *
 * Defines the main component for the web App.
 *
 * main.js extends the RView object.
 *
 * Private Functions:
 *  . none,
 *
 *
 * Component's Public Custom Methods:
 *  . render                      returns the XMLString of the component,
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
import RView from '@mobilabs/rview';


// -- Local Modules


// -- Global Constants


// -- Global Variables


// -- Public ---------------------------------------------------------------

const App = RView.Component({

  /**
   * Initializes state and props.
   * (executed before the component is rendered in the DOM)
   *
   * @method ()
   * @public
   * @param {}              -,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  init() {
    this.props.hello = '(with Pulsar v{{lib:version}})';
    return this;
  },

  /**
   * Starts DOM events.
   * (executed after the component is rendered in the DOM)
   *
   * @method ()
   * @public
   * @param {}              -,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  events() {
    return this;
  },

  /**
   * Returns the XMLString of the component.
   *
   * @method ()
   * @public
   * @param {}              -,
   * @returns {XMLString}   returns the XMLString of the component,
   * @since 0.0.0
   */
  render(state, props) {
    return `
      <div>
        <p style="text-align: center; padding-top: 100px;">
        Hello world! This is Pulsar Boilerplate.<br />
        <span class="pixar" style="font-size:0.9em;font-style:italic">${props.hello}</span>
      </p>
      </div>
    `;
  },
});


// -- Export
export default App;

/* eslint-enable no-underscore-dangle */
