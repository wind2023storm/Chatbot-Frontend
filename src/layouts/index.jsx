import Header from "./header";
import Menus from "./menu";
import Footer from "./footer";
import { Outlet } from "react-router-dom";

const Index = () => {
  return (
    <div>
      <Header />
      <div className=" flex flex-row">
        <div className="">
          <Menus />
        </div>
        <div className=" flex-1">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Index;
