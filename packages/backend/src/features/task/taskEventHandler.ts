import { SocketUserDataType } from "../../features/socket/manageUserDataType";
import { Server } from "socket.io";
import { ITask } from "./model/task";

export class TaskEventHandler {
  constructor(
    private io: Server,
    // private taskService: TaskService,
    private readonly connectedUser: Map<string, SocketUserDataType>
  ) {}

  public emitTaskCreatedEvent(task: ITask, reciverId: string): void {
    const userData = this.connectedUser.get(reciverId);
    if (!userData) {
      return;
    }
    const { socketId } = userData;

    if (socketId) {
      this.io.to(socketId).emit("task:created", task);
    }
  }

  public emitTaskUpdatedEvent(task: ITask, reciverId: string): void {
    const userData = this.connectedUser.get(reciverId);
    if (!userData) {
      return;
    }
    const { socketId } = userData;

    if (socketId) {
      this.io.to(socketId).emit("task:updated", task);
    }
  }

  public emitTaskDeletedEvent(taskId: string, reciverId: string): void {
    const userData = this.connectedUser.get(reciverId);
    if (!userData) {
      return;
    }
    const { socketId } = userData;

    if (socketId) {
      this.io.to(socketId).emit("task:deleted", taskId);
    }
  }
}
