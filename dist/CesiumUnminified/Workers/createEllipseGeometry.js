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

define(['./Matrix2-58b45b31', './defaultValue-53cb09ab', './EllipseGeometry-64fb5203', './RuntimeError-db55e3ec', './ComponentDatatype-2d84f6e0', './WebGLConstants-85c5d1af', './Transforms-bbd8ea3f', './_commonjsHelpers-40eeb652', './combine-252b5614', './EllipseGeometryLibrary-46d51ef1', './GeometryAttribute-ddfc832e', './GeometryAttributes-7148b03a', './GeometryInstance-4c396952', './GeometryOffsetAttribute-05d2e180', './GeometryPipeline-3a718a02', './AttributeCompression-cc5ab1d4', './EncodedCartesian3-14afca7f', './IndexDatatype-4900b00f', './IntersectionTests-d036c2b3', './Plane-37193d4e', './VertexFormat-eef6f205'], (function (Matrix2, defaultValue, EllipseGeometry, RuntimeError, ComponentDatatype, WebGLConstants, Transforms, _commonjsHelpers, combine, EllipseGeometryLibrary, GeometryAttribute, GeometryAttributes, GeometryInstance, GeometryOffsetAttribute, GeometryPipeline, AttributeCompression, EncodedCartesian3, IndexDatatype, IntersectionTests, Plane, VertexFormat) { 'use strict';

  function createEllipseGeometry(ellipseGeometry, offset) {
    if (defaultValue.defined(offset)) {
      ellipseGeometry = EllipseGeometry.EllipseGeometry.unpack(ellipseGeometry, offset);
    }
    ellipseGeometry._center = Matrix2.Cartesian3.clone(ellipseGeometry._center);
    ellipseGeometry._ellipsoid = Matrix2.Ellipsoid.clone(ellipseGeometry._ellipsoid);
    return EllipseGeometry.EllipseGeometry.createGeometry(ellipseGeometry);
  }

  return createEllipseGeometry;

}));
//# sourceMappingURL=createEllipseGeometry.js.map
