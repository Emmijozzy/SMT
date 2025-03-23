import { useEffect, useState } from "react";
import log from "../../../shared/utils/log";
import socketService from "../../socketEvents/SocketService";
import { ISubtask } from "../subtaskInterface";

export const useSubtaskChangeStatusEvent = () => {
  const [subtaskChangeStatus, setSubtaskChangeStatus] = useState<ISubtask[]>([]);

  useEffect(() => {
    const socket = socketService.getSocket();

    if (!socket) {
      log(
        "error",
        "Socket not connected when trying to listen to subtask:created events",
        "useSubtaskChangeStatusEvent",
      );
      return undefined;
    }

    const handlerSubtaskChangeStatus = (subtask: ISubtask) => {
      log("info", "Subtask change status event received", "useSubtaskChangeStatusEvent");
      setSubtaskChangeStatus((prevSubtasks) => [...prevSubtasks, subtask]);
    };

    socket.on("subtask:status-changed", handlerSubtaskChangeStatus);
    return () => {
      socket.off("subtask:status-changed", handlerSubtaskChangeStatus);
    };
  }, []);

  const clearSubtaskChangeStatus = () => {
    setSubtaskChangeStatus([]);
  };

  return { subtaskChangeStatus, clearSubtaskChangeStatus };
};
