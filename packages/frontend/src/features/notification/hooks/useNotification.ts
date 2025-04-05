import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { ResApiData } from "../../../shared/interface/resApiData";
import generateId from "../../../shared/utils/generateId";
import log from "../../../shared/utils/log";
import { addAlert } from "../../alerts/AlertSlice";
import { setLoader } from "../../loading/loaderSlice";
import { getPresentUser } from "../../profile/userProfileSlice";
import { IUser } from "../../users/userInterface";
import { useDeleteNotificationMutation, useGetNotificationsByRecipientIdQuery } from "../notificationApiSlice";
import { INotification } from "../notificationInterface";
import { useNotificationEvent } from "./useNotificationEvent";

export function useNotification() {
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [isDescending, setIsDescending] = useState<boolean>(true);

  const dispatch = useDispatch();
  const userProfile = useSelector((state: RootState) => getPresentUser(state)) as IUser;
  const { data, refetch } = useGetNotificationsByRecipientIdQuery(userProfile.userId, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });
  const [deleteNotification] = useDeleteNotificationMutation();
  const { newNotification, clearNewNotification } = useNotificationEvent();

  // Update notifications when data changes or new notifications arrive
  useEffect(() => {
    if (data && data.length > 0 && notifications.length === 0) {
      setNotifications(data);
      return;
    }

    if (newNotification && newNotification.length > 0) {
      setNotifications((prev) => [...newNotification, ...prev]);
      clearNewNotification();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, newNotification, clearNewNotification]);
  // Memoize sorted notifications to avoid unnecessary re-sorting
  const orderedNotifications = useMemo(() => {
    if (notifications.length === 0) return [];

    return [...notifications].sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return isDescending ? dateB - dateA : dateA - dateB;
    });
  }, [notifications, isDescending]);

  const handleDeleteNotification = useCallback(
    async (notificationId: string) => {
      try {
        dispatch(setLoader(true));
        const resData = (await deleteNotification(notificationId).unwrap()) as unknown as ResApiData<void>;
        if (resData.isSuccess) {
          setNotifications((prev) => prev.filter((notification) => notification.notificationId !== notificationId));
          dispatch(
            addAlert({
              id: generateId(),
              message: "Notification deleted successfully",
              type: "success",
            }),
          );
        } else if (resData.isError) {
          throw new Error(resData?.error?.data?.message || "Failed to delete notification");
        }
      } catch (err) {
        const error = err as Error;
        dispatch(
          addAlert({
            id: generateId(),
            message: error?.message || "Error deleting notification",
            type: "error",
          }),
        );
        log("error", "Error deleting notification", error?.message);
        await refetch();
      } finally {
        dispatch(setLoader(false));
      }
    },
    [deleteNotification, dispatch, refetch],
  );

  return {
    notifications: orderedNotifications,
    order: isDescending,
    setOrder: setIsDescending,
    handleDeleteNotification,
  };
}
