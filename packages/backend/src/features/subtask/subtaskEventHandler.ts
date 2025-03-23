import { Server } from "socket.io";
import { SocketUserDataType } from "../../features/socket/manageUserDataType";
import { ISubtask } from "./subtask";

enum SUBTASK_EVENT {
  CREATED = "subtask:created",
  UPDATED = "subtask:updated",
  REASSIGNED = "subtask:reassigned",
  DELETED = "subtask:deleted",
  "STATUS_CHANGED" = "subtask:status-changed"
}

export class SubtaskEventHandler {
  constructor(
    private io: Server,
    // private subtaskService: SubtaskService,
    private readonly connectedUser: Map<string, SocketUserDataType>
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public emitSubtaskCreatedEvent(subtask: ISubtask, _igneeId: string): void {
    this.io.emit(SUBTASK_EVENT.CREATED, subtask);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public emitSubtaskUpdatedEvent(subtask: ISubtask, _assigneeId: string): void {
    this.io.emit(SUBTASK_EVENT.UPDATED, subtask);
  }

  public emitSubtaskReassignEvent(subtask: ISubtask, OldaAsigneeId: string): void {
    //check if the user is connected
    const userData = this.connectedUser.get(OldaAsigneeId);
    if (!userData) {
      return;
    }
    const { socketId } = userData;

    if (socketId) {
      this.io.to(socketId).emit(SUBTASK_EVENT.REASSIGNED, subtask);
    }
  }

  public emitSubtaskDeletedEvent(subtask: ISubtask): void {
    this.io.emit(SUBTASK_EVENT.DELETED, subtask);
  }

  public emitSubtaskStatusUpdatedEvent(subtask: ISubtask, reciverId: string): void {
    const userData = this.connectedUser.get(reciverId);
    if (!userData) {
      return;
    }
    const { socketId } = userData;

    if (socketId) {
      this.io.to(socketId).emit(SUBTASK_EVENT.STATUS_CHANGED, subtask);
    }
  }
}
