import { useEffect, useState } from "react";
import log from "../../../shared/utils/log";
import socketService from "../../socketEvents/SocketService";
import { INotification } from "../notificationInterface";

export const useNotificationEvent = () => {
  const [newNotification, setNewNotification] = useState<INotification[]>([]);

  useEffect(() => {
    const socket = socketService.getSocket();

    if (!socket) {
      log("error", "Socket not connected when trying to listen to subtask:created events", "useSubtaskCreatedEvent");
    }

    const handleNewNotification = (notification: INotification) => {
      log("info", "New notification received", "useNotificationEvent");
      setNewNotification((prevNotifications) => [...prevNotifications, notification]);
    };

    socket?.on("newNotification", handleNewNotification);
    return () => {
      socket?.off("newNotification", handleNewNotification);
    };
  }, []);

  const clearNewNotification = () => {
    setNewNotification([]);
  };

  return {
    newNotification,
    clearNewNotification,
  };
};
