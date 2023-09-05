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

define(['exports', './ComponentDatatype-2d84f6e0'], (function (exports, ComponentDatatype) { 'use strict';

  /**
   * @private
   */
  const CylinderGeometryLibrary = {};

  /**
   * @private
   */
  CylinderGeometryLibrary.computePositions = function (
    length,
    topRadius,
    bottomRadius,
    slices,
    fill
  ) {
    const topZ = length * 0.5;
    const bottomZ = -topZ;

    const twoSlice = slices + slices;
    const size = fill ? 2 * twoSlice : twoSlice;
    const positions = new Float64Array(size * 3);
    let i;
    let index = 0;
    let tbIndex = 0;
    const bottomOffset = fill ? twoSlice * 3 : 0;
    const topOffset = fill ? (twoSlice + slices) * 3 : slices * 3;

    for (i = 0; i < slices; i++) {
      const angle = (i / slices) * ComponentDatatype.CesiumMath.TWO_PI;
      const x = Math.cos(angle);
      const y = Math.sin(angle);
      const bottomX = x * bottomRadius;
      const bottomY = y * bottomRadius;
      const topX = x * topRadius;
      const topY = y * topRadius;

      positions[tbIndex + bottomOffset] = bottomX;
      positions[tbIndex + bottomOffset + 1] = bottomY;
      positions[tbIndex + bottomOffset + 2] = bottomZ;

      positions[tbIndex + topOffset] = topX;
      positions[tbIndex + topOffset + 1] = topY;
      positions[tbIndex + topOffset + 2] = topZ;
      tbIndex += 3;
      if (fill) {
        positions[index++] = bottomX;
        positions[index++] = bottomY;
        positions[index++] = bottomZ;
        positions[index++] = topX;
        positions[index++] = topY;
        positions[index++] = topZ;
      }
    }

    return positions;
  };

  exports.CylinderGeometryLibrary = CylinderGeometryLibrary;

}));
//# sourceMappingURL=CylinderGeometryLibrary-3826a25d.js.map
