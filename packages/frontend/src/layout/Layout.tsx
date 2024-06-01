/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import Alerts from "../features/alerts/Alerts";
import SettingBar from "./components/SettingBar";
import { RootState } from "../app/store";

function Layout() {
  const theme = useSelector((state: RootState) => state.layout.themes);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);

    return () => {
      document.documentElement.removeAttribute("data-theme");
    };
  }, [theme]);

  return (
    <div className="relative overflow-hidden left-0 top-0 flex min-h-screen min-w-[100vw] bg-base-200">
      <Alerts />
      <Sidebar />
      <SettingBar />
      <Main />
    </div>
  );
}
export default Layout;
