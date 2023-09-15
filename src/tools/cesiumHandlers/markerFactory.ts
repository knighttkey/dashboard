/** Marker製造廠 */

import {
  Viewer,
  Cartesian3,
  Ellipsoid,
  Color,
  LabelStyle,
  VerticalOrigin,
  Cartesian2,
  PolylineGraphics,
  ConstantProperty,
  PolylineGlowMaterialProperty,
  DistanceDisplayCondition,
} from 'cesium'

export interface I_TextMarker {
  point: Cartesian3
  height: number
}

/**
 * 增加一個3d文字Marker
 */
export function addLineTextMarker(
  viewer: Viewer,
  text: string,
  id: string,
  { point, height }: I_TextMarker,
) {
  if (!point) throw new Error('addTextMarker point is null!')
  const cartographic = Ellipsoid.WGS84.cartesianToCartographic(point)
  cartographic.height += height || 20
  const endPoint = Ellipsoid.WGS84.cartographicToCartesian(cartographic)
  const entity = _addTextLable(viewer, text, id, { point: endPoint })
  // 將線段添加到實體中
  entity.polyline = _generateLine(point, endPoint)
  return entity
}

/**
 * 添加标签
 * @param {Viewer} viewer - Viewer - Cesium 查看器对象
 * @param {string} text - 将显示在标签上的文本。
 * @param {Cartesian3} position - 标记的位置。
 * @param {string} id - 实体的 ID。
 * @returns 铯实体
 */
export function addTagMarker(
  viewer: Viewer,
  text: string,
  position: Cartesian3,
  { id, font }: { id?: string; font?: string } = { id: undefined, font: undefined },
) {
  return viewer.entities.add({
    position,
    name: text,
    id: id || text,
    label: {
      text: text,
      font: font || '20px Comfortaa',
      outlineColor: Color.BLACK,
      // outlineWidth: 2,
      // style: LabelStyle.FILL_AND_OUTLINE,
      // eyeOffset: new Cartesian3(0, 0, 100),
      verticalOrigin: VerticalOrigin.TOP,
      distanceDisplayCondition: new DistanceDisplayCondition(50, 1000),
    },
  })
}

function _addTextLable(viewer: Viewer, text: string, id: string, { point }: { point: Cartesian3 }) {
  // 創建一個實體
  return viewer.entities.add({
    position: point,
    name: 'text',
    id,
    label: {
      text,
      font: '22px Comfortaa',
      outlineColor: Color.BLACK,
      outlineWidth: 2,
      style: LabelStyle.FILL_AND_OUTLINE,
      verticalOrigin: VerticalOrigin.TOP,
      eyeOffset: new Cartesian3(0, 0, -100),
      pixelOffset: new Cartesian2(0, -20), // 向下移動像素
      distanceDisplayCondition: new DistanceDisplayCondition(50),
    },
  })
}

function _generateLine(startPoint: Cartesian3, endPoint: Cartesian3) {
  return new PolylineGraphics({
    positions: new ConstantProperty([startPoint, endPoint]),
    width: 2,
    material: new PolylineGlowMaterialProperty({
      glowPower: 0.2,
      taperPower: 0.5,
      color: new Color(0.3, 1, 0.3, 1),
    }),
    distanceDisplayCondition: new DistanceDisplayCondition(200, 2000),
  })
}
