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
   * Describes a triangle fan around the origin.
   *
   * @alias FanGeometry
   * @ionsdk
   * @constructor
   *
   * @param {Object} options An object with the following properties:
   * @param {Spherical[]} options.directions The directions, pointing outward from the origin, that defined the fan.
   * @param {Number} [options.radius] The radius at which to draw the fan.
   * @param {Boolean} [options.perDirectionRadius=false] When set to true, the magnitude of each direction is used in place of a constant radius.
   * @param {VertexFormat} [options.vertexFormat=VertexFormat.DEFAULT] The vertex attributes to be computed.
   *
   * @see FanGeometry#createGeometry
   */
  function FanGeometry(options) {
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
    this._vertexFormat = defaultValue.defaultValue(options.vertexFormat, VertexFormat.VertexFormat.DEFAULT);
    this._workerName = "createFanGeometry";
  }

  /**
   * Computes the geometric representation of a fan, including its vertices, indices, and a bounding sphere.
   *
   * @param {FanGeometry} fanGeometry A description of the fan.
   * @returns {Geometry|undefined} The computed vertices and indices.
   */
  FanGeometry.createGeometry = function (fanGeometry) {
    //>>includeStart('debug', pragmas.debug);
    if (!defaultValue.defined(fanGeometry)) {
      throw new RuntimeError.DeveloperError("fanGeometry is required");
    }
    //>>includeEnd('debug');

    const vertexFormat = fanGeometry._vertexFormat;
    const radius = fanGeometry._radius;
    const perDirectionRadius =
      defaultValue.defined(fanGeometry._perDirectionRadius) && fanGeometry._perDirectionRadius;
    const sphericalDiretions = fanGeometry._directions;
    if (sphericalDiretions[0].clock < sphericalDiretions[1].clock) {
      sphericalDiretions.reverse();
    }

    let normals;
    let bitangents;
    let maxRadius = 0;

    let i;
    let x;
    let s;
    let direction;
    let length;
    const attributes = new GeometryAttributes.GeometryAttributes();

    //Convert all directions to Cartesian space and remove adjacent duplicates.
    const directions = [];
    const normalizedDirections = [];
    let directionsLength = sphericalDiretions.length;
    for (i = 0; i < directionsLength; i++) {
      direction = Matrix2.Cartesian3.fromSpherical(sphericalDiretions[i]);
      if (i === 0) {
        directions.push(direction);
        normalizedDirections.push(
          Matrix2.Cartesian3.normalize(direction, new Matrix2.Cartesian3())
        );
      } else if (!Matrix2.Cartesian3.equals(directions[i - 1], direction)) {
        if (i === directionsLength - 1) {
          if (!Matrix2.Cartesian3.equals(directions[0], direction)) {
            directions.push(direction);
            normalizedDirections.push(
              Matrix2.Cartesian3.normalize(direction, new Matrix2.Cartesian3())
            );
          }
        } else {
          directions.push(direction);
          normalizedDirections.push(
            Matrix2.Cartesian3.normalize(direction, new Matrix2.Cartesian3())
          );
        }
      }
    }
    directionsLength = directions.length;

    if (vertexFormat.position) {
      length = (directionsLength + 1) * 2 * 3;
      const positions = new Float64Array(length);

      x = 0;
      for (i = 0; i < directionsLength; i++) {
        positions[x++] = 0;
        positions[x++] = 0;
        positions[x++] = 0;

        direction = normalizedDirections[i];
        const currentRadius = perDirectionRadius
          ? Matrix2.Cartesian3.magnitude(directions[i])
          : radius;
        positions[x++] = direction.x * currentRadius;
        positions[x++] = direction.y * currentRadius;
        positions[x++] = direction.z * currentRadius;
        maxRadius = Math.max(maxRadius, currentRadius);
      }

      positions[x++] = positions[0];
      positions[x++] = positions[1];
      positions[x++] = positions[2];
      positions[x++] = positions[3];
      positions[x++] = positions[4];
      positions[x++] = positions[5];

      attributes.position = new GeometryAttribute.GeometryAttribute({
        componentDatatype: ComponentDatatype.ComponentDatatype.DOUBLE,
        componentsPerAttribute: 3,
        values: positions,
      });
    }

    if (vertexFormat.normal) {
      length = (directionsLength + 1) * 2 * 3;
      normals = new Float32Array(length);

      let direction2;
      x = 0;
      for (i = 0; i < directionsLength; i++) {
        direction = directions[i];
        if (i + 1 === directionsLength) {
          direction2 = directions[0];
        } else {
          direction2 = directions[i + 1];
        }
        scratchCartesian = Matrix2.Cartesian3.normalize(
          Matrix2.Cartesian3.cross(direction, direction2, scratchCartesian),
          scratchCartesian
        );
        normals[x++] = scratchCartesian.x;
        normals[x++] = scratchCartesian.y;
        normals[x++] = scratchCartesian.z;

        normals[x++] = scratchCartesian.x;
        normals[x++] = scratchCartesian.y;
        normals[x++] = scratchCartesian.z;
      }

      normals[x++] = normals[0];
      normals[x++] = normals[1];
      normals[x++] = normals[2];
      normals[x++] = normals[3];
      normals[x++] = normals[4];
      normals[x++] = normals[5];

      attributes.normal = new GeometryAttribute.GeometryAttribute({
        componentDatatype: ComponentDatatype.ComponentDatatype.FLOAT,
        componentsPerAttribute: 3,
        values: normals,
      });
    }

    if (vertexFormat.bitangent) {
      length = (directionsLength + 1) * 2 * 3;
      bitangents = new Float32Array(length);

      x = 0;
      for (i = 0; i < directionsLength; i++) {
        direction = normalizedDirections[i];
        bitangents[x++] = direction.x;
        bitangents[x++] = direction.y;
        bitangents[x++] = direction.z;

        bitangents[x++] = direction.x;
        bitangents[x++] = direction.y;
        bitangents[x++] = direction.z;
      }
      bitangents[x++] = bitangents[0];
      bitangents[x++] = bitangents[1];
      bitangents[x++] = bitangents[2];
      bitangents[x++] = bitangents[3];
      bitangents[x++] = bitangents[4];
      bitangents[x++] = bitangents[5];

      attributes.bitangent = new GeometryAttribute.GeometryAttribute({
        componentDatatype: ComponentDatatype.ComponentDatatype.FLOAT,
        componentsPerAttribute: 3,
        values: bitangents,
      });
    }

    if (vertexFormat.tangent) {
      length = (directionsLength + 1) * 2 * 3;
      const tangents = new Float32Array(length);

      x = 0;
      for (i = 0; i < length; i += 6) {
        const normal = Matrix2.Cartesian3.unpack(normals, i);
        const bitangent = Matrix2.Cartesian3.unpack(bitangents, i);
        const tangent = Matrix2.Cartesian3.normalize(
          Matrix2.Cartesian3.cross(bitangent, normal, scratchCartesian),
          scratchCartesian
        );
        tangents[x++] = tangent.x;
        tangents[x++] = tangent.y;
        tangents[x++] = tangent.z;

        tangents[x++] = tangent.x;
        tangents[x++] = tangent.y;
        tangents[x++] = tangent.z;
      }

      attributes.tangent = new GeometryAttribute.GeometryAttribute({
        componentDatatype: ComponentDatatype.ComponentDatatype.FLOAT,
        componentsPerAttribute: 3,
        values: tangents,
      });
    }

    if (vertexFormat.st) {
      length = (directionsLength + 1) * 2 * 2;
      const textureCoordinates = new Float32Array(length);

      x = 0;
      for (i = 0; i < directionsLength; i++) {
        s = 1.0 - i / (directionsLength + 1);
        textureCoordinates[x++] = s;
        textureCoordinates[x++] = 0.0;

        textureCoordinates[x++] = s;
        textureCoordinates[x++] = 1.0;
      }

      s = 1 - i / (directionsLength + 1);
      textureCoordinates[x++] = s;
      textureCoordinates[x++] = 0.0;

      textureCoordinates[x++] = s;
      textureCoordinates[x++] = 1.0;

      attributes.st = new GeometryAttribute.GeometryAttribute({
        componentDatatype: ComponentDatatype.ComponentDatatype.FLOAT,
        componentsPerAttribute: 2,
        values: textureCoordinates,
      });
    }

    x = 0;
    i = 0;
    length = (directionsLength + 1) * 2 * 3;
    const indices = IndexDatatype.IndexDatatype.createTypedArray(length / 3, length);
    while (x < length - 6) {
      indices[x++] = i;
      indices[x++] = i + 3;
      indices[x++] = i + 1;

      indices[x++] = i;
      indices[x++] = i + 2;
      indices[x++] = i + 3;

      i += 2;
    }

    indices[x++] = i;
    indices[x++] = 1;
    indices[x++] = i + 1;

    indices[x++] = i;
    indices[x++] = 0;
    indices[x++] = 1;

    return new GeometryAttribute.Geometry({
      attributes: attributes,
      indices: indices,
      primitiveType: GeometryAttribute.PrimitiveType.TRIANGLES,
      boundingSphere: new Transforms.BoundingSphere(Matrix2.Cartesian3.ZERO, maxRadius),
    });
  };

  var createFanGeometry = FanGeometry.createGeometry;

  return createFanGeometry;

}));
//# sourceMappingURL=createFanGeometry.js.map
