// @ts-nocheck
import {
  Viewer,
  PostProcessStageLibrary,
  Cartesian3,
  Transforms,
  HeadingPitchRange,
  ScreenSpaceEventHandler,
  defined,
  ScreenSpaceEventType,
  PostProcessStage,
  Math,
  createOsmBuildings,
  Cesium3DTileStyle,
  CustomShader,
  LightingModel,
  Cesium3DTileset,
  IonResource,
  Matrix4,
  Axis,
  Ellipsoid,
  Quaternion,
  JulianDate,
  createOsmBuildingsAsync,
} from 'cesium'
import { fragmentShaderText } from '../shader/osmTilesetCustomShader'
import rainShader from '../shader/rain'
import { grayMap, darknessMap, mapboxMap } from './mapHandler'
import { addLineTextMarker } from './markerFactory'

export const MAP_TYP = {
  GRAY: 'gray',
  DARK: 'dark',
  MAPBOX: 'mapbox',
}

/* 下雨特效 */
//@ts-ignore
// PostProcessStageLibrary.createRainStage = function () {
//   var rain = new PostProcessStage({
//     name: 'czm_rain',
//     fragmentShader: rainShader.rain1,
//     // fragmentShader: fs,
//   })
//   return rain
// }

export default class {
  viewer: Viewer
  center: Cartesian3 = new Cartesian3()
  // rainStage: PostProcessStage | undefined
  _autoRotation: boolean = false
  _erathLoaded: boolean = false
  _treeTilesRes: string = ''
  constructor(viewer: Viewer) {
    this.viewer = viewer
    this._init()
  }
  _init() {
    //地球載入完成
    this.viewer.scene.globe.tileLoadProgressEvent.addEventListener(
      this._onErathTileLoadednumber.bind(this),
    )
  }
  //地球區塊載入
  _onErathTileLoadednumber(tileLoadednumber: number) {
    if (tileLoadednumber === 0) {
      this._erathLoaded = true
      // 地球已經載入完成，此處可以添加完成載入後的代碼
      this.onErathLoaded()
      addEventListener
      this.viewer.scene.globe.tileLoadProgressEvent.removeEventListener(
        this._onErathTileLoadednumber,
      )
    }
  }
  set autoRotation(f: boolean) {
    if (this._autoRotation === true && f === false) {
      //關閉轉動
      this.viewer.camera.lookAtTransform(Matrix4.IDENTITY)
    }
    this._autoRotation = f
  }
  get autoRotation() {
    return this._autoRotation
  }
  //底圖工具
  mapHandler(type: string) {
    const viewer = this.viewer
    viewer.imageryLayers.removeAll()
    switch (type) {
      case MAP_TYP.GRAY:
        grayMap(viewer)
        return
      case MAP_TYP.DARK:
        darknessMap(viewer)
        return
      case MAP_TYP.MAPBOX:
        mapboxMap(viewer)
        return
    }
  }

  //osm builds樣式
  osmBuildHandler() {
    const viewer = this.viewer

    async function _loadOSM() {
      const tileset = await createOsmBuildingsAsync({
        showOutline: false,
        // enableModelExperimental: true,
      })
      if (viewer.isDestroyed()) {
        tileset.destroy()
        return
      }
      tileset.style = new Cesium3DTileStyle({
        color: "color('rgb(0,60,90,0.5)')",
        // show: "${name} !== 'Royal Castle'&&${name} !== 'Le Raffiné 39'",
      })
      tileset.customShader = new CustomShader({
        lightingModel: LightingModel.UNLIT,
        fragmentShaderText,
      })
      viewer.scene.primitives.add(tileset)
    }
    _loadOSM()
  }
  /* 新增一個文字Marker */
  appendTextMarker(
    text: string,
    startPoint: Cartesian3,
    { height }: { height: number },
    id?: string,
  ) {
    return addLineTextMarker(this.viewer, text || 'Null', id || text, { point: startPoint, height })
  }
  appendTree(translation: Cartesian3) {
    const self = this
    async function _loadTree() {
      if (!self._treeTilesRes) {
        //@ts-ignore
        self._treeTilesRes = await IonResource.fromAssetId(1543732)
      }
      const _treeTiles = await Cesium3DTileset.fromUrl(self._treeTilesRes, {
        modelUpAxis: Axis.X,
      })
      if (self.viewer.isDestroyed()) {
        _treeTiles.destroy
        return
      }
      const tree = self.viewer.scene.primitives.add(_treeTiles)
      //平移 修改经纬度
      const m = Matrix4.fromTranslationQuaternionRotationScale(
        translation,
        Quaternion.IDENTITY,
        new Cartesian3(0.7, 0.7, 0.7),
      )
      tree.modelMatrix = m
    }
    _loadTree()
  }
  //亮度相關
  brightness() {
    const collection = this.viewer.scene.postProcessStages
    const silhouette = collection.add(PostProcessStageLibrary.createDepthOfFieldStage())
    silhouette.enabled = true
    silhouette.uniforms.focalDistance = 20
    // 1000
    silhouette.uniforms.delta = 0.8
    // 5
    silhouette.uniforms.sigma = 1
    // 5
    silhouette.uniforms.stepSize = 1
    // 10
  }
  //模擬鏡頭光圈
  bloom() {
    const bloom = this.viewer.scene.postProcessStages.bloom
    bloom.enabled = true
    // bloom.uniforms.glowOnly = true
    // bloom.uniforms.contrast = 100
    bloom.uniforms.brightness = -0.3
    bloom.uniforms.delta = 1
    // bloom.uniforms.sigma = 5
    bloom.uniforms.stepSize = 1
  }
  //大下雨
  rain(f: boolean) {
    // const collection = this.viewer.scene.postProcessStages
    if (f) {
      // if (this.rainStage) return
      //@ts-ignore
      // const rain = PostProcessStageLibrary.createRainStage()
      // this.rainStage = rain
      // //@ts-ignore
      // collection.add(this.rainStage)
    } else {
      // //@ts-ignore
      // collection.remove(this.rainStage)
      // //@ts-ignore
      // this.rainStage = null
    }
  }
  //打開點擊位置log
  pickedPositionLog() {
    const viewer = this.viewer
    const handler = new ScreenSpaceEventHandler(viewer.canvas)
    //@ts-ignore
    handler.setInputAction(function (event) {
      var pickedPosition = viewer.scene.pickPosition(event.position)
      if (defined(pickedPosition)) {
        console.log('🤏', pickedPosition, Ellipsoid.WGS84.cartesianToCartographic(pickedPosition))
      }
    }, ScreenSpaceEventType.LEFT_CLICK)
  }
  //鏡頭環繞點
  cameraOrbitPointController(center: Cartesian3, d: number = 10000000) {
    this.center = center
    // Lock camera to a point
    const transform = Transforms.eastNorthUpToFixedFrame(center)
    const obj = {
      d,
    }
    this.viewer.scene.camera.lookAtTransform(
      transform,
      new HeadingPitchRange(0, -Math.PI / 30, obj.d),
    )
    // Orbit this point
    this.viewer.clock.onTick.addEventListener(this.clockTick.bind(this))
  }
  clockTick() {
    this._autoRotation && this.viewer.scene.camera.rotateRight(0.0005)
    const julianDate = this.viewer.clock.currentTime
    this.onTimer(JulianDate.toDate(julianDate))
  }
  /* 時間重置 */
  clockReset() {
    this.viewer.clock.currentTime = JulianDate.now()
    this.viewer.clock.shouldAnimate = true
  }
  /* 地球載入完成 */
  onErathLoaded() {}
  onTimer(date: Date) {}
  destroy() {
    this.viewer.scene.globe.tileLoadProgressEvent.removeEventListener(
      this._onErathTileLoadednumber.bind(this),
    )
    this.viewer.clock.onTick.removeEventListener(this.clockTick.bind(this))
  }
}
