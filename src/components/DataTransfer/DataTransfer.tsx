import { useEffect, useRef } from "react";
import * as Cesium from "cesium";
// import WebGLClobeDataSource from '/Sandcastle/WebGLClobeDataSource.js?url&module'
import './DataTransfer.postcss'
const FOV = 90;
const FrustumFov = (Math.PI / 180) * FOV;

const Template = ({}) => {
  const ele = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ele || !ele.current) return;
    const cesiumViewerInEle = ele.current.querySelector(".cesium-viewer");
    if (cesiumViewerInEle) return;
    const viewer = new Cesium.Viewer("cesiumContainer", {
      // terrainProvider: Cesium.createWorldTerrain(),
      shouldAnimate: true,
      animation: false,
      timeline: false,
      geocoder: false,
      homeButton: false,
      sceneModePicker: false,
      baseLayerPicker: false,
      navigationHelpButton: false,
      fullscreenButton: false,
      terrainShadows: Cesium.ShadowMode.ENABLED,
      scene3DOnly: true,
    });
    //@ts-ignore
    viewer.camera.frustum.fov = FrustumFov;
    let cameraController = new Cesium.ScreenSpaceCameraController(viewer.scene);
    cameraController.enableTilt = false;
    viewer.shadows = true;
    viewer.scene.globe.baseColor = Cesium.Color.BLACK;
    viewer.scene.globe.enableLighting = true;
    viewer.scene.globe.depthTestAgainstTerrain = true;
    viewer.scene.globe.dynamicAtmosphereLighting = true;
    viewer.scene.globe.dynamicAtmosphereLightingFromSun = true;
    viewer.imageryLayers.get(0).nightAlpha = 0.5;

    let center = Cesium.Cartesian3.fromDegrees(
      121.52934155026584,
      25.03616188867775,
      50
    );

    const transform = Cesium.Transforms.eastNorthUpToFixedFrame(center);
    viewer.scene.camera.lookAtTransform(
      transform,
      new Cesium.HeadingPitchRange(0, -Math.PI / 8, 153000)
    );

    viewer.clock.onTick.addEventListener(function (_clock) {
      viewer.scene.camera.rotateRight(0.001);
    });
    const scene = viewer.scene;
    scene.globe.depthTestAgainstTerrain = true;

    const rainParticleSize = 3.0;
    const rainRadius = 8000.0;
    const rainImageSize = new Cesium.Cartesian2(
      rainParticleSize * 1,
      rainParticleSize * 30.0
    );
    let rainGravityScratch = new Cesium.Cartesian3();
    const particleUpdate = function (particle: Cesium.Particle) {
      rainGravityScratch = Cesium.Cartesian3.normalize(
        particle.position,
        rainGravityScratch
      );
      rainGravityScratch = Cesium.Cartesian3.multiplyByScalar(
        rainGravityScratch,
        200,
        rainGravityScratch
      );

      particle.position = Cesium.Cartesian3.add(
        particle.position,
        rainGravityScratch,
        Cesium.Cartesian3.fromDegrees(100.52934155026584, 22.03616188867775, 10)
      );

      const distance = Cesium.Cartesian3.distance(
        scene.camera.position,
        particle.position
      );
      if (distance > rainRadius) {
        particle.endColor.alpha = 0.0;
      } else {
        particle.endColor.alpha =
          Cesium.Color.BLUE.alpha / (distance / rainRadius + 0.1);
      }
    };
    const showParticle = () => {
      scene.primitives.removeAll();
      scene.primitives.add(
        new Cesium.ParticleSystem({
          modelMatrix: Cesium.Matrix4.fromTranslation(center),
          speed: 0.01,
          emitter: new Cesium.SphereEmitter(12000),
          startScale: 2.0,
          endScale: 0.0,
          image: "/SampleData/circular_particle.png",
          emissionRate: 200.0,
          minimumParticleLife: 1.2,
          maximumParticleLife: 12,
          minimumSpeed: 1.0,
          maximumSpeed: 1.0,
          startColor: Cesium.Color.fromCssColorString("#70ffcf90"),
          endColor: Cesium.Color.fromCssColorString("#b7ff5e"),
          imageSize: rainImageSize,
          updateCallback: particleUpdate,
        })
      );
    };

    showParticle();

  }, []);

  return <div id="cesiumContainer" className="fullSize" ref={ele}></div>;
};
export default Template;
