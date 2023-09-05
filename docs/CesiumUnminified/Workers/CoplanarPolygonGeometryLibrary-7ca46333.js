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

define(['exports', './Matrix2-58b45b31', './RuntimeError-db55e3ec', './OrientedBoundingBox-8edc55e1'], (function (exports, Matrix2, RuntimeError, OrientedBoundingBox) { 'use strict';

  /**
   * @private
   */
  const CoplanarPolygonGeometryLibrary = {};

  const scratchIntersectionPoint = new Matrix2.Cartesian3();
  const scratchXAxis = new Matrix2.Cartesian3();
  const scratchYAxis = new Matrix2.Cartesian3();
  const scratchZAxis = new Matrix2.Cartesian3();
  const obbScratch = new OrientedBoundingBox.OrientedBoundingBox();

  CoplanarPolygonGeometryLibrary.validOutline = function (positions) {
    //>>includeStart('debug', pragmas.debug);
    RuntimeError.Check.defined("positions", positions);
    //>>includeEnd('debug');

    const orientedBoundingBox = OrientedBoundingBox.OrientedBoundingBox.fromPoints(
      positions,
      obbScratch
    );
    const halfAxes = orientedBoundingBox.halfAxes;
    const xAxis = Matrix2.Matrix3.getColumn(halfAxes, 0, scratchXAxis);
    const yAxis = Matrix2.Matrix3.getColumn(halfAxes, 1, scratchYAxis);
    const zAxis = Matrix2.Matrix3.getColumn(halfAxes, 2, scratchZAxis);

    const xMag = Matrix2.Cartesian3.magnitude(xAxis);
    const yMag = Matrix2.Cartesian3.magnitude(yAxis);
    const zMag = Matrix2.Cartesian3.magnitude(zAxis);

    // If all the points are on a line return undefined because we can't draw a polygon
    return !(
      (xMag === 0 && (yMag === 0 || zMag === 0)) ||
      (yMag === 0 && zMag === 0)
    );
  };

  // call after removeDuplicates
  CoplanarPolygonGeometryLibrary.computeProjectTo2DArguments = function (
    positions,
    centerResult,
    planeAxis1Result,
    planeAxis2Result
  ) {
    //>>includeStart('debug', pragmas.debug);
    RuntimeError.Check.defined("positions", positions);
    RuntimeError.Check.defined("centerResult", centerResult);
    RuntimeError.Check.defined("planeAxis1Result", planeAxis1Result);
    RuntimeError.Check.defined("planeAxis2Result", planeAxis2Result);
    //>>includeEnd('debug');

    const orientedBoundingBox = OrientedBoundingBox.OrientedBoundingBox.fromPoints(
      positions,
      obbScratch
    );
    const halfAxes = orientedBoundingBox.halfAxes;
    const xAxis = Matrix2.Matrix3.getColumn(halfAxes, 0, scratchXAxis);
    const yAxis = Matrix2.Matrix3.getColumn(halfAxes, 1, scratchYAxis);
    const zAxis = Matrix2.Matrix3.getColumn(halfAxes, 2, scratchZAxis);

    const xMag = Matrix2.Cartesian3.magnitude(xAxis);
    const yMag = Matrix2.Cartesian3.magnitude(yAxis);
    const zMag = Matrix2.Cartesian3.magnitude(zAxis);
    const min = Math.min(xMag, yMag, zMag);

    // If all the points are on a line return undefined because we can't draw a polygon
    if (
      (xMag === 0 && (yMag === 0 || zMag === 0)) ||
      (yMag === 0 && zMag === 0)
    ) {
      return false;
    }

    let planeAxis1;
    let planeAxis2;

    if (min === yMag || min === zMag) {
      planeAxis1 = xAxis;
    }
    if (min === xMag) {
      planeAxis1 = yAxis;
    } else if (min === zMag) {
      planeAxis2 = yAxis;
    }
    if (min === xMag || min === yMag) {
      planeAxis2 = zAxis;
    }

    Matrix2.Cartesian3.normalize(planeAxis1, planeAxis1Result);
    Matrix2.Cartesian3.normalize(planeAxis2, planeAxis2Result);
    Matrix2.Cartesian3.clone(orientedBoundingBox.center, centerResult);
    return true;
  };

  function projectTo2D(position, center, axis1, axis2, result) {
    const v = Matrix2.Cartesian3.subtract(position, center, scratchIntersectionPoint);
    const x = Matrix2.Cartesian3.dot(axis1, v);
    const y = Matrix2.Cartesian3.dot(axis2, v);

    return Matrix2.Cartesian2.fromElements(x, y, result);
  }

  CoplanarPolygonGeometryLibrary.createProjectPointsTo2DFunction = function (
    center,
    axis1,
    axis2
  ) {
    return function (positions) {
      const positionResults = new Array(positions.length);
      for (let i = 0; i < positions.length; i++) {
        positionResults[i] = projectTo2D(positions[i], center, axis1, axis2);
      }

      return positionResults;
    };
  };

  CoplanarPolygonGeometryLibrary.createProjectPointTo2DFunction = function (
    center,
    axis1,
    axis2
  ) {
    return function (position, result) {
      return projectTo2D(position, center, axis1, axis2, result);
    };
  };

  exports.CoplanarPolygonGeometryLibrary = CoplanarPolygonGeometryLibrary;

}));
//# sourceMappingURL=CoplanarPolygonGeometryLibrary-7ca46333.js.map