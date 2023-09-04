import "./Header.postcss";
import { useWindowSize } from "usehooks-ts";

export default () => {
  const { width: windowWidth } = useWindowSize();
  return (
    <div className={`header_container ${windowWidth <= 800? 'small_header': ''}`}>
      <div className="title">
        <div className="title_text">DTSOC Dashboard</div>
        <div className="title_bg">
          <div className="title_bg_middle">
            <div className="title_bg_inner"></div>

          </div>

        </div>
      </div>
    </div>
  );
};
