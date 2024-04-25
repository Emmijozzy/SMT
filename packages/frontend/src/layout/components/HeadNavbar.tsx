/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useState } from "react";
import { Link } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { Typography } from "@mui/material";
import Avartar from "./Avartar";
import Breadcrumbs from "./Breadcrumbs";

// type Props = {};

function HeadNavbar() {
  const [showAddNav, setAddNav] = useState(false);

  const handleAddNav = () => {
    setAddNav((pre) => !pre);
  };

  return (
    <div className="flex w-full h-[80px] items-center justify-between bg-base-200 px-4 rounded-lg">
      <div className="py-2 px-2 mb-2 ml-4  mr-8 xl:hidden">
        <Link to="/" className="w-full text-center ">
          <Typography variant="h4" className="text-base-content font-bold text-shadow ">
            SMT
          </Typography>
        </Link>
      </div>
      <Breadcrumbs />
      <div className="relative h-full flex items-center justify-between">
        <div className="h-10 w-[4ren] flex items-center bg-base-100 mr-2 rounded-lg border-none hover:border-2 hover:border-sky-50">
          <span className="ml-2">
            <SearchIcon className="my-2 text-base-content" />
          </span>
          <p className="text-base-content/40 mx-2">Search for Task ....</p>
        </div>
        <div className="indicator mr-5">
          <span className="w-6 h-6 absolute -top-3 -right-3 flex items-center justify-center bg-[red] border border-white rounded-full text-sm text-base-content">
            4
          </span>
          <NotificationsIcon className="" />
        </div>
        <div className="">
          <Avartar name="Ogunsui J" />
        </div>
        <div className=" ml-5 flex flex-col">
          <h6 className="h6">Ogunsuyi Joseph</h6>
          <p className="text-[0.65rem] leading-3 text-base-content/40 uppercase font-bold">Web Developer</p>
          <p className="text-[0.6rem] leading-3 text-base-content/40 uppercase">ogjo00001</p>
        </div>
        <span className="flex flex-col ml-5 gap-1 justify-end" onClick={() => handleAddNav()}>
          <KeyboardArrowDownIcon className="text-base-content" />
        </span>
        {showAddNav && (
          <ul className="absolute w-40 right-[2px] bottom-[-81%] text-base-content bg-base-100 p-2 rounded-lg transition-all">
            <li className="flex items-center justify-between hover:text-base-content/40">
              <p className="mr-3">Profile</p>
              <AccountBoxIcon />
            </li>
            <li className="flex items-center justify-between hover:text-base-content/40">
              <p className="mr-3">Settings</p>
              <SettingsIcon />
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
export default HeadNavbar;
