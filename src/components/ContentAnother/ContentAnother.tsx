import "./ContentAnother.postcss";
import { useState } from "react";
import { faker } from "@faker-js/faker";
import LineChart from "./../LineChart";
import VerticalBarChart from "./../VerticalBarChart";
import HorizontalBarChart from "./../HorizontalBarChart";
import BubbleChart from "./../BubbleChart";
import SunBurst from "./../SunBurst";
import WeatherPanel from "./../WeatherPanel";
import Gauge from "../Gauge";
import newWeatherJson from "./../WeatherPanel/newWeather.json";
import { useWindowSize } from "usehooks-ts";
export default () => {
  const [currentTab, setCurrentTab] = useState<string>("Taipei");
  const tabList = ["Taipei", "London", "Tokyo"];
  const labelsList = ["01", "02", "03", "04", "05", "06", "07", "08"];
  const [gaugeAlertIndex, setGaugeAlertIndex] = useState<number[]>([0, 0, 0]);
  // console.log('gaugeAlertIndex', gaugeAlertIndex)
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const { width: windowWidth } = useWindowSize();

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
      label: "Red dataset",
      data: Array.from({ length: 50 }, () => ({
        x: faker.number.int({ min: -50, max: 50 }),
        y: faker.number.int({ min: -50, max: 50 }),
        r: faker.number.int({ min: 5, max: 20 }),
      })),
      backgroundColor: "#51e2ff50",
    },
    {
      label: "Blue dataset",
      data: Array.from({ length: 50 }, () => ({
        x: faker.number.int({ min: -100, max: 100 }),
        y: faker.number.int({ min: -100, max: 100 }),
        r: faker.number.int({ min: 5, max: 20 }),
      })),
      backgroundColor: "#5fffb950",
    },
  ];
  return (
    <div
      className={`content_another_container  ${
        windowWidth <= 800 ? "small_content" : ""
      }`}
    >
      <div className={`left`}>
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
            <div className="chart_title">Power Consumption</div>
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
            <div className="chart_title">Production</div>
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
            <div className="chart_title">Visitors</div>
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

      <div className="right">
        <div className="chart_area">
          <div className="each_chart">
            <WeatherPanel
              weather={newWeatherJson}
              cityName={currentTab}
            ></WeatherPanel>
          </div>
          <div
            className={`power_chart ${showAlert ? "alert" : ""}`}
            onClick={() => setShowAlert(!showAlert)}
          >
            <div className="power_title">
              Power <div className="tip">Click To Show Alert</div>
            </div>
            <div className="power_inner">
              <div className="each_gague">
                <Gauge
                  maxWidth={"140px"}
                  maxHeight="120px"
                  padding={0}
                  bgShow={false}
                  bgHalo={false}
                  theme="dark"
                  color="#51e2ff99"
                  setGaugeAlertIndex={setGaugeAlertIndex}
                  gaugeAlertIndex={gaugeAlertIndex}
                  index={0}
                />
              </div>
              <div className="each_gague">
                <Gauge
                  maxWidth={"140px"}
                  maxHeight="120px"
                  padding={0}
                  bgShow={false}
                  bgHalo={false}
                  theme="dark"
                  color="#ffb93799"
                  setGaugeAlertIndex={setGaugeAlertIndex}
                  gaugeAlertIndex={gaugeAlertIndex}
                  index={1}
                />
              </div>
              <div className="each_gague">
                <Gauge
                  maxWidth={"140px"}
                  maxHeight="120px"
                  padding={0}
                  bgShow={false}
                  bgHalo={false}
                  theme="dark"
                  color="#5fffb999"
                  setGaugeAlertIndex={setGaugeAlertIndex}
                  gaugeAlertIndex={gaugeAlertIndex}
                  index={2}
                />
              </div>
            </div>
          </div>
          <div className="each_chart sunburst_chart">
            <div className="chart_title">Equipment Type</div>
            <div className="sunburst_chart_inner">
              <SunBurst
                maxWidth={"400px"}
                maxHeight="320px"
                padding={0}
                bgShow={false}
                bgHalo={false}
                theme="dark"
              />
            </div>
          </div>
          <div className="each_chart horizontal">
            <div className="horizontal_chart">
              <div className="chart_title">Water Consumption</div>
              <HorizontalBarChart
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
          </div>
        </div>
      </div>
    </div>
  );
};
