import { useEffect, useState } from "react";
import log from "../../../shared/utils/log";
import socketService from "../../socketEvents/SocketService";
import { ISubtask } from "../subtaskInterface";

export const useSubtaskDeletedEvent = () => {
  const [subtaskDeleted, setDeletedSubtask] = useState<ISubtask[]>([]);

  useEffect(() => {
    const socket = socketService.getSocket();
    if (!socket) {
      log("error", "Socket not connected when trying to listen to subtask:deleted events", "useSubtaskDeletedEvent");
      return undefined;
    }

    const handlerSubtaskDeleted = (subtask: ISubtask) => {
      log("info", "Subtask deleted event received", "useSubtaskDeletedEvent");
      setDeletedSubtask((prevSubtasks) => [...prevSubtasks, subtask]);
    };

    socket.on("subtask:deleted", handlerSubtaskDeleted);

    return () => {
      socket.off("subtask:deleted", handlerSubtaskDeleted);
    };
  }, []);

  const clearSubtaskDeleted = () => {
    setDeletedSubtask([]);
  };

  return { subtaskDeleted, clearSubtaskDeleted };
};
