import { useWindowSize } from "usehooks-ts";
import "./LineRace.postcss";
import { useRef, useCallback } from "react";
import * as echarts from "echarts";
import _rawData from './life-expectancy-table.json'
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

  function run(chart:any) {
    const countries = [
      'Finland',
      'France',
      'Germany',
      'Iceland',
      'Norway',
      'Poland',
      'Russia',
      'United Kingdom'
    ];
    const datasetWithFilters: echarts.DatasetComponentOption[] = [];
    const seriesList: echarts.SeriesOption[] = [];
    echarts.util.each(countries, function (country) {
      var datasetId = 'dataset_' + country;
      datasetWithFilters.push({
        id: datasetId,
        fromDatasetId: 'dataset_raw',
        transform: {
          type: 'filter',
          config: {
            and: [
              { dimension: 'Year', gte: 1950 },
              { dimension: 'Country', '=': country }
            ]
          }
        }
      });
      seriesList.push({
        type: 'line',
        datasetId: datasetId,
        showSymbol: false,
        name: country,
        endLabel: {
          show: false,
          formatter: function (params: any) {
            return params.value[3] + ': ' + params.value[0];
          },
          valueAnimation:true,
          distance:8
        },
        labelLayout: {
          moveOverlap: 'shiftY'
        },
        clip: true,
        emphasis: {
          focus: 'series',
          scale: true
        },
        encode: {
          x: 'Year',
          y: 'Income',
          label: ['Country', 'Income'],
          itemName: 'Year',
          tooltip: ['Income']
        }
      });
    });
  
    const option = {
      animationDuration: 10000,
      dataset: [
        {
          id: 'dataset_raw',
          source: _rawData
        },
        ...datasetWithFilters
      ],
      title: {
        text: 'Income of Germany and France since 1950',
        textStyle: {
          color:'#c7c7c7'
        },
        show: false
      },
      // textStyle: {
      //   fontStyle : {
      //     color:'red',
      //   }
      // },
      tooltip: {
        order: 'valueDesc',
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        nameLocation: 'middle'
      },
      yAxis: {
        name: 'Income',
        splitLine: {
          show:false
        }
      },
      grid: {
        right: 20,
        left:20,
        // top:20,
        bottom:20,
        borderColor:'#c7c7c7',
        borderWidth:0,
        show:false,
        containLabel: true
      },
      series: seriesList
    };
    

    return <>{chart.setOption(option) as unknown as HTMLCanvasElement}</>;
  }

  const renderChart = useCallback(() => {
    const chartDom = containerRef.current;
    let chart = echarts.getInstanceByDom(chartDom as HTMLDivElement);
    if (!chart) {
      chart = echarts.init(chartDom, null, {
        renderer: "canvas",
      });
    }
    chart.resize();
    setTimeout(() => {
      run(chart)
      
    }, 300);
  }, [windowWidth, _rawData]);

  return (
    <div
      className={`line_race_container`}
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
