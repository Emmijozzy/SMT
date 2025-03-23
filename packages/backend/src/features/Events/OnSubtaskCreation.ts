import logger from "../../utils/logger";
import subtaskModel, { ISubtask } from "../subtask/subtask";
import { Task } from "../task/model/task";

export const OnSubtaskCreation = () => {
  // Improved change stream pipeline
  const changeStream = subtaskModel.watch([
    {
      $match: {
        operationType: "insert"
      }
    }
  ]);

  // Add connection handling
  // changeStream.on("error", (error) => {
  //   console.log("Change stream error:", error);
  //   changeStream.close();
  // });

  // changeStream.on("close", () => {
  //   console.log("Change stream closed. Reconnecting...");
  //   setTimeout(OnSubtaskCreation, 1000);
  // });

  changeStream.on("change", async (change) => {
    try {
      if (change.operationType !== "insert") return;

      const { fullDocument } = change;
      const { taskId } = fullDocument;

      const task = await Task.findOne({ taskId })
        .populate({
          path: "subtasks",
          model: "Subtask",
          foreignField: "subtaskId",
          select: "status"
        })
        .lean();

      if (!task) {
        console.log(`Task ${taskId} not found`);
        return;
      }

      const fetchedTaskSubtasks = task.subtasks as unknown as ISubtask[];
      //Plus one newly created
      const totalSubtasks = fetchedTaskSubtasks.length + 1;
      const completedSubtasks = fetchedTaskSubtasks.filter((subtask) => subtask.status === "completed").length;

      const progress = Math.ceil(totalSubtasks ? (completedSubtasks / totalSubtasks) * 100 : 0);
      // console.log(
      //   `Task ${taskId} has ${completedSubtasks} completed subtasks out of ${totalSubtasks} and progress=${progress}`
      // );

      await Task.findOneAndUpdate(
        { taskId },
        {
          progress,
          status: progress === 100 ? "completed" : "in progress"
        },
        { new: true }
      );

      // console.log(`Task ${taskId} updated: progress=${progress}, status=in progress`);
      logger.info(`Task ${taskId} updated: progress=${progress}, status=in progress`);
    } catch (error) {
      console.error("Error handling subtask creation:", error);
    }
  });

  return changeStream;
};
