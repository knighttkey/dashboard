import "./Content.postcss";
import { useState } from "react";
import { faker } from "@faker-js/faker";
import LineChart from "./../LineChart";
import VerticalBarChart from "../VerticalBarChart";
import BubbleChart from "../BubbleChart";
export default () => {
  const [currentTab, setCurrentTab] = useState<string>("Day");

  const tabList = ["Day", "Week", "Month"];
  const labelsList = ["01", "02", "03", "04", "05", "06", "07", "08"];

  const lineChartData1 = [
    {
      label: "Dataset 1",
      color: "#51e2ff",
      data: labelsList.map(() => faker.number.int({ min: 0, max: 100 })),
    },
    {
      label: "Dataset 2",
      color: "#5fffb9",
      data: labelsList.map(() => faker.number.int({ min: 0, max: 100 })),
    },
  ];
  const lineChartData2 = [
    {
      label: "Dataset 1",
      color: "#51e2ff80",
      data: labelsList.map(() => faker.number.int({ min: 0, max: 100 })),
    },
    {
      label: "Dataset 2",
      color: "#5fffb980",
      data: labelsList.map(() => faker.number.int({ min: 0, max: 100 })),
    },
  ];

const bubbleData = [
  {
    label: 'Red dataset',
    data: Array.from({ length: 50 }, () => ({
      x: faker.number.int({ min: -50, max: 50 }),
      y: faker.number.int({ min: -50, max: 50 }),
      r: faker.number.int({ min: 5, max: 20 }),
    })),
    backgroundColor: "#51e2ff50",
  },
  {
    label: 'Blue dataset',
    data: Array.from({ length: 50 }, () => ({
      x: faker.number.int({ min: -100, max: 100 }),
      y: faker.number.int({ min: -100, max: 100 }),
      r: faker.number.int({ min: 5, max: 20 }),
    })),
    backgroundColor: "#5fffb950",
  },
]
  return (
    <div className="content_container">
      <div className="left">
        <div className="switch_tab_row">
          {tabList.map((tabItem, tabIndex) => {
            return (
              <div
                className={`tab ${currentTab === tabItem ? "current" : ""}`}
                onClick={() => setCurrentTab(tabItem)}
                key={tabIndex}
              >
                {tabItem}
              </div>
            );
          })}
        </div>
        <div className="chart_area">
          <div className="each_chart">
            <LineChart
              labels={labelsList}
              dataList={lineChartData1}
              maxSize={"100%"}
              sizeDefine="relative"
              padding={0}
              bgShow={false}
              bgHalo={false}
              theme="dark"
            />
          </div>
          <div className="each_chart">
            <VerticalBarChart
              labels={labelsList}
              dataList={lineChartData2}
              maxSize={"100%"}
              sizeDefine="relative"
              padding={0}
              bgShow={false}
              bgHalo={false}
              theme="dark"
            />
          </div>
          <div className="each_chart">
          <BubbleChart
            dataList={bubbleData}
            maxSize={"100%"}
            sizeDefine="relative"
            padding={0}
            bgShow={false}
            bgHalo={false}
            theme="dark"
          />
          </div>
        </div>
      </div>
      <div className="center"></div>
      <div className="right"></div>
    </div>
  );
};
