/* eslint-disable indent */
import { useCallback, useEffect, useState } from "react";
import { ValidationError } from "yup";
import useRole from "../../../users/hooks/useRole";
import { UserRole } from "../../../users/userRole";
import { InReviewFeedBackDataSchema } from "../../subtaskSchema/InReviewFeedBackDataSchema";
import { InReviewUpdateDataSchema } from "../../subtaskSchema/InReviewUpdateDataSchema";
import { SubtaskStatus } from "../../SubtaskStatus";
import SubtaskAction from "../../viewSubtask/components/SubtaskAction";
import { useValidation } from "../../viewSubtask/hooks/useValidation";
import { useActionSectionsState } from "../hook/useActionSectionState";
import { ActionSectionsProps } from "../Interface/viewSubtaskInterface";
import ActionSectionsContent from "./ActionSectionsContent";

function ActionSections({ subtask }: ActionSectionsProps) {
  const role = useRole();
  const isTeamMember = role === UserRole.TeamMember;

  const { state, setState } = useActionSectionsState(subtask);
  const { setError, error, validateData } = useValidation(isTeamMember);
  const [allChecklistApproved, setAllChecklistApproved] = useState(false);

  const [inReviewUpdateData, setInReviewUpdateData] = useState({
    comment: state.comment,
    checkLists: state.checklistItems,
    requiredFields: state.requiredFields,
  });

  const [inReviewFeedBackData, setInReviewFeedBackData] = useState({
    feedback: state.feedback,
    checkLists: state.checklistItems,
    requiredFields: state.requiredFields,
  });

  const handlers = {
    handleChecklistChange: (id: string, action: string, checked: boolean) => {
      const updatedChecklist = state.checklistItems.map((item) =>
        item.id === id
          ? {
              ...item,
              isChecked: action === "Check" ? checked : item.isChecked,
              isApprove: action === "Approve" ? checked : item.isApprove,
              isReject: action === "Reject" ? checked : item.isReject,
            }
          : item,
      );

      setState((prev) => ({ ...prev, checklistItems: updatedChecklist }));

      if (!isTeamMember) {
        const newData = { ...inReviewFeedBackData, checkLists: updatedChecklist };
        setInReviewFeedBackData(newData);
        validateData(newData);
      } else {
        const newData = { ...inReviewUpdateData, checkLists: updatedChecklist };
        setInReviewUpdateData(newData);
        validateData(newData);
      }
    },

    handleRequiredFieldChange: (id: string, value: string) => {
      const updatedFields = state.requiredFields.map((item) =>
        item.id === id ? { ...item, input: value, type: item.type } : item,
      );

      setState((prev) => ({ ...prev, requiredFields: updatedFields }));
      const newData = { ...inReviewUpdateData, requiredFields: updatedFields };
      setInReviewUpdateData(newData);
      validateData(newData);
    },

    handleFeedbackChange: (updatedFeedback: string) => {
      setState((prev) => ({ ...prev, feedback: updatedFeedback }));
      const newData = { ...inReviewFeedBackData, feedback: updatedFeedback };
      setInReviewFeedBackData(newData);
      validateData(newData);
    },

    handleCommentChange: (updatedComment: string) => {
      setState((prev) => ({ ...prev, comment: updatedComment }));
      const newData = { ...inReviewUpdateData, comment: updatedComment };
      setInReviewUpdateData(newData);
      validateData(newData);
    },

    handleReviewValidateOnSubmit: useCallback(() => {
      let validationError = false;
      try {
        if (isTeamMember) {
          InReviewUpdateDataSchema.validateSync(inReviewUpdateData);
        } else {
          InReviewFeedBackDataSchema.validateSync(inReviewFeedBackData);
        }
      } catch (err) {
        validationError = true;
        setError(String((err as ValidationError).errors));
      }
      return validationError;
    }, [inReviewFeedBackData, inReviewUpdateData, isTeamMember, setError]),
  };

  const showAction = {
    supervisor: !isTeamMember && subtask.status === SubtaskStatus.InReview,
    teamMember: isTeamMember && subtask.status !== SubtaskStatus.InReview && subtask.status !== SubtaskStatus.Completed,
  };

  useEffect(() => {
    if (subtask.status === SubtaskStatus.InReview) {
      setAllChecklistApproved(state.checklistItems?.every((item) => item.isApprove));
    }
  }, [state.checklistItems, subtask.status]);

  return (
    <div className="container">
      <ActionSectionsContent state={state} handlers={handlers} subtaskStatus={subtask.status as SubtaskStatus} />

      {error && <div className="text-red-500">{error}</div>}

      {(showAction.supervisor || showAction.teamMember) && (
        <SubtaskAction
          subtask={subtask}
          error={error}
          inReviewUpdateData={inReviewUpdateData}
          inReviewFeedBackData={inReviewFeedBackData}
          allChecklistApproved={allChecklistApproved}
          onSubmit={handlers.handleReviewValidateOnSubmit}
        />
      )}
    </div>
  );
}
export default ActionSections;
