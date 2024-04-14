import { taskCounter, ITaskCounter } from "../model/taskcounter";

export default async () => {
  const date = new Date();
  const dayMonth = `${date.getDate().toString().padStart(2, "0")}${(date.getMonth() + 1).toString().padStart(2, "0")}`;

  // Check if counter exists for today's date
  const counter = (await taskCounter.findOne({ taskDate: dayMonth })) as ITaskCounter;

  console.log(counter, "find counter", typeof counter);

  if (!counter || counter.date < date) {
    // Counter doesn't exist, create a new one with counter set to 0
    console.log("taskId recreated");
    await taskCounter.create({ date, taskDate: dayMonth, counter: 0 });
  }

  // Now, safely increment and get the counter
  const updatedCounter = await taskCounter.findOneAndUpdate(
    { taskDate: dayMonth },
    { $inc: { counter: 1 } },
    { new: true }
  );

  console.log(updatedCounter, "Task counter");

  return `${dayMonth}${updatedCounter?.counter.toString().padStart(3, "0")}`;
};
