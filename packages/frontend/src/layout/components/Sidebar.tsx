// type Props = {}

import { Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import NavItem from "./NavItem";
import { adminroutes } from "../../shared/constants";

function Sidebar() {
  const [openSidenav] = useState(false);

  return (
    <aside
      className={`${openSidenav ? "translate-x-0" : "-translate-x-80"} fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-60 rounded-xl transition-transform duration-300 xl:translate-x-0 border border-base-100 bg-base-200`}
    >
      <div className="relative flex items-center justify-center py-4 mb-2 overflow-hidden">
        <Link to="/" className="w-full text-center">
          <Typography variant="h4" className="text-base-content font-bold text-shadow">
            SMT
          </Typography>
        </Link>
      </div>
      <hr className="h-px bg-transparent bg-gradient-to-r from-transparent via-base-content/40 to-transparent" />
      <div className="m-4">
        <ul className="flex flex-col gap-1">
          {adminroutes.map((route) => (
            <li key={route.title} className="w-full mt-2 ">
              <NavItem title={route.title} path={route.path} Icon={route.icon} />
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
export default Sidebar;
