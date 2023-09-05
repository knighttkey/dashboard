/**
 * @license
 * Cesium Analytics SDK
 * Version 1.96
 *
 * Copyright 2012-2020 Cesium GS, Inc.
 * All rights reserved.
 *
 * Patents US9153063B2 US9865085B1 US9449424B2 US10592242
 * Patents pending US15/829,786 US16/850,266 US16/851,958
 *
 * Portions licensed separately.
 * See https://github.com/CesiumGS/cesium/blob/main/LICENSE.md for open-source Cesium license.
 */

define(['exports'], (function (exports) { 'use strict';

  /**
   * @function
   *
   * @param {*} value The object.
   * @returns {Boolean} Returns true if the object is defined, returns false otherwise.
   *
   * @example
   * if (Cesium.defined(positions)) {
   *      doSomething();
   * } else {
   *      doSomethingElse();
   * }
   */
  function defined(value) {
    return value !== undefined && value !== null;
  }

  /**
   * Returns the first parameter if not undefined, otherwise the second parameter.
   * Useful for setting a default value for a parameter.
   *
   * @function
   *
   * @param {*} a
   * @param {*} b
   * @returns {*} Returns the first parameter if not undefined, otherwise the second parameter.
   *
   * @example
   * param = Cesium.defaultValue(param, 'default');
   */
  function defaultValue(a, b) {
    if (a !== undefined && a !== null) {
      return a;
    }
    return b;
  }

  /**
   * A frozen empty object that can be used as the default value for options passed as
   * an object literal.
   * @type {Object}
   * @memberof defaultValue
   */
  defaultValue.EMPTY_OBJECT = Object.freeze({});

  exports.defaultValue = defaultValue;
  exports.defined = defined;

}));
//# sourceMappingURL=defaultValue-53cb09ab.js.map
