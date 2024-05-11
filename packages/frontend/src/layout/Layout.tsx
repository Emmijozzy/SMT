import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import Alerts from "../features/alerts/Alerts";

function Layout() {
  return (
    <div className="relative overflow-hidden left-0 top-0 flex min-h-screen min-w-[100vw] bg-base-200">
      <Alerts />
      <Sidebar />
      <Main />
    </div>
  );
}
export default Layout;
