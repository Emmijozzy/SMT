import { useMemo, useState } from "react";
import { CheckLists, RequiredFields } from "../../addSubtask/useAddSubtask";
import { ISubtask } from "../../subtaskInterface";

// Create separate hooks for state management
export const useActionSectionsState = (subtask: ISubtask) => {
  const initialState = useMemo(
    () => ({
      checklistItems: subtask?.checkLists as CheckLists,
      requiredFields: subtask?.requiredFields as RequiredFields,
      feedback: subtask?.feedback || "",
      comment: subtask?.comment || "",
    }),
    [subtask],
  );

  const [state, setState] = useState(initialState);
  return { state, setState };
};
