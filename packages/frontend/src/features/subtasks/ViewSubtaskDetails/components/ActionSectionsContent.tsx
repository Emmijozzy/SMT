import { SubtaskStatus } from "../../SubtaskStatus";
import { ActionHandlers, ActionState } from "../Interface/viewSubtaskInterface";
import CheckListSection from "./CheckListSection";
import CommentSection from "./CommentSection";
import FeedbackSection from "./FeedbackSection";
import RequiredFieldSection from "./RequiredFieldSection";

type Props = {
  state: ActionState;
  handlers: ActionHandlers;
  subtaskStatus: SubtaskStatus;
};

function ActionSectionsContent({ state, handlers, subtaskStatus }: Props) {
  return (
    <>
      <CheckListSection
        checklistItems={state.checklistItems}
        onChecklistChange={handlers.handleChecklistChange}
        subtaskStatus={subtaskStatus}
      />
      <RequiredFieldSection
        requiredFields={state.requiredFields}
        subtaskStatus={subtaskStatus}
        onRequiredFieldChange={handlers.handleRequiredFieldChange}
      />
      <CommentSection
        subtaskStatus={subtaskStatus}
        comment={state.comment}
        onCommentChange={handlers.handleCommentChange}
      />
      <FeedbackSection
        subtaskStatus={subtaskStatus}
        feedback={state.feedback}
        onFeedbackChange={handlers.handleFeedbackChange}
      />
    </>
  );
}

export default ActionSectionsContent;
