import { Viewer, Cartesian3, Math, Ellipsoid } from 'cesium'

/**
 * Cartesian3 对象 轉經緯度標高
 * @param {Cartesian3 | undefined} cartesian - 要变换的笛卡尔坐标。
 * @param {Viewer} viewer - Cesium 查看器对象。
 * @returns 接受笛卡尔坐标和查看器并返回 lng、lat、alt 对象的函数。
 */
function transformCartesianToWGS84(cartesian: Cartesian3 | undefined, viewer: Viewer) {
  if (viewer && cartesian) {
    var ellipsoid = Ellipsoid.WGS84
    var cartographic = ellipsoid.cartesianToCartographic(cartesian)
    return {
      lng: Math.toDegrees(cartographic.longitude),
      lat: Math.toDegrees(cartographic.latitude),
      alt: cartographic.height,
    }
  }
}

export { transformCartesianToWGS84 }
