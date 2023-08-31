# Radar Chart

## How to use

import

```typescript
import RadarChart from ‘./../../uikit/ui/RadarChart'
```
---
所需掛件
- chart.js
- react-chartjs-2
---
若未有明確數據，僅單純呈現圖表效果，而拷貝使用此範例的資料格式作為參數時，
則需另外安裝 **@faker-js/faker** （一般使用情況不需要此掛件）

---

參數定義

```typescript
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
```

---

資料格式範例

```typescript
import { faker } from '@faker-js/faker'
const labelsList = ['January', 'February', 'March', 'April', 'May', 'June', 'July']

const radarData = [
  {
    label: '# of Votes',
    data: labelsList.map(() => faker.number.int({ min: 1, max: 200})),
    backgroundColor: 'rgba(255, 99, 132, 0.2)',
    borderColor: 'rgba(255, 99, 132, 1)',
    borderWidth: 1,
  },
  {
    label: '# of Votes',
    data: labelsList.map(() => faker.number.int({ min: 1, max: 200 })),
    backgroundColor: 'rgba(55, 99, 232, 1)',
    borderColor: 'rgba(155, 199, 32, 1)',
    borderWidth: 1,
  },
]

```

---

```typescript
return (
  <RadarChart
    labels={labelsList}
    dataList={radarData}
    maxSize={500}
    padding={15}
    bgShow={true}
    bgHalo={true}
    theme="dark"
  />
)
```

---

Snapshot

![radarChart](./radarChart.png)
