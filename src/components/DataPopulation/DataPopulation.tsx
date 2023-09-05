import "./DataPopulation.postcss";
import { useWindowSize } from "usehooks-ts";
import { useMemo } from "react";
const DataSource = (props: any) => {
  const { scrollHeight } = props;
  const { height: windowHeight, width: windowWidth } = useWindowSize();
  const renderIframe = useMemo(() => {
    return (
      <div className="data_source_container">
        <iframe
          src="poc/Custom DataSource.html"
          width="100%"
          style={{
            width: "100%",
            height:
              windowWidth > 800
                ? windowHeight + "px"
                : scrollHeight
                ? scrollHeight + "px"
                : "100vh",
          }}
        ></iframe>
      </div>
    );
  }, [windowWidth]);

  return renderIframe;
};

export default DataSource;
