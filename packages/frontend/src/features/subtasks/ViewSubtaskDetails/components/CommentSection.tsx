import useRole from "../../../users/hooks/useRole";
import { UserRole } from "../../../users/userRole";
import { SubtaskStatus } from "../../SubtaskStatus";

type Props = {
  subtaskStatus: SubtaskStatus;
  comment: string;
  onCommentChange: (updatedFeedback: string) => void;
};

function CommentSection({ subtaskStatus, comment, onCommentChange }: Props) {
  const role = useRole();

  if (role === undefined) return null;

  const isTeamMember = role === UserRole.TeamMember;
  const canViewComment = subtaskStatus === SubtaskStatus.InReview || subtaskStatus === SubtaskStatus.Completed;
  const canProvideComment =
    (subtaskStatus === SubtaskStatus.InProcess || subtaskStatus === SubtaskStatus.Revisit) && isTeamMember;

  const renderTextArea = (isDisabled = false) => (
    <div className="w-full bg-base-200 p-1 rounded-lg shadow-sm">
      <h6 className="text-xl font-semibold mb-2 mx-2">Comment</h6>
      <div className="container hover:shadow-sm transition-shadow">
        <textarea
          value={comment}
          onChange={(e) => onCommentChange(e.target.value)}
          className="textarea textarea-bordered w-full"
          placeholder="Type here"
          disabled={isDisabled}
        />
      </div>
    </div>
  );

  if (canViewComment) {
    return renderTextArea(true);
  }

  return canProvideComment ? renderTextArea(false) : null;
}

export default CommentSection;
