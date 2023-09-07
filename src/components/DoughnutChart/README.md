# Doughnut Chart 

## How to use

import

```typescript
import DoughnutChart from ‘./../../uikit/ui/DoughnutChart'
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
interface DoughnutChartProps {
  labels: string[]
  dataList: {
    label: string //數據名稱
    data: number[] //個別數據陣列
    backgroundColor: string[] //各個數據的背景色
    borderColor: string[] //各個數據的邊框顏色
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
import getHexColor from './tools/getHexColor'
const labelsList = ['January', 'February', 'March', 'April', 'May', 'June', 'July']

const doughnutData = [
  {
    label: '# of Votes',
    data: labelsList.map(() => faker.number.int({ min: 0, max: 30 })),
    backgroundColor: labelsList.map(() => getHexColor() + '99'),
    borderColor: labelsList.map(() => getHexColor() + '99'),
    borderWidth: 1,
  },
]

```
---


```typescript
return (
  <DoughnutChart
    labels={labelsList}
    dataList={doughnutData}
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

![doughnutChart](./doughnutChart.png)