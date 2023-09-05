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
   * Attributes, which make up a geometry's vertices.  Each property in this object corresponds to a
   * {@link GeometryAttribute} containing the attribute's data.
   * <p>
   * Attributes are always stored non-interleaved in a Geometry.
   * </p>
   *
   * @alias GeometryAttributes
   * @constructor
   */
  function GeometryAttributes(options) {
    options = defaultValue.defaultValue(options, defaultValue.defaultValue.EMPTY_OBJECT);

    /**
     * The 3D position attribute.
     * <p>
     * 64-bit floating-point (for precision).  3 components per attribute.
     * </p>
     *
     * @type GeometryAttribute
     *
     * @default undefined
     */
    this.position = options.position;

    /**
     * The normal attribute (normalized), which is commonly used for lighting.
     * <p>
     * 32-bit floating-point.  3 components per attribute.
     * </p>
     *
     * @type GeometryAttribute
     *
     * @default undefined
     */
    this.normal = options.normal;

    /**
     * The 2D texture coordinate attribute.
     * <p>
     * 32-bit floating-point.  2 components per attribute
     * </p>
     *
     * @type GeometryAttribute
     *
     * @default undefined
     */
    this.st = options.st;

    /**
     * The bitangent attribute (normalized), which is used for tangent-space effects like bump mapping.
     * <p>
     * 32-bit floating-point.  3 components per attribute.
     * </p>
     *
     * @type GeometryAttribute
     *
     * @default undefined
     */
    this.bitangent = options.bitangent;

    /**
     * The tangent attribute (normalized), which is used for tangent-space effects like bump mapping.
     * <p>
     * 32-bit floating-point.  3 components per attribute.
     * </p>
     *
     * @type GeometryAttribute
     *
     * @default undefined
     */
    this.tangent = options.tangent;

    /**
     * The color attribute.
     * <p>
     * 8-bit unsigned integer. 4 components per attribute.
     * </p>
     *
     * @type GeometryAttribute
     *
     * @default undefined
     */
    this.color = options.color;
  }

  exports.GeometryAttributes = GeometryAttributes;

}));
//# sourceMappingURL=GeometryAttributes-7148b03a.js.map
