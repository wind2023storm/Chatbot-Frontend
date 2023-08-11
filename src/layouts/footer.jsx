import { useEffect } from "react";
import AOS from "aos";

const Footer = () => {
  useEffect(() => {
    AOS.init();
  });

  return <div className="w-full bg-white "></div>;
};

export default Footer;
