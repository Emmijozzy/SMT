import StatusButton from "../../../../shared/components/StatusButton";
import useRole from "../../../users/hooks/useRole";
import { UserRole } from "../../../users/userRole";
import { InReviewFeedBackData, InReviewUpdateData, ISubtask } from "../../subtaskInterface";
import { SubtaskStatus } from "../../SubtaskStatus";
import useStatusAction from "../../ViewSubtaskDetails/hook/useStatusAction";

interface SubtaskActionProps {
  subtask: ISubtask;
  error: string | null;
  onSubmit: () => boolean;
  inReviewUpdateData: InReviewUpdateData;
  inReviewFeedBackData: InReviewFeedBackData;
  allChecklistApproved: boolean;
}

function SubtaskAction({
  subtask,
  error,
  onSubmit,
  inReviewFeedBackData,
  inReviewUpdateData,
  allChecklistApproved,
}: SubtaskActionProps) {
  const role = useRole();
  const {
    updateSubtaskOpenToInProcess,
    updateSubtaskToInReview,
    updateSubtaskInReviewToRevisit,
    updateSubtaskInReviewToCompleted,
  } = useStatusAction(subtask);

  const handleStatusChange = (action: () => Promise<void>) => {
    if (!onSubmit()) {
      action().finally(() => {});
    }
  };

  const renderTeamMemberActions = () => {
    if (role !== UserRole.TeamMember) return null;

    return (
      <>
        {subtask.status === SubtaskStatus.Open && (
          <StatusButton status="in_process" onClick={() => handleStatusChange(() => updateSubtaskOpenToInProcess())} />
        )}
        {(subtask.status === SubtaskStatus.InProcess || subtask.status === SubtaskStatus.Revisit) && (
          <StatusButton
            status="in_review"
            onClick={() => handleStatusChange(() => updateSubtaskToInReview(inReviewUpdateData))}
            disabled={!!error}
          />
        )}
      </>
    );
  };

  const renderManagerActions = () => {
    if (subtask.status !== SubtaskStatus.InReview || (role !== UserRole.Admin && role !== UserRole.Manager))
      return null;

    return (
      <>
        <StatusButton
          status="revisit"
          onClick={() => handleStatusChange(() => updateSubtaskInReviewToRevisit(inReviewFeedBackData))}
          disabled={!!error || allChecklistApproved}
        />
        <StatusButton
          status="completed"
          onClick={() => handleStatusChange(() => updateSubtaskInReviewToCompleted(inReviewFeedBackData))}
          disabled={!!error || !allChecklistApproved}
        />
      </>
    );
  };

  return (
    <div className="p-2 rounded-lg shadow-sm w-full flex items-center justify-center bg-base-200">
      <div className="space-x-2">
        {renderTeamMemberActions()}
        {renderManagerActions()}
      </div>
    </div>
  );
}

export default SubtaskAction;
