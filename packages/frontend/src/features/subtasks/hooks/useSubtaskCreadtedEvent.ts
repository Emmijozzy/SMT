/* eslint-disable consistent-return */
import { useEffect, useState } from "react";
import log from "../../../shared/utils/log";
import socketService from "../../socketEvents/SocketService";
import { ISubtask } from "../subtaskInterface";

export const useSubtaskCreatedEvent = () => {
  const [subtaskCreated, setSubtaskCreated] = useState<ISubtask[]>([]);

  useEffect(() => {
    const socket = socketService.getSocket();

    if (!socket) {
      log("error", "Socket not connected when trying to listen to subtask:created events", "useSubtaskCreatedEvent");
      return;
    }

    const handlerSubtaskCreated = (subtask: ISubtask) => {
      log("info", "Subtask created event received", "useSubtaskCreatedEvent");
      setSubtaskCreated((prevSubtasks) => [...prevSubtasks, subtask]);
    };

    socket.on("subtask:created", handlerSubtaskCreated);

    return () => {
      socket.off("subtask:created", handlerSubtaskCreated);
    };
  }, []);

  const clearSubtaskCreated = () => {
    setSubtaskCreated([]);
  };

  return { subtaskCreated, clearSubtaskCreated };
};
