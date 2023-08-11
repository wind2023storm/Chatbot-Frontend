import { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";

import Logo from "../assets/images/logo.svg";

const Header = () => {
  useEffect(() => {
    AOS.init();
  });

  return (
    <div className="w-full bg-white h-[80px] sticky top-0 z-50 flex px-[35px] justify-between items-center shrink-0 self-stretch">
      <div className=" flex items-center gap-4">
        <Link to="/">
          <img src={Logo} alt="logo" className=" w-auto" />
        </Link>
        <p>/</p>
        <p className="font-[Inter] text-black text-lg font-semibold leading-normal">
          Member Portal
        </p>
      </div>
      <div className=""></div>
    </div>
  );
};

export default Header;
