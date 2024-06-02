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
import { useDispatch, useSelector } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";
import { useClickOutside } from "@mantine/hooks";
import Avartar from "./Avartar";
import Breadcrumbs from "./Breadcrumbs";
import { RootState } from "../../app/store";
import { IUser } from "../../features/users/userInterface";
import { setSettingBar, setSidebar } from "../layoutSlice";

// type Props = {};

function HeadNavbar() {
  const [showAddNav, setAddNav] = useState(false);

  const userProfile = useSelector((state: RootState) => state.userProfile.userProfile) as IUser;
  const ref = useClickOutside(() => {
    console.log("ref");
    setAddNav(false);
  });
  const dispatch = useDispatch();

  // console.log(userProfile);

  const handleSidebar = () => {
    dispatch(setSidebar(true));
  };

  const handleSettingBar = () => {
    dispatch(setSettingBar(true));
  };

  const handleAddNav = () => {
    console.log("press");
    setAddNav((pre) => !pre);
  };

  return (
    <div className="w-full h-[80px] ml:px-4 flex items-center  bg-base-200  rounded-lg z-[99999] p-4">
      <button
        type="button"
        aria-label="Open Sidebar"
        onClick={() => handleSidebar()}
        className="h-full flex items-center mr-3 lg:hidden"
      >
        <MenuIcon className="h-14 w-14" />
      </button>
      <div className="h-full flex items-center md:px-4 mr-3 md:mr-8 xl:hidden">
        <Link to="/" className="w-full text-center ">
          <Typography variant="h4" className="text-base-content font-bold text-shadow ">
            S<span className="text-[3rem]">T</span>M
          </Typography>
        </Link>
      </div>
      <div className="hidden md:flex">
        <Breadcrumbs />
      </div>
      <div className="relative h-full flex items-center justify-between ml-auto ">
        <div className="h-10 w-[4ren] hidden lg:flex items-center bg-base-100 mr-2 rounded-lg border-none hover:border-2 hover:border-sky-50">
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
        <div className="">{userProfile.fullName && <Avartar name={userProfile.fullName} />}</div>
        <div className=" ml-5 hidden md:flex flex-col">
          {userProfile.fullName && <h6 className="h6 text-sm">{userProfile.fullName}</h6>}
          {
            /* userProfile.teamId && */ <p className="text-[0.65rem] leading-3 text-base-content/40 uppercase font-bold">
              Web Developer
            </p>
          }
          {userProfile.userId && (
            <p className="text-[0.6rem] leading-3 text-base-content/40 uppercase">{userProfile.userId}</p>
          )}
        </div>
        <div ref={ref} className="self-end mb-3">
          <span className="flex flex-col lg:ml-5 gap-1" onClick={() => handleAddNav()}>
            <KeyboardArrowDownIcon
              className={`text-base-content transition-all ${showAddNav ? "-rotate-90" : "rotate-0"}`}
            />
          </span>
          <div
            className={`absolute w-56 right-[0px] bottom-[-200%] text-base-content bg-base-100 p-2 rounded-lg transition-all translate-y-14 md:-translate-y-2 ${showAddNav ? "translate-x-[0%]" : "translate-x-[120%]"} z-20`}
          >
            <div className="flex flex-col md:hidden mb-2">
              {userProfile.fullName && <h6 className="h6 text-sm pb-1">{userProfile.fullName}</h6>}
              {
                /* userProfile.teamId && */ <p className="text-[0.65rem] leading-3 text-base-content/40 uppercase font-bold">
                  Web Developer
                </p>
              }
              {userProfile.userId && (
                <p className="text-[0.6rem] leading-3 text-base-content/40 uppercase mb-2">{userProfile.userId}</p>
              )}
              <hr className="h-px bg-transparent bg-base-content/40" />
            </div>
            <ul className="">
              <li className="">
                <Link to="/dash/profile" className="flex items-center justify-between hover:text-base-content/40">
                  <p className="mr-3">Profile</p>
                  <AccountBoxIcon />
                </Link>
              </li>
              <li className="hover:text-base-content/40">
                <button
                  type="button"
                  aria-label="Open Setting"
                  onClick={() => handleSettingBar()}
                  className="w-full flex justify-between mt-2"
                >
                  <p className="mr-3">Settings</p>
                  <SettingsIcon />
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
export default HeadNavbar;
