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
import { Bar } from "react-chartjs-2";
import { useCallback } from "react";
import "./HorizontalBarChart.postcss";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip
);
interface HorizontalBarChartProps {
  labels: string[];
  dataList: {
    label: string; //數據名稱
    data: number[]; //個別數據陣列
    color: string; //長條底色
  }[];
  maxSize: number | string; //圖表最大尺寸
  sizeDefine: string; //尺寸選擇絕對或相對單位
  padding: number; //內間距
  bgShow?: boolean; //背景顯示與否
  bgHalo?: boolean; //光暈顯示與否
  theme?: string; //主題 dark/light
}

interface ChartOptions {
  scales: {
    y: { max: number; min: number } | {};
    x: { max: number; min: number } | {};
  };
  plugins: {
    [key: string]: boolean;
  };
  borderRadius: number;
  inflateAmount: number;
  indexAxis: string;
  elements: {
    bar: {
      borderWidth: number;
      innerHeight: number;
    };
  };
  responsive: boolean;
}
export default (props: HorizontalBarChartProps) => {
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
  // console.log('sizeDefine', sizeDefine)
  
  const options: ChartOptions = {
    indexAxis: "y" as const,
    elements: {
      bar: {
        borderWidth: 0,
        innerHeight: 10,
      },
    },
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        // max: Math.round(generateYAxis(getMaxAndMin(dataList)).max),
        // min: generateYAxis(getMaxAndMin(dataList)).min,
        grid: {
          display: false,
        },
        ticks: {
          color: "#ffffff75",
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#ffffff75",
        },
      },
    },
    plugins: {
      legend: false,
    },
    borderRadius: 2,
    inflateAmount: -1,
  };

  if (window.matchMedia("(prefers-color-scheme: light)").matches) {
    ChartJS.defaults.color = "#ffffff";
    ChartJS.defaults.borderColor = "#ffffff30";
  }

  const modifiedList = useCallback(() => {
    return dataList.map((item) => {
      return {
        backgroundColor: item.color,
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
      className="horizontal_bar_container"
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
        <Bar options={options as any} data={data} />
        <div className="bar_chart_bg"></div>
      </div>
    </div>
  );
};
