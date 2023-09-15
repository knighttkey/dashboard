// @ts-nocheck
import {
  Viewer,
  ArcGisMapServerImageryProvider,
  IonImageryProvider,
  MapboxStyleImageryProvider,
  ImageryLayer,
} from 'cesium'
//灰色底圖
function grayMap(viewer: Viewer) {
  const arcGisLayerWDGB = new ArcGisMapServerImageryProvider({
    // ArcGIS-World_Dark_Gray_Base
    url: 'https://services.arcgisonline.com/arcgis/rest/services/Canvas/World_Dark_Gray_Base/MapServer',
  })
  viewer.imageryLayers.addImageryProvider(arcGisLayerWDGB)
  const arcGisLayerWBP = new ArcGisMapServerImageryProvider({
    // ArcGIS-World_Boundaries_and_Places ***
    url: 'https://services.arcgisonline.com/arcgis/rest/services/Reference/World_Boundaries_and_Places/MapServer',
  })
  viewer.imageryLayers.addImageryProvider(arcGisLayerWBP)
}
//黑暗底圖
function darknessMap(viewer: Viewer) {
  //@ts-ignore
  const mapImagery = ImageryLayer.fromProviderAsync(IonImageryProvider.fromAssetId(4))
  viewer.imageryLayers.add(mapImagery)
  mapImagery.hue = 0
  mapImagery.contrast = -0.9
}

//Mapbox底圖
function mapboxMap(viewer: Viewer) {
  viewer.imageryLayers.addImageryProvider(
    new MapboxStyleImageryProvider({
      url: 'https://api.mapbox.com/styles/v1/',
      styleId: 'clfhy25pd000c01pifc2jril2',
      username: 'dgiot',
      accessToken:
        'pk.eyJ1IjoiZGdpb3QiLCJhIjoiY2xmaHh2MnF3MGhyNjN6cXB0ZjRrcmZ6NCJ9.2tT4DrreiJWdKiPLiMom6Q',
    }),
  )
}
export { grayMap, darknessMap, mapboxMap }
