import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useCallback } from "react";
import "./LineChart.postcss";
// import generateFakeDataYAxis from './../../tools/generateFakeDataYAxis'
import generateYAxis from "./../../tools/generateYAxis";
import getMaxAndMin from "./../../tools/getMaxAndMin";

// plugins.register(horizonalLinePlugin);
// ChartJS.pluginService.register(horizonalLinePlugin);

interface LineChartProps {
  labels: string[];
  dataList: {
    label: string; //數據名稱
    data: number[]; //個別數據陣列
    color: string; //折線顏色
  }[];
  maxSize: number | string; //圖表最大尺寸
  sizeDefine: string; //尺寸選擇絕對或相對單位
  padding: number; //內間距
  bgShow?: boolean; //背景顯示與否
  bgHalo?: boolean; //光暈顯示與否
  theme?: string; //主題 dark/light
}

export default (props: LineChartProps) => {
  const {
    labels,
    dataList,
    maxSize,
    sizeDefine,
    padding,
    bgShow,
    bgHalo,
    theme,
  } = props;
  // console.log('dataList', dataList)

  ChartJS.register(
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip
  );
  interface ChartOptions {
    scales: {
      y: { max: number; min: number } | {};
      x: { max: number; min: number } | {};
    };
    plugins: {
      [key: string]: boolean;
    };
    pointStyle: boolean | string;
    elements: {
      line: {
        tension: number;
      };
    };
  }
  const options: ChartOptions = {
    scales: {
      y: {
        max: Math.round(generateYAxis(getMaxAndMin(dataList)).max),
        min: Math.round(generateYAxis(getMaxAndMin(dataList)).min),
        grid: {
          color: "red",
          lineWidth: 1,
          display: false,
        },
        ticks: {
          color: "#ffffff75",
        },
      },
      x: {
        grid: {
          color: "false",
          lineWidth: 1,
          display: false,
        },
        ticks: {
          color: "#ffffff75",
        },
      },
    },
    plugins: {
      legend: true,
    },
    // pointRadius:3
    pointStyle: false,
    elements: {
      line: {
        tension: 0.3,
      },
    },
  };

  if (window.matchMedia("(prefers-color-scheme: light)").matches) {
    ChartJS.defaults.color = "#ffffff";
    ChartJS.defaults.borderColor = "#ffffff30";
  }

  const modifiedList = useCallback(() => {
    return dataList.map((item) => {
      return {
        borderColor: item.color,
        borderWidth: 1,
        data: item.data,
        label: item.label,
      };
    });
  }, [dataList]);

  const data = {
    labels,
    datasets: modifiedList(),
  };

  return (
    <div
      className="line_container"
      style={{
        width: `${sizeDefine === "absolute" ? maxSize + "px" : maxSize}`,
        height: `${
          sizeDefine === "absolute"
            ? (maxSize as number) * 0.55 + "px"
            : maxSize
        }`,
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
      <div className="inner_wrap">
        <Line options={options} data={data} />
        <div className="line_chart_bg"></div>
      </div>
    </div>
  );
};
