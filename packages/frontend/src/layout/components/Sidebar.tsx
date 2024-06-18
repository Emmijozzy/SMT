import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useClickOutside } from "@mantine/hooks";
import CloseIcon from "@mui/icons-material/Close";
import LoginSharpIcon from "@mui/icons-material/LoginSharp";
import NavItem from "./NavItem";
import { adminroutes } from "../../shared/constants";
import { RootState } from "../../app/store";
import { setSidebar } from "../layoutSlice";
import useLogout from "../../shared/hooks/useLogout";

function Sidebar() {
  // const [openSidenav] = useState(false);
  const { handleLogOut } = useLogout();
  const dispatch = useDispatch();
  const openSidenav = useSelector((state: RootState) => state.layout.slideBar);
  const ref = useClickOutside(() => dispatch(setSidebar(false)));

  const handleSidebar = () => {
    dispatch(setSidebar(false));
  };

  return (
    <aside
      ref={ref}
      className={`${openSidenav ? "-translate-x-0.25" : "-translate-x-80"} fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-30px)] w-60 rounded-r-xl transition-transform duration-300 xl:translate-x-0 border border-base-100 bg-base-200`}
    >
      <div className="relative flex items-center justify-center py-4 mb-2 overflow-hidden">
        <button
          type="button"
          aria-label="Close Sidebar"
          onClick={() => handleSidebar()}
          className="absolute right-0 top-0 p-2 xl:hidden"
        >
          <CloseIcon className="h-8 w-8 text-base-content" />
        </button>
        <Link to="/" className="w-full text-center">
          <Typography variant="h4" className="text-base-content font-bold text-shadow ">
            S<span className="text-[3rem]">T</span>M
          </Typography>
        </Link>
      </div>
      <hr className="h-px bg-transparent bg-gradient-to-r from-transparent via-base-content/40 to-transparent" />
      <div className="m-4  h-[calc(100%-120px)]">
        <ul className="flex flex-col gap-1 h-full">
          {adminroutes.map((route) => (
            <li key={route.title} className="w-full mt-2 ">
              <NavItem title={route.title} path={route.path} Icon={route.icon} />
            </li>
          ))}
          <li className="mt-auto">
            <NavItem title="logout" Icon={LoginSharpIcon} onClick={handleLogOut} />
          </li>
        </ul>
      </div>
    </aside>
  );
}
export default Sidebar;
