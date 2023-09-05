import "./AnotherLayout.postcss";
// import DataPopulation from "./components/DataPopulation";
// import DataTransfer from "./components/DataTransfer";
import { useWindowSize } from "usehooks-ts";
import { useRef, useEffect, useState } from "react";
import ContentAnother from "./components/ContentAnother";
import DataSource from "./components/DataSource";
import Header from "./components/Header";

export default () => {
  const { width: windowWidth } = useWindowSize();
  const anotherRef = useRef<HTMLDivElement>(null);
  const [scrollHeight, setScrollHeight] = useState<number>(0);
  useEffect(() => {
    if (!anotherRef.current) return;
    setScrollHeight(anotherRef.current.scrollHeight);
    windowWidth;
  }, [anotherRef, windowWidth]);
  return (
    <div
      className={`another_container ${
        windowWidth <= 800 ? "small_container" : ""
      }`}
      ref={anotherRef}
    >
      {/* <DataPopulation scrollHeight={scrollHeight} /> */}
      <DataSource scrollHeight={scrollHeight}/>
      {/* <DataTransfer/> */}
      <Header />
      <ContentAnother />
      <></>
    </div>
  );
};
