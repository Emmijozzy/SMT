import { useEffect, useState } from "react";
import log from "../../../shared/utils/log";
import socketService from "../../socketEvents/SocketService";
import { ITask } from "../tasksInterface";

export const useTaskUpdatedEvent = () => {
  const [taskUpdated, setTaskUpdated] = useState<ITask[]>([]);

  useEffect(() => {
    const socket = socketService.getSocket();

    if (!socket) {
      log("error", "Socket not connected when trying to listen to subtask:created events", "useSubtaskCreatedEvent");
      return undefined;
    }

    const handlerTaskUpdated = (task: ITask) => {
      log("info", "Task updated event received", "useTaskUpdatedEvent");
      setTaskUpdated((prevTasks) => [...prevTasks, task]);
    };

    socket.on("task:updated", handlerTaskUpdated);

    return () => {
      socket.off("task:updated", handlerTaskUpdated);
    };
  }, []);
  const clearTaskUpdated = () => {
    setTaskUpdated([]);
  };
  return { taskUpdated, clearTaskUpdated };
};
