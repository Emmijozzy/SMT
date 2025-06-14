import { Outlet } from "react-router-dom";
import Notifications from "../../features/notification/Notifications";
import { useNotification } from "../../features/notification/hooks/useNotification";
import HeadNavbar from "./headNavbar/HeadNavbar";

function Main() {
  const { notifications, handleDeleteNotification } = useNotification();

  // const notifications = [];

  return (
    <main className="relative py-4 xl:pl-[15rem] transition w-full">
      <HeadNavbar notifications={notifications} />
      <div className="w-full min-w-[350px] max-w-[92rem] mx-auto h-calc-half-vh overflow-auto rounded-lg bg-base-200 px-2 scrollbar-thin scrollbar-thumb-base-content/30 scrollbar-track-base-300 scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
        <Notifications notifications={notifications} onDeleteNotification={handleDeleteNotification} />
        <Outlet />
      </div>
    </main>  );
}
export default Main;
