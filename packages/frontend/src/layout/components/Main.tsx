import { Outlet } from "react-router-dom";
import Notifications from "../../features/notification/Notifications";
import { useNotification } from "../../features/notification/hooks/useNotification";
import HeadNavbar from "./headNavbar/HeadNavbar";

function Main() {
  const { notifications, handleDeleteNotification } = useNotification();

  // const notifications = [];

  return (
    <main className="relative py-4 xl:ml-[17rem] transition w-full ">
      <HeadNavbar notifications={notifications} />
      <div className="w-full min-w-[350px] max-w-[90rem] mx-auto h-calc-half-vh overflow-auto rounded-lg px-4 bg-base-200  scrollbar-thin scrollbar-thumb-base-content/30 scrollbar-track-base-300 scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
        <Notifications notifications={notifications} onDeleteNotification={handleDeleteNotification} />
        <Outlet />
      </div>
    </main>
  );
}
export default Main;
