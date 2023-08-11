import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import AOS from "aos";

import { MdRoute } from "react-icons/md";
import { RiMagicLine } from "react-icons/ri";
import { BiBookmark, BiDockLeft } from "react-icons/bi";
import { PiUserSquareBold } from "react-icons/pi";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";

const menus = [
  {
    text: "Course Previews",
    link: "/course",
    icon: <MdRoute className="w-6 h-6" />,
    key: "course",
  },
  {
    text: "Personal AI",
    link: "/personal",
    icon: <RiMagicLine className="w-6 h-6" />,
    key: "personal",
  },
  {
    text: "Dashboard",
    link: "/dashboard",
    icon: <BiBookmark className="w-6 h-6" />,
    key: "dashboard",
  },
  {
    text: "Profile",
    link: "/profile",
    icon: <PiUserSquareBold className="w-6 h-6" />,
    key: "profile",
  },
];

const Menus = () => {
  const location = useLocation();
  const [dockState, setDockState] = useState(false);

  useEffect(() => {
    AOS.init();
  });

  return (
    <div
      className={`flex h-[calc(100vh-80px)] pb-0 flex-col justify-between items-center bg-[#1E1E1E] ${
        dockState ? "w-auto" : "display:w-[313px] w-auto"
      }`}
    >
      <List className="!flex !flex-col !items-start !self-stretch !w-full ">
        <div className="flex h-3 items-center gap-[6px] self-stretch"></div>
        {menus.map((element) => (
          <Link to={element.link} key={element.text} className="w-full">
            <ListItem disablePadding className="!w-full ">
              <ListItemButton
                className={` !w-full !cursor-pointer !flex display:!px-[35px] tablet:!px-[24px] phone:!px-[12px] !px-[6px] !py-[18px] !items-center !gap-2 !self-stretch hover:!text-white/75 ${
                  location.pathname.includes(element.key)
                    ? " !text-white"
                    : "!text-white/50"
                }`}
              >
                {element.icon}
                <p
                  className={`font-[Inter] text-[17px] font-semibold leading-normal ${
                    dockState ? "hidden" : "flex"
                  }`}
                >
                  {element.text}
                </p>
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <div
        className={`cursor-pointer flex display:px-[35px] tablet:px-[24px] phone:px-[12px] px-[6px] py-[18px] items-center gap-2 self-stretch hover:text-white/75 text-white/50`}
        onClick={() => {
          setDockState(!dockState);
        }}
      >
        <BiDockLeft className="w-6 h-6" />
        <p
          className={`font-[Inter] text-[17px] font-semibold leading-normal ${
            dockState ? "hidden" : "flex"
          }`}
        >
          Collapse Sidebar
        </p>
      </div>
    </div>
  );
};

export default Menus;
