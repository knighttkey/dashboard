import { useWindowSize } from "usehooks-ts";
import "./SunBurst.postcss";
import { useRef, useCallback } from "react";
import * as echarts from "echarts";
//@ts-ignore

type EChartsOption = echarts.EChartsOption;

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
    var data = [
      {
        name: 'Grandpa',
        children: [
          {
            name: 'Uncle Leo',
            value: 15,
            children: [
              {
                name: 'Cousin Jack',
                value: 2
              },
              {
                name: 'Cousin Mary',
                value: 5,
                children: [
                  {
                    name: 'Jackson',
                    value: 2
                  }
                ]
              },
              {
                name: 'Cousin Ben',
                value: 4
              }
            ]
          },
          {
            name: 'Father',
            value: 10,
            children: [
              {
                name: 'Me',
                value: 5
              },
              {
                name: 'Brother Peter',
                value: 1
              }
            ]
          }
        ]
      },
      {
        name: 'Nancy',
        children: [
          {
            name: 'Uncle Nike',
            children: [
              {
                name: 'Cousin Betty',
                value: 1
              },
              {
                name: 'Cousin Jenny',
                value: 2
              }
            ]
          }
        ]
      }
    ];
    
    const option = {
      series: {
        type: 'sunburst',
        data: data,
        radius: [50, '100%'],
        position:['center', 'center'],
        itemStyle: {
          borderRadius: 3,
          borderWidth: 1,
          borderColor:'#333'
        },
        label: {
          show: false
        }
      },
      // color: ['#51e2ff', '#5fffb9', '#ffb937']
    };

    return <>{chart.setOption(option) as unknown as HTMLCanvasElement}</>;
  }, [windowWidth]);

  return (
    <div
      className={`sun_burst_container`}
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
