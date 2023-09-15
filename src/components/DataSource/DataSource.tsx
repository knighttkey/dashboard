// @ts-nocheck
import { useEffect, useRef, useState } from "react";
import "./DataSource.postcss";
import { useWindowSize } from "usehooks-ts";
import * as Cesium from "cesium";
import CesiumHandlers from './../../tools/cesiumHandlers'
import markerCreater from './../../tools/streamMarkerCreater'
export default (props: any) => {
  const ele = useRef<HTMLDivElement>(null);
  const { scrollHeight } = props;
  const { height: windowHeight, width: windowWidth } = useWindowSize();
  const [viewerObj, setViewerObj] = useState<Cesium.Viewer>();
  const [cameraObj, setCameraObj] = useState<Cesium.Camera>();
  const handlersRef = useRef<CesiumHandlers>() /* viewer 處理物件實體 */
  const [handlerInstance, setHandlerInstance] = useState<CesiumHandlers>();
  useEffect(() => {
    if (!ele || !ele.current) return;
    const cesiumViewerInEle = ele.current.querySelector(".cesium-viewer");
    if (cesiumViewerInEle) return;
    const viewer = new Cesium.Viewer("cesiumContainer", {
      animation: false,
      timeline: false,
      geocoder: true,
      homeButton: false,
      sceneModePicker: false,
      baseLayerPicker: false,
      navigationHelpButton: false,
      fullscreenButton: false,
    });

    const handler = new CesiumHandlers(viewer)
    handlersRef.current = handler
    setHandlerInstance(handler)
    // Cesium.Ion.defaultAccessToken = "";
    // let tmsProvider = new SingleTileImageryProvider({
    //   url: "/src/assets/night_dark_pic.png",
    // });

    const addImg = async () => {
      let tmsProvider = await Cesium.SingleTileImageryProvider.fromUrl(
        "night_dark_pic.png"
      );
      console.log("tmsProvider", tmsProvider);
      viewer.imageryLayers.addImageryProvider(tmsProvider);
    };
    addImg();

    // viewer.clock.shouldAnimate = true;
    // viewer.clock.onTick.addEventListener(function (clock) {
    //   viewer.scene.camera.rotateRight(0.001);
    // });
    // window.startup = async function (Cesium) {
    //   "use strict";
    //Sandcastle_Begin
    /**
     * This class is an example of a custom DataSource.  It loads JSON data as
     * defined by Google's WebGL Globe, https://github.com/dataarts/webgl-globe.
    //  * @alias WebGLGlobeDataSource
    //  * @constructor
    //  *
    //  * @param {string} [name] The name of this data source.  If undefined, a name
    //  *                        will be derived from the url.
    //  *
    //  * @example
    //  * const dataSource = new Cesium.WebGLGlobeDataSource();
    //  * dataSource.loadUrl('sample.json');
    //  * viewer.dataSources.add(dataSource);
    //  */
    function WebGLGlobeDataSource() {
      //@ts-ignore
      //All public configuration is defined as ES5 properties
      //These are just the "private" variables and their defaults.
      this as {
        _name: string;
        _changed: Cesium.Event;
        _error: Cesium.Event;
        _isLoading: boolean;
        _loading: boolean;
        _entityCollection: Cesium.EntityCollection;
        _seriesNames: [];
        _seriesToDisplay: undefined;
        _heightScale: number;
        _entityCluster: Cesium.EntityCluster;
      };
      this._name = name;
      this._changed = new Cesium.Event();
      this._error = new Cesium.Event();
      this._isLoading = false;
      this._loading = new Cesium.Event();
      this._entityCollection = new Cesium.EntityCollection();
      this._seriesNames = [];
      this._seriesToDisplay = undefined;
      this._heightScale = 10000000;
      this._entityCluster = new Cesium.EntityCluster();
    }

    Object.defineProperties(WebGLGlobeDataSource.prototype, {
      //The below properties must be implemented by all DataSource instances

      /**
       * Gets a human-readable name for this instance.
       * @memberof WebGLGlobeDataSource.prototype
       * @type {String}
       */
      name: {
        get: function () {
          return this._name;
        },
      },
      /**
       * Since WebGL Globe JSON is not time-dynamic, this property is always undefined.
       * @memberof WebGLGlobeDataSource.prototype
       * @type {DataSourceClock}
       */
      clock: {
        value: undefined,
        writable: false,
      },
      /**
       * Gets the collection of Entity instances.
       * @memberof WebGLGlobeDataSource.prototype
       * @type {EntityCollection}
       */
      entities: {
        get: function () {
          return this._entityCollection;
        },
      },
      /**
       * Gets a value indicating if the data source is currently loading data.
       * @memberofCesium. WebGLGlobeDataSource.prototype
       * @type {Boolean}
       */
      isLoading: {
        get: function () {
          return this._isLoading;
        },
      },
      /**
       * Gets an event that will be raised when the underlying data changes.
       * @memberof WebGLGlobeDataSource.prototype
       * @type {Event}
       */
      changedEvent: {
        get: function () {
          return this._changed;
        },
      },
      /**
       * Gets an event that will be raised if an error is encountered during
       * processing.
       * @memberof WebGLGlobeDataSource.prototype
       * @type {Event}
       */
      errorEvent: {
        get: function () {
          return this._error;
        },
      },
      /**
       * Gets an event that will be raised when the data source either starts or
       * stops loading.
       * @memberof WebGLGlobeDataSource.prototype
       * @type {Event}
       */
      loadingEvent: {
        get: function () {
          return this._loading;
        },
      },

      //These properties are specific to this DataSource.

      /**
       * Gets the array of series names.
       * @memberof WebGLGlobeDataSource.prototype
       * @type {string[]}
       */
      seriesNames: {
        get: function () {
          return this._seriesNames;
        },
      },
      /**
       * Gets or sets the name of the series to display.  WebGL JSON is designed
       * so that only one series is viewed at a time.  Valid values are defined
       * in the seriesNames property.
       * @memberof Cesium.WebGLGlobeDataSource.prototype
       * @type {String}
       */
      seriesToDisplay: {
        get: function () {
          return this._seriesToDisplay;
        },
        set: function (value) {
          this._seriesToDisplay = value;

          //Iterate over all entities and set their show property
          //to true only if they are part of the current series.
          const collection = this._entityCollection;
          const entities = collection.values;
          collection.suspendEvents();
          for (let i = 0; i < entities.length; i++) {
            const entity = entities[i];
            entity.show = value === entity.seriesName;
          }
          collection.resumeEvents();
        },
      },
      /**
       * Gets or sets the scale factor applied to the height of each line.
       * @memberof WebGLGlobeDataSource.prototype
       * @type {Number}
       */
      heightScale: {
        get: function () {
          return this._heightScale;
        },
        set: function (value) {
          if (value <= 0) {
            throw new Cesium.DeveloperError("value must be greater than 0");
          }
          this._heightScale = value;
        },
      },
      /**
       * Gets whether or not this data source should be displayed.
       * @memberof WebGLGlobeDataSource.prototype
       * @type {Boolean}
       */
      show: {
        get: function () {
          return this._entityCollection;
        },
        set: function (value) {
          this._entityCollection = value;
        },
      },
      /**
       * Gets or sets the clustering options for this data source. This object can be shared between multiple data sources.
       * @memberof WebGLGlobeDataSource.prototype
       * @type {EntityCluster}
       */
      clustering: {
        get: function () {
          return this._entityCluster;
        },
        set: function (value) {
          if (!Cesium.defined(value)) {
            throw new Cesium.DeveloperError("value must be defined.");
          }
          this._entityCluster = value;
        },
      },
    });

    /**
     * Asynchronously loads the GeoJSON at the provided url, replacing any existing data.
     * @param {object} url The url to be processed.
     * @returns {Promise} a promise that will resolve when the GeoJSON is loaded.
     */
    WebGLGlobeDataSource.prototype.loadUrl = function (url: string) {
      if (!Cesium.defined(url)) {
        throw new Cesium.DeveloperError("url is required.");
      }

      //Create a name based on the url
      const name = Cesium.getFilenameFromUri(url);

      //Set the name if it is different than the current name.
      if (this._name !== name) {
        this._name = name;
        this._changed.raiseEvent(this);
      }

      //Load the URL into a json object
      //and then process is with the `load` function.
      const that = this;
      return Cesium.Resource.fetchJson(url)
        .then(function (json) {
          return that.load(json, url);
        })
        .catch(function (error) {
          //Otherwise will catch any errors or exceptions that occur
          //during the promise processing. When this happens,
          //we raise the error event and reject the promise.
          this._setLoading(false);
          that._error.raiseEvent(that, error);
          return Promise.reject(error);
        });
    };

    /**
     * Loads the provided data, replacing any existing data.
     * @param {Array} data The object to be processed.
     */
    WebGLGlobeDataSource.prototype.load = function (data) {
      console.log("___data", data);
      //>>includeStart('debug', pragmas.debug);
      if (!Cesium.defined(data)) {
        throw new Cesium.DeveloperError("data is required.");
      }
      //>>includeEnd('debug');

      //Clear out any data that might already exist.
      this._setLoading(true);
      this._seriesNames.length = 0;
      this._seriesToDisplay = undefined;

      const heightScale = this.heightScale;
      const entities = this._entityCollection;

      entities.suspendEvents();
      entities.removeAll();

      // Loop over each series
      for (let x = 0; x < data.length; x++) {
        const series = data[x];
        const seriesName = series[0];
        const coordinates = series[1];

        //Add the name of the series to our list of possible values.
        this._seriesNames.push(seriesName);

        //Make the first series the visible one by default
        const show = x === 0;
        if (show) {
          this._seriesToDisplay = seriesName;
        }

        //Now loop over each coordinate in the series and create
        // our entities from the data.
        for (let i = 0; i < coordinates.length; i += 3) {
          const latitude = coordinates[i];
          const longitude = coordinates[i + 1];
          const height = coordinates[i + 2];

          //Ignore lines of zero height.
          if (height === 0) {
            continue;
          }

          const color = Cesium.Color.fromHsl(0.6 - height * 0.5, 1.0, 0.5);
          const surfacePosition = Cesium.Cartesian3.fromDegrees(
            longitude,
            latitude,
            0
          );
          const heightPosition = Cesium.Cartesian3.fromDegrees(
            longitude,
            latitude,
            height * heightScale
          );

          //WebGL Globe only contains lines, so that's the only graphics we create.
          const polyline = new Cesium.PolylineGraphics();
          polyline.material = new Cesium.ColorMaterialProperty(color);
          polyline.width = new Cesium.ConstantProperty(2);
          polyline.arcType = new Cesium.ConstantProperty(Cesium.ArcType.NONE);
          polyline.positions = new Cesium.ConstantProperty([
            surfacePosition,
            heightPosition,
          ]);

          //The polyline instance itself needs to be on an entity.
          const entity = new Cesium.Entity({
            id: `${seriesName} index ${i.toString()}`,
            show: show,
            polyline: polyline,
            seriesName: seriesName, //Custom property to indicate series name
          });

          //Add the entity to the collection.
          entities.add(entity);
        }
      }

      //Once all data is processed, call resumeEvents and raise the changed event.
      entities.resumeEvents();
      this._changed.raiseEvent(this);
      this._setLoading(false);
    };

    WebGLGlobeDataSource.prototype._setLoading = function (isLoading) {
      if (this._isLoading !== isLoading) {
        this._isLoading = isLoading;
        this._loading.raiseEvent(this, isLoading);
      }
    };

    //Now that we've defined our own DataSource, we can use it to load
    //any JSON data formatted for WebGL Globe.
    const dataSource = new WebGLGlobeDataSource();
    console.log("dataSource", dataSource);
    dataSource.loadUrl("population909500.json").then(function () {});

    viewer.clock.shouldAnimate = true;
    // viewer.clock.onTick.addEventListener(function (clock) {
    //   viewer.scene.camera.rotateRight(0.001);
    //   console.log('viewer.scene.camera', viewer.scene.camera)
    // });
    const center = new Cesium.Cartesian3(0, 0, 0)
    handler.autoRotation = true
    handler.cameraOrbitPointController(center, 15000000)
    viewer.dataSources.add(dataSource);
    setViewerObj(viewer);
    let camera = new Cesium.Camera(viewer.scene);
    setCameraObj(camera);
    // getStreaming();
    // flyToPosition(props, camera);
    addBillboardAndRectangle(viewer);
    console.log("viewer.entities", viewer.entities);
    //-------------------------------------------------
    // const markerList = [
    //   {
    //     type: "red",
    //     title:
    //       "廣州市，通稱廣州，簡稱廣或穗，別稱羊城、花城、仙城，是中華人民共和國廣東省省會、副省級市、首批沿海開放城市。廣州市為中國大陸和廣東對外的商貿中心兼綜合交通樞紐，是中國大陸的一線城市之一，也是粵港澳大灣區的中心城市之一，中國人民解放軍南部戰區聯合指揮部亦駐紮該地。",
    //     format: "",
    //     pos: {
    //       longitude: 113.26020100862026,
    //       latitude: 23.136446985290693,

    //     },
    //     slopeLevel: 0,
    //   },
    //   {
    //     type: "green",
    //     title:
    //       "那霸市位於沖繩本島南部西海岸，是沖繩縣縣廳所在地和琉球列島人口最多城市。那霸市是沖繩縣的政治、經濟、文化中心，並且擁有國際機場那霸機場和連接沖繩縣外及附近離島的那霸港，是沖繩縣的玄關。那霸市是日本都道府縣廳所在地城市中面積最小的城市，也是日本首都圈和近畿圈之外人口密度最高的地區。",
    //     format: "",
    //     pos: {
    //       longitude: 127.67528598449887,
    //       latitude: 26.196476986336886,
    //     },
    //     slopeLevel: 0,
    //   },
    //   {
    //     type: "green",
    //     title: "國父紀念館。1972 年建的多用途建築，用於紀念孫中山，並提供文教課程",
    //     format: "",
    //     pos: {
    //       longitude: 121.55993223826923,
    //       latitude: 25.039543859796566,
    //     },
    //     slopeLevel: 0,
    //   },
    //   {
    //     type: "yellow",
    //     title: "台南市",
    //     format: "",
    //     pos: {
    //       longitude: 120.20459195643882,
    //       latitude: 23.00087377743533,
    //       altitude: 0,
    //     },
    //     slopeLevel: 2,
    //   },
    //   {
    //     type: "red",
    //     title: "高雄市",
    //     format: "",
    //     pos: {
    //       longitude: 120.3092839111622,
    //       latitude: 22.622873224183273,
    //       altitude: 0,
    //     },
    //     slopeLevel: 2,
    //   },
    //   {
    //     type: "yellow",
    //     title: "宜蘭市",
    //     format: "",
    //     pos: {
    //       longitude: 121.75505270900717,
    //       latitude: 24.757574284106955,
    //       altitude: 0,
    //     },
    //     slopeLevel: 4,
    //   },
    // ];
    // markerCreater(viewer, markerList);
  }, []);

  const mediaStreamConstraints = {
    video: true,
  };
  interface FlyToPositionProps {
    position: {
      longitude: number;
      latitude: number;
      altitude: number;
    };
    duration: number;
    cameraHeight?: number;
    flightCompleteCallback?: () => void;
  }
  // const getStreaming = () => {
  //   let source;
  //   let aaad = navigator.mediaDevices
  //     .getUserMedia(mediaStreamConstraints)
  //     .then((mediaStream) => {
  //       const videoEle = document.getElementById("video") as HTMLVideoElement;
  //       if (!videoEle) return;
  //       videoEle.srcObject = mediaStream;
  //       source = mediaStream;
  //     });
  //   return source;
  // };
  interface BasicResponseProps {
    executionSucceed: boolean;
    message: string;
  }
  const flyToPosition = (
    props: FlyToPositionProps,
    camera: Cesium.Camera
  ): BasicResponseProps => {
    try {
      const up =
        props.cameraHeight && props.cameraHeight > 0
          ? props.cameraHeight
          : 2000;
      const position = Cesium.Cartesian3.fromDegrees(
        props.position.longitude,
        props.position.latitude - up * 0.000013,
        props.position.altitude + up
      );

      if (camera && position) {
        camera.flyTo({
          destination: position,
          duration: props.duration | 2.8,
          orientation: {},
          complete: props.flightCompleteCallback,
        });
      }
      return { executionSucceed: true, message: "" };
    } catch (error) {
      return { executionSucceed: false, message: error as string };
    }
  };
  const createRectLocation = (siteItem: { lng: number; lat: number }) => {
    return Cesium.Rectangle.fromDegrees(
      siteItem.lng,
      siteItem.lat,
      siteItem.lng + 16,
      siteItem.lat + 9
    );
  };
  function addBillboardAndRectangle(viewer: Cesium.Viewer) {
    var videoElement = document.getElementById("video");
    let siteList = [
      { lng: 121.50952, lat: 25.03219 },
      { lng: 0.50952, lat: 15.03219 },
      { lng: 126.41767, lat: -23.87159 },
      { lng: -107.34737, lat: 42.38484 },
      { lng: -59.73641, lat: -9.06274 },
      { lng: 19.35759, lat: 50.33348 },
    ];
    siteList.forEach((siteItem) => {
      viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(siteItem.lng, siteItem.lat),
        rectangle: {
          coordinates: createRectLocation(siteItem),
          height: 0,
          material: videoElement as unknown as Cesium.MaterialProperty,
          outline: false,
        },
      });
    });
    viewer.entities.show = false;
  }
  const [show, setShow] = useState<boolean>(true);

  const [play, setPlay] = useState<boolean>(true);
  useEffect(() => {
    if (!viewerObj) return;
    viewerObj.entities.show = show;
  }, [show]);

  const toggleAnimation = () => {
    console.log('handlersRef.current', handlersRef.current)
    console.log('handlersRef.current?.autoRotation', handlersRef.current?.autoRotation)
    
    console.log('handlerInstance', handlerInstance)
    console.log('handlerInstance.autoRotation', handlerInstance.autoRotation)
    if(handlerInstance.autoRotation) {
      handlerInstance.autoRotation = false
      setPlay(false)
    } else {
      handlerInstance.autoRotation = true
      setPlay(true)
    }
  }
  return (
    <div className="marker_demo">
      {/* <button
        style={{ position: "fixed", top: "0px", right: "100px", zIndex: 10 }}
        onClick={() => toggleAnimation()}
      >
        開關
      </button> */}

      <div
        className={`switch_btn animation_toggle ${windowWidth <= 800 ? "small" : ""}`}
        onClick={() => toggleAnimation()}
      >
        <div className="switch_btn_inner"></div>
        <div className="switch_btn_bg">
          <div className={`switch_btn_bg_middle ${play? "" : "current_animation"}`}>
            <div className="switch_btn_bg_inner">
              {play && <div className={`right_text`}>stop</div>}
              {!play && <div className={`left_text`}>rotate</div>}
            </div>
          </div>
        </div>
      </div>
      <div
        className={`switch_btn right_switch_btn ${windowWidth <= 800 ? "small" : ""}`}
        onClick={() => setShow(!show)}
      >
        <div className="switch_btn_inner"></div>
        <div className="switch_btn_bg">
          <div className={`switch_btn_bg_middle ${show ? "current" : ""}`}>
            <div className="switch_btn_bg_inner">
              {!show && <div className={`left_text`}>hide</div>}
              {show && <div className={`right_text`}>video</div>}
            </div>
          </div>
        </div>
      </div>
      <video
        id="video"
        width="280"
        height="200"
        className="video_tag"
        crossOrigin="anonymous"
        preload="metadata"
        autoPlay={true}
        muted={true}
      >
        <source src="videoStream.mp4" type="video/mp4"></source>
      </video>
      <div
        id="cesiumContainer"
        className="fullSize"
        style={{
          width: "100%",
          height:
            windowWidth > 800
              ? windowHeight + "px"
              : scrollHeight
              ? scrollHeight + "px"
              : "100vh",
        }}
        ref={ele}
      ></div>
    </div>
  );
};
