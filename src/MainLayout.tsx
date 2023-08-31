import "./MainLayout.postcss";
import Header from "./components/Header";
import Content from "./components/Content";
export default () => {
  return (
    <div className="main_container">
      <Header />
      <Content />
    </div>
  );
};
