import useRole from "../../../users/hooks/useRole";
import { UserRole } from "../../../users/userRole";
import { SubtaskStatus } from "../../SubtaskStatus";

type Props = {
  subtaskStatus: SubtaskStatus | SubtaskStatus.Completed;
  feedback: string;
  onFeedbackChange: (updatedFeedback: string) => void;
};

function FeedbackSection({ subtaskStatus, feedback, onFeedbackChange }: Props) {
  const role = useRole();

  if (role === undefined) return null;

  const isTeamMember = role === UserRole.TeamMember;
  const canViewFeedback = () => {
    if (subtaskStatus === SubtaskStatus.Revisit || subtaskStatus === SubtaskStatus.Completed) {
      return true;
    }

    return false;
  };
  const canProvideFeedback = subtaskStatus === SubtaskStatus.InReview && !isTeamMember;
  const canViewFeedBackOnRevisit = subtaskStatus === SubtaskStatus.Revisit && !isTeamMember;

  const renderTextArea = (isDisabled = false) => (
    <div className="w-full bg-base-200 p-1 rounded-lg shadow-sm">
      <h6 className="text-xl font-semibold mb-2 mx-2">Feedback</h6>
      <div className="container hover:shadow-sm transition-shadow">
        <textarea
          value={feedback}
          onChange={(e) => onFeedbackChange(e.target.value)}
          className="textarea textarea-bordered w-full"
          placeholder="Type here"
          disabled={isDisabled}
        />
      </div>
    </div>
  );
  if (canViewFeedBackOnRevisit) {
    return renderTextArea(true);
  }

  if (canViewFeedback()) {
    return renderTextArea(true);
  }

  return canProvideFeedback ? renderTextArea(false) : null;
}

export default FeedbackSection;
