import { OnSubtaskChangeToComplete } from "./OnSubtaskChangeToComplete";
import OnSubtaskChangeToInProcess from "./OnSubtaskChangeToInProcess";
import { OnSubtaskCreation } from "./OnSubtaskCreation";
import { OnSubtaskDelete } from "./OnSubtaskDelete";

const runEvents = () => {
  console.log("Watching for changes...");
  OnSubtaskChangeToInProcess();
  OnSubtaskChangeToComplete();
  OnSubtaskCreation();
  OnSubtaskDelete();
};

export default runEvents;
