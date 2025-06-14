/* eslint-disable @typescript-eslint/no-misused-promises */
import { useClickOutside } from "@mantine/hooks";
import CloseIcon from "@mui/icons-material/Close";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../app/store";
import { getPresentUser } from "../../features/profile/userProfileSlice";
import useLogout from "../../shared/hooks/useLogout";
import { getUserNavItem } from "../../shared/utils/getUserNavItem";
import { setSidebar } from "../layoutSlice";
import NavItem from "./NavItem";

function Sidebar() {
  // const [openSidenav] = useState(false);
  const { handleLogOut } = useLogout();
  const dispatch = useDispatch();
  const openSidenav = useSelector((state: RootState) => state.layout.slideBar);
  const ref = useClickOutside(() => dispatch(setSidebar(false)));

  const userRole = useSelector((state: RootState) => getPresentUser(state)).role || "team_member";

  const navItems = getUserNavItem(userRole);

  const handleSidebar = () => {
    dispatch(setSidebar(false));
  };

  return (
    <aside
      ref={ref}
      className={`${openSidenav ? "-translate-x-0.25" : "-translate-x-80"} fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-30px)] w-56 rounded-r-xl transition-transform duration-300 xl:translate-x-0 border border-base-100 bg-base-200`}
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
          <p className="text-base-content h4 font-bold text-shadow ">
            S<span className="text-[3rem]">T</span>M
          </p>
        </Link>
      </div>
      <hr className="h-px bg-transparent bg-gradient-to-r from-transparent via-base-content/40 to-transparent" />
      <div className="m-4  h-[calc(100%-120px)]">
        <ul className="flex flex-col gap-1 h-full">
          {navItems.map((route) => (
            <li key={route.title} className="w-full mt-2 ">
              <NavItem title={route.title} path={route.path} Icon={route.icon} />
            </li>
          ))}
          <li className="mt-auto">
            <button
              type="button"
              className="flex items-center justify-start whitespace-nowrap shadow-soft-xl gap-2.7 px-4 text-left rounded-lg my-0 py-2.7 capitlalize  "
              onClick={() => handleLogOut()}
            >
              <div className=" flex items-center justify-center w-8 h-8 rounded-lg shadow-md  xl:p-2.5">
                <LogoutIcon className="w-5 h-5 " />
              </div>
              <p className="font-sans leading-relaxed capitalize text-base-content">Logout</p>
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
}
export default Sidebar;
