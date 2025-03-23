import { useEffect, useState } from "react";
import log from "../../../shared/utils/log";
import socketService from "../../socketEvents/SocketService";
import { ISubtask } from "../subtaskInterface";

export const useSubtaskReassignEvent = () => {
  const [subtaskReassigned, setReassignedSubtask] = useState<ISubtask[]>([]);
  useEffect(() => {
    const socket = socketService.getSocket();
    if (!socket) {
      log(
        "error",
        "Socket not connected when trying to listen to subtask:reassigned events",
        "useSubtaskReassignEvent",
      );
      return undefined;
    }

    const handlerSubtaskReassigned = (subtask: ISubtask) => {
      log("info", "Subtask reassigned event received", "useSubtaskReassignEvent");
      setReassignedSubtask((prevSubtasks) => [...prevSubtasks, subtask]);
    };
    socket.on("subtask:reassigned", handlerSubtaskReassigned);

    return () => {
      socket?.off("subtask:reassigned", handlerSubtaskReassigned);
    };
  }, []);
  const clearSubtaskReassigned = () => {
    setReassignedSubtask([]);
  };
  return { subtaskReassigned, clearSubtaskReassigned };
};
