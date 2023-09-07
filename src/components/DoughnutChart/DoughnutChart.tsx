import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import './DoughnutChart.postcss'

interface DoughnutChartProps {
  labels: string[]
  dataList: {
    label: string //數據名稱
    data: number[] //個別數據陣列
    backgroundColor: string[] //各個數據的背景色
    borderColor: string[] //各個數據的邊框顏色
    borderWidth: number //邊框寬度
  }[]
  maxSize: number | string; //圖表最大尺寸
  sizeDefine: string; //尺寸選擇絕對或相對單位
  padding: number //內間距
  bgShow?: boolean //背景顯示與否
  bgHalo?: boolean //光暈顯示與否
  theme?: string //主題 dark/light
}

ChartJS.register(ArcElement, Tooltip, Legend)

export default (props: DoughnutChartProps) => {
  const { labels, dataList, maxSize,sizeDefine,  padding, bgShow, bgHalo, theme } = props
  const data = {
    labels,
    datasets: dataList,
  }

  const options = {
    plugins: {
      datalabels: {
        formatter: (value: number) => {
          return value + "%";
        }
      }
    }
  }
  return (
    <div
      className="doughnut_chart_container"
      style={{
        width: `${sizeDefine === "absolute" ? maxSize + "px" : maxSize}`,
        height: `${sizeDefine === "absolute" ? maxSize + "px" : maxSize}`,
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
        <Doughnut options={options as any} data={data} />
        <div className="chart_bg"></div>
      </div>
    </div>
  )
}