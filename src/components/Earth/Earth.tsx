import { useWindowSize } from "usehooks-ts";
import "./Earth.postcss";
import { useRef, useCallback } from "react";
import * as echarts from "echarts";
import { CanvasRenderer } from "echarts/renderers";
//@ts-ignore
import { GlobeComponent } from "echarts-gl/components";
echarts.use([GlobeComponent, CanvasRenderer]);
// import earthBg from "./../../assets/earth.jpg";
// import bathyMetry from "./../../assets/bathymetry_bw_composite_4k.jpg";
// import starfield from "./../../assets/starfield.jpg";
import night from "./../../assets/night.png";
// import clouds from "./../../assets/clouds.png";

interface Props {
  maxWidth: number | string; //圖表最大尺寸
  maxHeight: number | string; //圖表最大尺寸
  padding: number; //內間距
  bgShow?: boolean; //背景顯示與否
  bgHalo?: boolean; //光暈顯示與否
  theme?: string; //主題 dark/light
}

export default (props: Props) => {
  const {
    maxWidth,
    maxHeight,
    padding,
    bgShow,
    bgHalo,
    theme,
  } = props;
  const earthConRef = useRef<HTMLDivElement>(null);
  const innerWrapRef = useRef<HTMLDivElement>(null);
  const { width: windowWidth } = useWindowSize();

  const renderEarth = useCallback(() => {
    const chartDom = earthConRef.current;
    let earthChart = echarts.getInstanceByDom(chartDom as HTMLDivElement);
    if (!earthChart) {
      earthChart = echarts.init(chartDom, null, {
        renderer: "canvas",
      });
    }
    earthChart.resize();
    const option = {
      backgroundColor: "#000",
      globe: {
        baseTexture: night,
        // heightTexture: bathyMetry,
        displacementScale: 0.1,
        shading: "lambert",
        // environment: starfield,
        environment: "#242424",
        stateAnimation: {
          duration: 10000,
          easing: "cubicOut",
        },
        animation: "auto",
        light: {
          ambient: {
            intensity: 0.1,
          },
          main: {
            intensity: 1.5,
          },
        },
        layers: [
          {
            type: "overlay",
            blendTo: "emission",
            texture: night,
          },
          // {
          //   type: 'overlay',
          //   texture: 'red',
          //   shading: 'lambert',
          //   distance: 0
          // }
        ],
      },
      series: [],
    };

    return <>{earthChart.setOption(option) as unknown as HTMLCanvasElement}</>;
  }, [windowWidth]);

  return (
    <div
      className={`earth_container`}
      ref={earthConRef}
      style={{
        width: `${maxWidth}`,
        height: `${maxHeight}`,
        padding: `${padding}px`,
        background: `${
          bgShow
            ? theme === "dark"
              ? "linear-gradient(0deg, #00000070 0%, #00000000 100%)"
              : "linear-gradient(0deg, #ffffff70 0%, transparent 100%)"
            : "transparent"
        }`,
        filter: `${bgHalo ? "drop-shadow(0px 0px 40px #86eefb99)" : "unset"}`,
      }}
    >
      <div className="inner_wrap" ref={innerWrapRef}>
        {earthConRef?.current ? <>{renderEarth()}</> : null}
      </div>
    </div>
  );
};
