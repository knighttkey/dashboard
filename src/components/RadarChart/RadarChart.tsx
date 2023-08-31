import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js'
import { Radar } from 'react-chartjs-2';
import './RadarChart.postcss'

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
)
interface RadarChartProps {
  labels:string[]
  dataList: {
    label: string //數據名稱
    data: number[] //個別數據陣列
    backgroundColor: string //圖形顏色
    borderColor: string //邊框顏色
    borderWidth: number //邊框寬度
  }[]
  maxSize: number //圖表最大尺寸
  padding: number //內間距
  bgShow?: boolean //背景顯示與否
  bgHalo?: boolean //光暈顯示與否
  theme?: string //主題 dark/light
}

export default (props: RadarChartProps) => {
  const { labels, dataList, maxSize, padding, bgShow, bgHalo, theme } = props

  const data = {
    labels:labels,
    datasets: dataList,
  }
  return (
    <div
      className="radar_container"
      style={{
        width: `${maxSize}px`,
        height: `${maxSize}px`,
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
        <Radar data={data} />

        <div className="chart_bg"></div>
      </div>
    </div>
  )
}
