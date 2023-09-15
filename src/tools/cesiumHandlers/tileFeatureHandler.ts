/* 3DTileFeatur tools */
import {
  Cesium3DTileFeature,
  Cartesian3,
  //@ts-ignore
} from 'cesium'

/**
 * 它返回 3D tile 要素的位置，如果不能则返回 null
 * @param {any} feature - any - 特征对象
 * @returns Cartesian3 对象。
 */
export const get3DTileFeaturePosition = (feature: any) => {
  if (!feature) return null
  if (!isCesium3DTileFeature(feature)) return null
  const longitude: number | unknown = get3DTileFeatureProperties(feature, 'cesium#longitude')
  const latitude: number | unknown = get3DTileFeatureProperties(feature, 'cesium#latitude')
  const height: number | unknown = get3DTileFeatureProperties(feature, 'cesium#estimatedHeight')
  if (longitude && latitude && height !== undefined)
    // @ts-ignore
    return new Cartesian3.fromDegrees(longitude, latitude, Number(height))
  else return null
}

/**
 * 如果要素是 3D 瓦片要素，则返回属性值，否则返回 null。
 * @param {any} feature - 要从中获取属性的要素对象。
 * @param {string} property - 要获取的属性的名称。
 * @returns 要素属性的值。
 */
export const get3DTileFeatureProperties = (feature: any, property: string) => {
  if (!feature) return null
  if (!isCesium3DTileFeature(feature)) {
    return null
  }
  return feature.getProperty(property) || null
}

/**
 * `log3DTileFeatureProperties` 将 `Cesium3DTileFeature` 的属性记录到控制台
 * @param {any} feature - 任何
 */
export const log3DTileFeatureProperties = (feature: any, property?: string) => {
  if (isCesium3DTileFeature(feature)) {
    if (property) {
      console.log(`📛${property}: ${feature.getProperty(property)}`)
      return
    }
    // @ts-ignore
    const properties = feature.getPropertyNames()
    properties.forEach((property: any) => {
      console.log(`${property}: ${feature.getProperty(property)}`)
    })
  } else {
    console.warn('🎡 feature is not Cesium3DTileFeature', feature)
  }
}

/**
 * 如果给定的特征是 Cesium3DTileFeature，则 isCesium3DTileFeature 返回 true，否则返回 false。
 * @param {any} feature - any - 要检查的功能。
 * @returns 一个布尔值。
 */
export function isCesium3DTileFeature(feature: any): feature is Cesium3DTileFeature {
  return feature instanceof Cesium3DTileFeature
}
