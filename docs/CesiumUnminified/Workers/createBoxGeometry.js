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

define(['./BoxGeometry-4ad9260a', './defaultValue-53cb09ab', './Transforms-bbd8ea3f', './Matrix2-58b45b31', './RuntimeError-db55e3ec', './ComponentDatatype-2d84f6e0', './WebGLConstants-85c5d1af', './_commonjsHelpers-40eeb652', './combine-252b5614', './GeometryAttribute-ddfc832e', './GeometryAttributes-7148b03a', './GeometryOffsetAttribute-05d2e180', './VertexFormat-eef6f205'], (function (BoxGeometry, defaultValue, Transforms, Matrix2, RuntimeError, ComponentDatatype, WebGLConstants, _commonjsHelpers, combine, GeometryAttribute, GeometryAttributes, GeometryOffsetAttribute, VertexFormat) { 'use strict';

  function createBoxGeometry(boxGeometry, offset) {
    if (defaultValue.defined(offset)) {
      boxGeometry = BoxGeometry.BoxGeometry.unpack(boxGeometry, offset);
    }
    return BoxGeometry.BoxGeometry.createGeometry(boxGeometry);
  }

  return createBoxGeometry;

}));
//# sourceMappingURL=createBoxGeometry.js.map
