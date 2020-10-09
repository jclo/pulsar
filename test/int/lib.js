// ESLint declarations:
/* global describe, it */
/* eslint one-var: 0, semi-style: 0, no-underscore-dangle: 0 */


// -- Vendor Modules
const { expect } = require('chai')
    ;


// -- Local Modules


// -- Local Constants
// Number of properties added by your library.
const OWNPROPS = 0
    , TESTMODE = 0
    ;


// -- Local Variables


// -- Main
module.exports = function(Pulsar, libname, version) {
  describe('Pulsar introspection:', () => {
    describe('Test the nature of Pulsar:', () => {
      it('Expects Pulsar to be a function.', () => {
        expect(Pulsar).to.be.a('function');
      });

      it(`Expects Pulsar to own ${1 + OWNPROPS} property(ies).`, () => {
        expect(Object.keys(Pulsar)).to.be.an('array').that.has.lengthOf(1 + OWNPROPS);
      });
    });
  });
};
