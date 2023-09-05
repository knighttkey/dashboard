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

define(['exports', './RuntimeError-db55e3ec', './defaultValue-53cb09ab', './ComponentDatatype-2d84f6e0'], (function (exports, RuntimeError, defaultValue, ComponentDatatype) { 'use strict';

  const removeDuplicatesEpsilon = ComponentDatatype.CesiumMath.EPSILON10;

  /**
   * Removes adjacent duplicate values in an array of values.
   *
   * @param {Array.<*>} [values] The array of values.
   * @param {Function} equalsEpsilon Function to compare values with an epsilon. Boolean equalsEpsilon(left, right, epsilon).
   * @param {Boolean} [wrapAround=false] Compare the last value in the array against the first value. If they are equal, the last value is removed.
   * @param {Array.<Number>} [removedIndices=undefined] Store the indices that correspond to the duplicate items removed from the array, if there were any.
   * @returns {Array.<*>|undefined} A new array of values with no adjacent duplicate values or the input array if no duplicates were found.
   *
   * @example
   * // Returns [(1.0, 1.0, 1.0), (2.0, 2.0, 2.0), (3.0, 3.0, 3.0), (1.0, 1.0, 1.0)]
   * const values = [
   *     new Cesium.Cartesian3(1.0, 1.0, 1.0),
   *     new Cesium.Cartesian3(1.0, 1.0, 1.0),
   *     new Cesium.Cartesian3(2.0, 2.0, 2.0),
   *     new Cesium.Cartesian3(3.0, 3.0, 3.0),
   *     new Cesium.Cartesian3(1.0, 1.0, 1.0)];
   * const nonDuplicatevalues = Cesium.PolylinePipeline.removeDuplicates(values, Cartesian3.equalsEpsilon);
   *
   * @example
   * // Returns [(1.0, 1.0, 1.0), (2.0, 2.0, 2.0), (3.0, 3.0, 3.0)]
   * const values = [
   *     new Cesium.Cartesian3(1.0, 1.0, 1.0),
   *     new Cesium.Cartesian3(1.0, 1.0, 1.0),
   *     new Cesium.Cartesian3(2.0, 2.0, 2.0),
   *     new Cesium.Cartesian3(3.0, 3.0, 3.0),
   *     new Cesium.Cartesian3(1.0, 1.0, 1.0)];
   * const nonDuplicatevalues = Cesium.PolylinePipeline.removeDuplicates(values, Cartesian3.equalsEpsilon, true);
   *
   * @example
   * // Returns [(1.0, 1.0, 1.0), (2.0, 2.0, 2.0), (3.0, 3.0, 3.0)]
   * // removedIndices will be equal to [1, 3, 5]
   * const values = [
   *     new Cesium.Cartesian3(1.0, 1.0, 1.0),
   *     new Cesium.Cartesian3(1.0, 1.0, 1.0),
   *     new Cesium.Cartesian3(2.0, 2.0, 2.0),
   *     new Cesium.Cartesian3(2.0, 2.0, 2.0),
   *     new Cesium.Cartesian3(3.0, 3.0, 3.0),
   *     new Cesium.Cartesian3(1.0, 1.0, 1.0)];
   * const nonDuplicatevalues = Cesium.PolylinePipeline.removeDuplicates(values, Cartesian3.equalsEpsilon, true);
   * @private
   */
  function arrayRemoveDuplicates(
    values,
    equalsEpsilon,
    wrapAround,
    removedIndices
  ) {
    //>>includeStart('debug', pragmas.debug);
    RuntimeError.Check.defined("equalsEpsilon", equalsEpsilon);
    //>>includeEnd('debug');

    if (!defaultValue.defined(values)) {
      return undefined;
    }

    wrapAround = defaultValue.defaultValue(wrapAround, false);
    const storeRemovedIndices = defaultValue.defined(removedIndices);

    const length = values.length;
    if (length < 2) {
      return values;
    }

    let i;
    let v0 = values[0];
    let v1;

    // We only want to create a new array if there are duplicates in the array.
    // As such, cleanedValues is undefined until it encounters the first duplicate, if it exists.
    let cleanedValues;
    let lastCleanIndex = 0;

    // removedIndexLCI keeps track of where lastCleanIndex would be if it were sorted into the removedIndices array.
    // In case of arrays such as [A, B, C, ..., A, A, A], removedIndices will not be sorted properly without this.
    let removedIndexLCI = -1;

    for (i = 1; i < length; ++i) {
      v1 = values[i];
      if (equalsEpsilon(v0, v1, removeDuplicatesEpsilon)) {
        if (!defaultValue.defined(cleanedValues)) {
          cleanedValues = values.slice(0, i);
          lastCleanIndex = i - 1;
          removedIndexLCI = 0;
        }
        if (storeRemovedIndices) {
          removedIndices.push(i);
        }
      } else {
        if (defaultValue.defined(cleanedValues)) {
          cleanedValues.push(v1);
          lastCleanIndex = i;
          if (storeRemovedIndices) {
            removedIndexLCI = removedIndices.length;
          }
        }
        v0 = v1;
      }
    }

    if (
      wrapAround &&
      equalsEpsilon(values[0], values[length - 1], removeDuplicatesEpsilon)
    ) {
      if (storeRemovedIndices) {
        if (defaultValue.defined(cleanedValues)) {
          removedIndices.splice(removedIndexLCI, 0, lastCleanIndex);
        } else {
          removedIndices.push(length - 1);
        }
      }

      if (defaultValue.defined(cleanedValues)) {
        cleanedValues.length -= 1;
      } else {
        cleanedValues = values.slice(0, -1);
      }
    }

    return defaultValue.defined(cleanedValues) ? cleanedValues : values;
  }

  exports.arrayRemoveDuplicates = arrayRemoveDuplicates;

}));
//# sourceMappingURL=arrayRemoveDuplicates-c5cb6177.js.map