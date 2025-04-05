import { useEffect, useState } from "react";
import log from "../../../shared/utils/log";
import socketService from "../../socketEvents/SocketService";
import { ITask } from "../tasksInterface";

export const useTaskCreatedEvent = () => {
  const [taskCreated, setTaskCreated] = useState<ITask[]>([]);

  useEffect(() => {
    const socket = socketService.getSocket();

    if (!socket) {
      log("error", "Socket not connected when trying to listen to task:created events", "useTaskCreatedEvent");
      return undefined;
    }
    const handlerTaskCreated = (task: ITask) => {
      log("info", "Task created event received", "useTaskCreatedEvent");
      setTaskCreated((prevTasks) => [...prevTasks, task]);
    };

    socket.on("task:created", handlerTaskCreated);

    return () => {
      socket.off("task:created", handlerTaskCreated);
    };
  }, []);

  const clearTaskCreated = () => {
    setTaskCreated([]);
  };

  return { taskCreated, clearTaskCreated };
};
