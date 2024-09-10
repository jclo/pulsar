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
 * Overwritten Public Methods:
 *  . $init                       performs the public initializations,
 *  . $listenDOM                  listens for DOM events,
 *  . $postRender                 performs operations after component added to DOM,
 *  . $onChange                   performs operations after component updated in DOM,
 *  . $render                     returns the component XML string,
 *
 *
 * Specific Public Methods:
 *  . none,
 *
 *
 * Overwritable Public Methods:
 *  . none,
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
   * (performed before the component is rendered in the DOM)
   *
   * @method ()
   * @public
   * @param {}              -,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  $init() {
    this.props.hello = '(with Pulsar v{{lib:version}})';
    return this;
  },

  /**
   * Listens for DOM events.
   * (performed after the component is rendered in the DOM)
   *
   * @method ()
   * @public
   * @param {}              -,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  $listenDOM() {
    return this;
  },

  /**
   * Performs operations after the component is added to the DOM.
   *
   * @method ()
   * @public
   * @param {}              -,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  $postRender() {
    return this;
  },

  /**
   * Performs operations after the component has been updated in the DOM.
   *
   * @method ()
   * @public
   * @param {}              -,
   * @returns {Object}      returns this,
   * @since 0.0.0
   */
  $onChange() {
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
  $render(state, props) {
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
