import MainLayout from "./MainLayout";
import AnotherLayout from "./AnotherLayout";
import { useState } from "react";
import { useWindowSize } from "usehooks-ts";
export default () => {
  const [currentPage, setCurrentPage] = useState<string>("gis");
  const { width: windowWidth } = useWindowSize();
  return (
    <>
      <div
        className={`switch_btn ${windowWidth <= 800 ? 'small':''}`}
        onClick={() => setCurrentPage(currentPage === "gis" ? "chart" : "gis")}
      >
        <div className="switch_btn_inner"></div>
        <div className="switch_btn_bg">
          <div
            className={`switch_btn_bg_middle ${
              currentPage === "gis" ? "current" : ""
            }`}
          >
            <div className="switch_btn_bg_inner">
              {currentPage === "gis" && <div className={`left_text`}>gis</div>}
              {currentPage === "chart" && (
                <div className={`right_text`}>chart</div>
              )}
            </div>
          </div>
        </div>
      </div>
      {currentPage === "chart" ? <MainLayout /> : null}
      {currentPage === "gis" ? <AnotherLayout /> : null}
    </>
  );
};
