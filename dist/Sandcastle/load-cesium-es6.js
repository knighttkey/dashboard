// This file loads the unbuilt ES6 version of Cesium
// into the global scope during local developmnet
window.CESIUM_BASE_URL = "../../../Build/CesiumUnminified/";
import * as Cesium from "../../Build/CesiumUnminified/index.js";
window.Cesium = Cesium;

// Since ES6 modules have no guaranteed load order,
// only call startup if it's already defined but hasn't been called yet
// Also avoid calling startup on dojo-based examples which behave differently
if (
  !window.dojoConfig &&
  !window.startupCalled &&
  typeof window.startup === "function"
) {
  window.startup(Cesium);
}