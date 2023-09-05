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

define(['./Transforms-bbd8ea3f', './Matrix2-58b45b31', './ComponentDatatype-2d84f6e0', './defaultValue-53cb09ab', './RuntimeError-db55e3ec', './GeometryAttribute-ddfc832e', './GeometryAttributes-7148b03a', './IndexDatatype-4900b00f', './VertexFormat-eef6f205', './_commonjsHelpers-40eeb652', './combine-252b5614', './WebGLConstants-85c5d1af'], (function (Transforms, Matrix2, ComponentDatatype, defaultValue, RuntimeError, GeometryAttribute, GeometryAttributes, IndexDatatype, VertexFormat, _commonjsHelpers, combine, WebGLConstants) { 'use strict';

  let scratchCartesian = new Matrix2.Cartesian3();

  /**
   * Describes the outline of a {@link FanGeometry}.
   *
   * @alias FanOutlineGeometry
   * @ionsdk
   * @constructor
   *
   * @param {Object} options An object with the following properties:
   * @param {Spherical[]} options.directions The directions, pointing outward from the origin, that defined the fan.
   * @param {Number} [options.radius] The radius at which to draw the fan.
   * @param {Boolean} [options.perDirectionRadius] When set to true, the magnitude of each direction is used in place of a constant radius.
   * @param {Number} [options.numberOfRings=6] The number of outline rings to draw, starting from the outer edge and equidistantly spaced towards the center.
   * @param {VertexFormat} [options.vertexFormat=VertexFormat.DEFAULT] The vertex attributes to be computed.
   */
  function FanOutlineGeometry(options) {
    options = defaultValue.defaultValue(options, defaultValue.defaultValue.EMPTY_OBJECT);

    //>>includeStart('debug', pragmas.debug);
    if (!defaultValue.defined(options.directions)) {
      throw new RuntimeError.DeveloperError("options.directions is required");
    }
    if (!options.perDirectionRadius && !defaultValue.defined(options.radius)) {
      throw new RuntimeError.DeveloperError(
        "options.radius is required when options.perDirectionRadius is undefined or false."
      );
    }
    //>>includeEnd('debug');

    this._radius = options.radius;
    this._directions = options.directions;
    this._perDirectionRadius = options.perDirectionRadius;
    this._numberOfRings = defaultValue.defaultValue(options.numberOfRings, 6);
    this._vertexFormat = defaultValue.defaultValue(options.vertexFormat, VertexFormat.VertexFormat.DEFAULT);
    this._workerName = "createFanOutlineGeometry";
  }

  /**
   * Computes the geometric representation of a fan outline, including its vertices, indices, and a bounding sphere.
   *
   * @param {FanOutlineGeometry} fanGeometry A description of the fan.
   * @returns {Geometry|undefined} The computed vertices and indices.
   */
  FanOutlineGeometry.createGeometry = function (fanGeometry) {
    //>>includeStart('debug', pragmas.debug);
    if (!defaultValue.defined(fanGeometry)) {
      throw new RuntimeError.DeveloperError("fanGeometry is required");
    }
    //>>includeEnd('debug');

    const radius = fanGeometry._radius;
    const perDirectionRadius =
      defaultValue.defined(fanGeometry._perDirectionRadius) && fanGeometry._perDirectionRadius;
    const directions = fanGeometry._directions;
    const vertexFormat = fanGeometry._vertexFormat;
    const numberOfRings = fanGeometry._numberOfRings;

    let i;
    let x;
    let ring;
    let length;
    let maxRadius = 0;
    let positions;
    const directionsLength = directions.length;
    const attributes = new GeometryAttributes.GeometryAttributes();

    if (vertexFormat.position) {
      x = 0;
      length = directionsLength * 3 * numberOfRings;
      positions = new Float64Array(length);

      for (ring = 0; ring < numberOfRings; ring++) {
        for (i = 0; i < directionsLength; i++) {
          scratchCartesian = Matrix2.Cartesian3.fromSpherical(
            directions[i],
            scratchCartesian
          );
          const currentRadius = perDirectionRadius
            ? Matrix2.Cartesian3.magnitude(scratchCartesian)
            : radius;
          const ringRadius = (currentRadius / numberOfRings) * (ring + 1);
          scratchCartesian = Matrix2.Cartesian3.normalize(
            scratchCartesian,
            scratchCartesian
          );

          positions[x++] = scratchCartesian.x * ringRadius;
          positions[x++] = scratchCartesian.y * ringRadius;
          positions[x++] = scratchCartesian.z * ringRadius;
          maxRadius = Math.max(maxRadius, currentRadius);
        }
      }

      attributes.position = new GeometryAttribute.GeometryAttribute({
        componentDatatype: ComponentDatatype.ComponentDatatype.DOUBLE,
        componentsPerAttribute: 3,
        values: positions,
      });
    }

    x = 0;
    length = directionsLength * 2 * numberOfRings;
    const indices = IndexDatatype.IndexDatatype.createTypedArray(length / 3, length);

    for (ring = 0; ring < numberOfRings; ring++) {
      const offset = ring * directionsLength;
      for (i = 0; i < directionsLength - 1; i++) {
        indices[x++] = i + offset;
        indices[x++] = i + 1 + offset;
      }
      indices[x++] = i + offset;
      indices[x++] = 0 + offset;
    }

    return new GeometryAttribute.Geometry({
      attributes: attributes,
      indices: indices,
      primitiveType: GeometryAttribute.PrimitiveType.LINES,
      boundingSphere: new Transforms.BoundingSphere(Matrix2.Cartesian3.ZERO, maxRadius),
    });
  };

  var createFanOutlineGeometry = FanOutlineGeometry.createGeometry;

  return createFanOutlineGeometry;

}));
//# sourceMappingURL=createFanOutlineGeometry.js.map
