import { useWindowSize } from "usehooks-ts";
import "./LiquidFill.postcss";
import { useRef, useCallback } from "react";
import * as echarts from "echarts";
import "echarts-liquidfill";
//@ts-ignore

type EChartsOption = echarts.EChartsOption;

interface Props {
  maxWidth: number | string; //圖表最大尺寸
  maxHeight: number | string; //圖表最大尺寸
  padding: number; //內間距
  bgShow?: boolean; //背景顯示與否
  bgHalo?: boolean; //光暈顯示與否
  theme?: string; //主題 dark/light
  liquidValueList:number[]
  shape:string
}

export default (props: Props) => {
  const { maxWidth, maxHeight, padding, bgShow, bgHalo, theme, liquidValueList, shape } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  const innerWrapRef = useRef<HTMLDivElement>(null);
  const { width: windowWidth } = useWindowSize();

  const renderChart = useCallback(() => {
    const chartDom = containerRef.current;
    let chart = echarts.getInstanceByDom(chartDom as HTMLDivElement);
    if (!chart) {
      chart = echarts.init(chartDom, null, {
        renderer: "svg",
      });
    }
    chart.resize();
    const option = {
      // backgroundColor:'transparent',
      backgroundStyle: {
        color: "#333", //背景
      },
      series: [
        {
          type: "liquidFill",
          data: liquidValueList,
          label: {
            normal: {
              //fontSize:80    //这里也可以设置
              textStyle: {
                fontSize: 18, //修改字体大小
              },
            },
          },
          shape: shape,
          color: ["#294D9999", "#156ACF99", "#51e2ff99", "#5fffb999"],
          radius: "100%",
          outline: {
            show: false, //是否显示外圈线
            borderDistance: 8, //与外圈距离
            itemStyle: {
              color: "none",
              borderColor: "#294D99", //线的颜色，粗细，模糊程度，模糊颜色
              borderWidth: 8,
              shadowBlur: 20,
              shadowColor: "rgba(0, 0, 0, 0.25)",
            },
          },
          backgroundStyle: {
            color: "#51e2ff20", //背景
          },
          itemStyle: {
            opacity: 0.6, //透明度
            shadowBlur: 50,
            shadowColor: "rgba(0, 0, 0, 0.4)",
          },
          animationDuration: 6000,
          animationDurationUpdate: 1000,
        },
      ],
      tooltip: {
        show: true,
      },
    };

    return <>{chart.setOption(option) as unknown as HTMLCanvasElement}</>;
  }, [windowWidth]);

  return (
    <div
      className={`liquid_fill_container`}
      ref={containerRef}
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
        {containerRef?.current ? <>{renderChart()}</> : null}
      </div>
    </div>
  );
};
