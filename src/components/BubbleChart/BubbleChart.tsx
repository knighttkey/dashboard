import { Chart as ChartJS, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js'
import { Bubble } from 'react-chartjs-2'
import './BubbleChart.postcss'

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend)

interface BubbleChartProps {
  dataList: {
    label: string //數據名稱
    data: { x: number; y: number; r: number }[] //個別數據陣列
    backgroundColor: string //圖形顏色
  }[]
  maxSize: number | string; //圖表最大尺寸
  sizeDefine: string; //尺寸選擇絕對或相對單位
  padding: number //內間距
  bgShow?: boolean //背景顯示與否
  bgHalo?: boolean //光暈顯示與否
  theme?: string //主題 dark/light
}
interface ChartOptions {
  scales: {
    y: { max: number; min: number } | {};
    x: { max: number; min: number } | {};
  };
  plugins: {
    [key: string]: boolean;
  };

}
export default (props: BubbleChartProps) => {
  const { dataList, maxSize,    sizeDefine, padding, bgShow, bgHalo, theme } = props
  const options:ChartOptions = {
    scales: {
      y: {
        // beginAtZero: true,
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
  }

  const data = {
    datasets: dataList,
  }

  return (
    <div
      className="bubble_container"
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
            ? theme === 'dark'
              ? 'linear-gradient(0deg, #00000070 0%, #00000000 100%)'
              : 'linear-gradient(0deg, #ffffff70 0%, transparent 100%)'
            : 'transparent'
        }`,
        filter: `${bgHalo ? 'drop-shadow(0px 0px 40px #86eefb99)' : 'unset'}`,
      }}
    >
      <div className="inner_wrap">
        <Bubble options={options} data={data} />
        <div className="chart_bg"></div>
      </div>
    </div>
  )
}
