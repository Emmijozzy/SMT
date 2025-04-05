import { useEffect, useState } from "react";
import socketService from "../../socketEvents/SocketService";
import { ITask } from "../tasksInterface";
import log from "../../../shared/utils/log";

export const useTaskDeletedEvent = () => {
  const [taskDeleted, setTaskDeleted] = useState<ITask[]>([]);

  useEffect(() => {
    const socket = socketService.getSocket();

    if (!socket) {
      log("error", "Socket not connected when trying to listen to task:deleted events", "useTaskDeletedEvent");
      return undefined;
    }

    const handlerTaskDeleted = (task: ITask) => {
      log("info", "Task deleted event received");
      setTaskDeleted((prevTasks) => [...prevTasks, task]);
    };

    socket.on("task:deleted", handlerTaskDeleted);

    return () => {
      socket.off("task:deleted", handlerTaskDeleted);
    };
  }, []);

  const clearTaskDeleted = () => {
    setTaskDeleted([]);
  };
  return { taskDeleted, clearTaskDeleted };
};
