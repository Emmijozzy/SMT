/* eslint-disable indent */
import { useClickOutside } from "@mantine/hooks";
import PeopleIcon from "@mui/icons-material/People";
import TaskIcon from "@mui/icons-material/Task";
import { useRef } from "react";
import { FaTasks } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as uuid from "uuid";
import { RootState } from "../../app/store";
import {
  selectShowNotifications,
  setShowNotifications,
  setShowNotificationsFalse,
} from "../../layout/components/headNavbar/Slice/NotificationSlice";
import User from "../../shared/components/User";
import { formatNotificationTime } from "../../shared/utils/formatNotificationTime";
import useRole from "../users/hooks/useRole";
import { INotification, NotificationResourceType } from "./notificationInterface";

type Props = {
  notifications: INotification[];
  onDeleteNotification: (notificationId: string) => Promise<void>;
};
function Notifications({ notifications, onDeleteNotification }: Props) {
  const showNotifications = useSelector((state: RootState) => selectShowNotifications(state));
  const dispatch = useDispatch();

  const role = useRole();

  // const notifications: INotification[] = dummyNotifications;
  const timeoutRef = useRef<number>();

  const notificationRef = useClickOutside(() => {
    // console.log("clicked outside");
    if (showNotifications) {
      timeoutRef.current = window.setTimeout(() => {
        dispatch(setShowNotificationsFalse());
      }, 400);
    }

    if (timeoutRef.current && !showNotifications) {
      clearTimeout(timeoutRef.current);
    }
  });

  const getPath = (resourceType: NotificationResourceType, id: string) => {
    switch (resourceType.toLowerCase()) {
      case "task":
        return `/tasks/${id}`;
      case "subtask":
        return `/subtasks/subtask/${id}`;
      default:
        return "/";
    }
  };

  return (
    // Add these styling improvements to the main container
    <div
      ref={notificationRef}
      className={`absolute w-full md:w-96 border-[1px] border-base-content/5 bg-base-200 rounded-lg shadow-lg z-[99999] right-0 md:right-1 max-h-[80vh] transition-all ${showNotifications ? "translate-x-0" : "translate-x-full"}`}
    >
      {/* Enhanced header styling */}
      <div className="flex items-center justify-between border-b-[1px] border-base-content/5 p-4 bg-base-300">
        <h6 className="h6 font-semibold text-lg">Notifications</h6>
        <button
          type="button"
          aria-label="Cancle notification"
          className="btn btn-sm btn-ghost"
          onClick={() => dispatch(setShowNotifications())}
        >
          <GiCancel className="text-xl" />
        </button>
      </div>
      {/* Improved notification item styling */}
      <ul className="w-full max-h-[calc(100vh-155px)]  overflow-y-auto">
        {notifications.map((notification: INotification) => (
          <li key={uuid.v4()} className="w-full hover:bg-base-300 transition-colors duration-200">
            <div className="w-full flex justify-between bg-base-100 rounded-lg p-4 mt-1 hover:shadow-md transition-all duration-200">
              {/* Enhanced icon container */}
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 shadow-sm">
                {/* Keep existing icon logic */}
                {notification.resourceType === NotificationResourceType.Subtask && <FaTasks className="text-2xl" />}
                {notification.resourceType === NotificationResourceType.Task && <TaskIcon className="text-2xl" />}
                {notification.resourceType === NotificationResourceType.User && <PeopleIcon className="text-2xl" />}
              </div>

              {/* Improved text content layout */}
              <Link
                to={`/${role!}/dash${getPath(notification.resourceType, notification.resourceId)}`}
                className="w-full block"
              >
                <div className="flex flex-col flex-1 ml-4">
                  <p className="text-sm font-bold mb-1 text-primary">{notification.title}</p>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <User
                        className="text-xs text-base-content/70"
                        avaterClassName="w-[23px] h-[23px] text-xs"
                        userId={
                          notification.senderId?.[0]?.toUpperCase() || notification.senderId?.[1]?.toUpperCase() || ""
                        }
                        index={0}
                        withName
                      />
                      <p className="text-xs text-base-content/60 mt-1 line-clamp-2">{notification.message}</p>
                    </div>
                    <span className="text-xs text-base-content/40 ml-2 mt-1">
                      {formatNotificationTime(notification.createdAt)}
                    </span>
                  </div>
                </div>
              </Link>

              {/* Improved dismiss button */}
              <button
                type="button"
                aria-label="Dismiss notification"
                className="ml-2 p-2 hover:bg-error/10 rounded-full transition-colors duration-200 z-10"
                onClick={(e) => {
                  e.preventDefault();
                  onDeleteNotification(notification.notificationId).finally(() => {});
                }}
              >
                <GiCancel className="hover:text-error transition-colors duration-200 -mt-2" />
              </button>
            </div>
          </li>
        ))}{" "}
      </ul>{" "}
    </div>
  );
}

export default Notifications;
