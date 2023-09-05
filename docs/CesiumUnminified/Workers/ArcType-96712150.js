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
   * ArcType defines the path that should be taken connecting vertices.
   *
   * @enum {Number}
   */
  const ArcType = {
    /**
     * Straight line that does not conform to the surface of the ellipsoid.
     *
     * @type {Number}
     * @constant
     */
    NONE: 0,

    /**
     * Follow geodesic path.
     *
     * @type {Number}
     * @constant
     */
    GEODESIC: 1,

    /**
     * Follow rhumb or loxodrome path.
     *
     * @type {Number}
     * @constant
     */
    RHUMB: 2,
  };
  var ArcType$1 = Object.freeze(ArcType);

  exports.ArcType = ArcType$1;

}));
//# sourceMappingURL=ArcType-96712150.js.map
