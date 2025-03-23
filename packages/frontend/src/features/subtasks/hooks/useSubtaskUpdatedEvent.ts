import { useEffect, useState } from "react";
import log from "../../../shared/utils/log";
import socketService from "../../socketEvents/SocketService";
import { ISubtask } from "../subtaskInterface";

export const useSubtaskUpdatedEvent = () => {
  const [subtaskUpdated, setUpdatedSubtask] = useState<ISubtask[]>([]);

  useEffect(() => {
    const socket = socketService.getSocket();

    if (!socket) {
      log("error", "Socket not connected when trying to listen to subtask:created events", "useSubtaskCreatedEvent");
    }

    const handlerSubtaskUpdated = (subtask: ISubtask) => {
      log("info", "Subtask updated event received", "useSubtaskCreatedEvent");
      setUpdatedSubtask((prevSubtasks) => [...prevSubtasks, subtask]);
    };

    socket?.on("subtask:updated", handlerSubtaskUpdated);

    return () => {
      socket?.off("subtask:updated", handlerSubtaskUpdated);
    };
  }, []);

  const clearSubtaskUpdated = () => {
    setUpdatedSubtask([]);
  };

  return {
    subtaskUpdated,
    clearSubtaskUpdated,
  };
};
