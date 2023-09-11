import "./ContentAnother.postcss";
import { useState, useMemo } from "react";
import { faker } from "@faker-js/faker";
import LineChart from "./../LineChart";
import VerticalBarChart from "./../VerticalBarChart";
import HorizontalBarChart from "./../HorizontalBarChart";
import BubbleChart from "./../BubbleChart";
// import SunBurst from "./../SunBurst";
import DoughnutChart from './../DoughnutChart'
// import LiquidFill from "./../LiquidFill";
import WeatherPanel from "./../WeatherPanel";
import Gauge from "../Gauge";
import newWeatherJson from "./../WeatherPanel/newWeather.json";
import { useWindowSize } from "usehooks-ts";
export default () => {
  const [currentTab, setCurrentTab] = useState<string>("Taipei");
  const tabList = ["Taipei", "London", "Tokyo"];
  const labelsList = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  const [gaugeAlertIndex, setGaugeAlertIndex] = useState<number[]>([0, 0, 0]);
  // console.log('gaugeAlertIndex', gaugeAlertIndex)
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const { width: windowWidth } = useWindowSize();

  const lineChartData1 = [
    {
      label: "1F",
      color: "#51e2ff",
      data: labelsList.map(() => faker.number.int({ min: 0, max: 100 })),
    },
    {
      label: "2F",
      color: "#5fffb9",
      data: labelsList.map(() => faker.number.int({ min: 0, max: 100 })),
    },
  ];
  const lineChartData2 = [
    {
      label: "1F",
      color: "#51e2ff80",
      data: labelsList.map(() => faker.number.int({ min: 0, max: 100 })),
    },
    {
      label: "2F",
      color: "#5fffb980",
      data: labelsList.map(() => faker.number.int({ min: 0, max: 100 })),
    },
  ];

  const bubbleData = [
    {
      label: "Male",
      data: Array.from({ length: 30 }, () => ({
        x: faker.number.int({ min: 10, max: 100 }),
        y: faker.number.int({ min: 12, max: 60 }),
        r: faker.number.int({ min: 2, max: 15 }),
      })),
      backgroundColor: "#51e2ff50",
    },
    {
      label: "Female",
      data: Array.from({ length: 30 }, () => ({
        x: faker.number.int({ min: 10, max: 100 }),
        y: faker.number.int({ min: 12, max: 60 }),
        r: faker.number.int({ min: 2, max: 15 }),
      })),
      backgroundColor: "#5fffb950",
    },
  ];
  const colors = [
    "#5ba9bc",
    "#31418f",
    "#EF4444",
    "#22C55E",
    "#D946EF",
    "#F59E0B",
    "#F97316",
    "#84CC16",
    "#16ccb4",
    "#e37da4",
  ];

  const getColorsLoop = (listLength: number) => {
    let colorList: string[] = [];
    while (listLength > colorList.length) {
      colorList = colorList.concat(colors);
    }
    return colorList;
  };
  const deviceTypeList = ['Air Conditioner', 'Light', 'Rack', 'Cameras', 'Monitors', 'Storage Disk', 'Others']
  const doughnutData = [
    {
      label: ' ',
      data: deviceTypeList.map(() => faker.number.int({ min: 0, max: 30 })),
      backgroundColor: getColorsLoop(deviceTypeList.length).map((colorItem)=>{return colorItem+'50'}),
      borderColor: getColorsLoop(deviceTypeList.length).map((colorItem)=>{return colorItem+'50'}),
      borderWidth: 1,
    },
  ];


  const renderLineChart = useMemo(() => {
    return (
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

    )
  }, [windowWidth]);
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
            {renderLineChart}
          </div>
          <div className="each_chart">
            <div className="chart_title">Water Consumption</div>
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
          {/* <div className="each_chart sunburst_chart">
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
          </div> */}
          <div className="each_chart sunburst_chart">
            <div className="chart_title">Device Type Ratio</div>
            <DoughnutChart
              labels={deviceTypeList}
              dataList={doughnutData}
              maxSize={'100%'}
              sizeDefine='relative'
              padding={15}
              bgShow={false}
              bgHalo={false}
              theme="dark"
            />
          </div>

          {/* <div className="each_chart liquid_fill">
            <div className="liquid_inner">
              <LiquidFill
                // maxWidth={centerWidth ? centerWidth/4 + "px" : "200px"}
                // maxHeight={centerWidth ? centerWidth/4 + "px" : "200px"}
                maxWidth={"200px"}
                maxHeight={"200px"}
                padding={0}
                bgShow={false}
                bgHalo={false}
                theme="dark"
                liquidValueList={[0.7, 0.55, 0.3]}
                shape="rect"
              ></LiquidFill>
            </div>
          </div> */}
          <div className="each_chart horizontal">
            <div className="horizontal_chart">
              <div className="chart_title">Production</div>
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
