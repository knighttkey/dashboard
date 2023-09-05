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

define(['exports', './defaultValue-53cb09ab'], (function (exports, defaultValue) { 'use strict';

  /**
   * Merges two objects, copying their properties onto a new combined object. When two objects have the same
   * property, the value of the property on the first object is used.  If either object is undefined,
   * it will be treated as an empty object.
   *
   * @example
   * const object1 = {
   *     propOne : 1,
   *     propTwo : {
   *         value1 : 10
   *     }
   * }
   * const object2 = {
   *     propTwo : 2
   * }
   * const final = Cesium.combine(object1, object2);
   *
   * // final === {
   * //     propOne : 1,
   * //     propTwo : {
   * //         value1 : 10
   * //     }
   * // }
   *
   * @param {Object} [object1] The first object to merge.
   * @param {Object} [object2] The second object to merge.
   * @param {Boolean} [deep=false] Perform a recursive merge.
   * @returns {Object} The combined object containing all properties from both objects.
   *
   * @function
   */
  function combine(object1, object2, deep) {
    deep = defaultValue.defaultValue(deep, false);

    const result = {};

    const object1Defined = defaultValue.defined(object1);
    const object2Defined = defaultValue.defined(object2);
    let property;
    let object1Value;
    let object2Value;
    if (object1Defined) {
      for (property in object1) {
        if (object1.hasOwnProperty(property)) {
          object1Value = object1[property];
          if (
            object2Defined &&
            deep &&
            typeof object1Value === "object" &&
            object2.hasOwnProperty(property)
          ) {
            object2Value = object2[property];
            if (typeof object2Value === "object") {
              result[property] = combine(object1Value, object2Value, deep);
            } else {
              result[property] = object1Value;
            }
          } else {
            result[property] = object1Value;
          }
        }
      }
    }
    if (object2Defined) {
      for (property in object2) {
        if (
          object2.hasOwnProperty(property) &&
          !result.hasOwnProperty(property)
        ) {
          object2Value = object2[property];
          result[property] = object2Value;
        }
      }
    }
    return result;
  }

  exports.combine = combine;

}));
//# sourceMappingURL=combine-252b5614.js.map
