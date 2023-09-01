import { useWindowSize } from "usehooks-ts";
import "./Gauge.postcss";
import { useRef, useCallback } from "react";
import * as echarts from "echarts";
import { faker } from "@faker-js/faker";
//@ts-ignore

type EChartsOption = echarts.EChartsOption;

interface Props {
  maxWidth: number | string; //圖表最大尺寸
  maxHeight: number | string; //圖表最大尺寸
  padding: number; //內間距
  bgShow?: boolean; //背景顯示與否
  bgHalo?: boolean; //光暈顯示與否
  theme?: string; //主題 dark/light
  color:string
}

export default (props: Props) => {
  const {
    maxWidth,
    maxHeight,
    padding,
    bgShow,
    bgHalo,
    theme,
    color
  } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  const innerWrapRef = useRef<HTMLDivElement>(null);
  const { width: windowWidth } = useWindowSize();

  const renderChart = useCallback(() => {
    const chartDom = containerRef.current;
    let chart = echarts.getInstanceByDom(chartDom as HTMLDivElement);
    if (!chart) {
      chart = echarts.init(chartDom, null, {
        renderer: "canvas",
      });
    }
    chart.resize();
    const option = {
      series: [
        {
          type: "gauge",
          center: ["50%", "50%"],
          startAngle: 200,
          endAngle: -20,
          min: 0,
          max: 60,
          splitNumber: 12,
          itemStyle: {
            color: color,
          },
          progress: {
            show: true,
            width: 12,
          },

          pointer: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              width: 12,
            },
          },
          axisTick: {
            distance: 0,
            splitNumber: 5,
            lineStyle: {
              width: 2,
              color: "transparent",
            },
          },
          splitLine: {
            distance: -20,
            length: 0,
            lineStyle: {
              width: 2,
              color: "transparent",
            },
          },
          axisLabel: {
            distance: 0,
            color: "transparent",
            fontSize: 18,
            display: false,
          },
          anchor: {
            show: false,
          },
          title: {
            show: false,
          },
          detail: {
            valueAnimation: true,
            width: "60%",
            lineHeight: 0,
            borderRadius: 8,
            offsetCenter: [0, "-10%"],
            fontSize: 14,
            fontWeight: "bolder",
            formatter: "{value} kw",
            color: "inherit",
          },
          data: [
            {
              value: faker.number.int({ min: 5, max: 55 }),
            },
          ],
        },

        {
          type: "gauge",
          center: ["50%", "60%"],
          startAngle: 200,
          endAngle: -20,
          min: 0,
          max: 60,
          itemStyle: {
            color: "#5fffb9",
          },
          progress: {
            show: false,
            width: 8,
          },

          pointer: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          detail: {
            show: false,
          },
          data: [
            {
              value: 15,
            },
          ],
        },
      ],
    };

    return <>{chart.setOption(option) as unknown as HTMLCanvasElement}</>;
  }, [windowWidth]);

  return (
    <div
      className={`gauge_container`}
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
