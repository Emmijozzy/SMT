import NotificationsIcon from "@mui/icons-material/Notifications";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../app/store";
import { selectShowNotifications, setShowNotifications } from "../Slice/NotificationSlice";

interface NotificationBadgeProps {
  count: number;
  // onNotificationClick: () => void;
}

export function NotificationBadge({ count }: NotificationBadgeProps) {
  const showNotifications = useSelector((state: RootState) => selectShowNotifications(state));
  const dispatch = useDispatch();
  return (
    <div className="indicator mx-5">
      <button
        type="button"
        onClick={() => dispatch(setShowNotifications())}
        className={`indicator-item w-10 h-10 rounded-full transition-all ${showNotifications ? "bg-secondary" : "bg-base-100"}`}
      >
        <span className="w-5 h-5 absolute -top-1 -right-0 flex items-center justify-center bg-[red] border border-white rounded-full text-sm text-base-content">
          {count}
        </span>
        <NotificationsIcon />
      </button>
    </div>
  );
}
