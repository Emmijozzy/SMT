import { SettingsIcon } from "lucide-react";
// import SettingsIcon from "@mui/icons-material/Settings";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { forwardRef } from "react";
import { Link } from "react-router-dom";
import { IUser } from "../../../../features/users/userInterface";
import { UserProfileMobile } from "./UserProfileMobile";

interface NavDropdownProps {
  show: boolean;
  onToggle: () => void;
  onSettingClick: () => void;
  user: Partial<IUser>;
}

export const NavDropdown = forwardRef<HTMLDivElement, NavDropdownProps>(
  ({ show, onToggle, onSettingClick, user }, ref) => (
    <div ref={ref} className="self-end mb-3">
      <button
        className="flex flex-col lg:ml-2 gap-1"
        onClick={onToggle}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            onToggle();
          }
        }}
        type="button"
        aria-label="Toggle dropdown"
      >
        <KeyboardArrowDownIcon className={`text-base-content transition-all ${show ? "-rotate-90" : "rotate-0"}`} />
      </button>
      <div
        className={`absolute w-56 right-[0px] bottom-[-200%] text-base-content bg-base-100 p-2 rounded-lg transition-all translate-y-14 md:-translate-y-2 ${show ? "translate-x-[0%]" : "translate-x-[120%]"} z-20`}
      >
        <UserProfileMobile user={user} />
        <ul>
          <li>
            <Link to="profile" className="flex items-center justify-between hover:text-base-content/40">
              <p className="mr-3">Profile</p>
              <AccountBoxIcon />
            </Link>
          </li>
          <li className="hover:text-base-content/40">
            <button
              type="button"
              aria-label="Open Setting"
              onClick={onSettingClick}
              className="w-full flex justify-between mt-2"
            >
              <p className="mr-3">Settings</p>
              <SettingsIcon />
            </button>
          </li>
        </ul>
      </div>
    </div>
  ),
);
