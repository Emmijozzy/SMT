/* eslint-disable react/require-default-props */
import { GiCancel } from "react-icons/gi";
import useRole from "../../../users/hooks/useRole";
import { UserRole } from "../../../users/userRole";
import { SubtaskStatus } from "../../SubtaskStatus";
import { RequiredFields } from "../useAddSubtask";

type Props = {
  fields: RequiredFields;
  onRemove?: (id: string) => void;
  subtaskStatus?: SubtaskStatus;
  onRequiredFieldChange?: (id: string, value: string) => void;
};

export function RequiredFieldItems({
  fields,
  onRemove = () => {},
  subtaskStatus = SubtaskStatus.Open,
  onRequiredFieldChange,
}: Props) {
  const role = useRole();

  if (!fields?.length) return null;

  const isTeamMember = role === UserRole.TeamMember;
  const isOpenStatus = subtaskStatus === SubtaskStatus.Open;
  const isInProcessStatus = subtaskStatus === SubtaskStatus.InProcess;
  const isInRevisitStatus = subtaskStatus === SubtaskStatus.Revisit;
  const isInReviewStatus = subtaskStatus === SubtaskStatus.InReview;
  const isCompletedStatus = subtaskStatus === SubtaskStatus.Completed;

  const canRemoveField = role && !isTeamMember && isOpenStatus;
  const isInputDisabled = () => {
    if (isInProcessStatus || isInRevisitStatus) return !isTeamMember;
    if (isInReviewStatus || isCompletedStatus) return true;
    if (isCompletedStatus || isOpenStatus) return true;
    return false;
  };

  return (
    <div className="w-full">
      {fields.map(({ id, field, type, input }) => (
        <div key={id} className="bg-base-100 p-4 mb-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="flex flex-col gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                {canRemoveField && (
                  <button
                    type="button"
                    className="btn btn-ghost btn-xs sm:btn-sm btn-circle"
                    onClick={() => onRemove?.(id)}
                    aria-label="Remove field"
                  >
                    <GiCancel className="text-base-content text-sm sm:text-base" />
                  </button>
                )}
                <span className="text-sm sm:text-base break-words">{field}</span>
              </div>
            </div>
            <div className="flex flex-col items-left gap-1">
              {type === "text" ? (
                <textarea
                  required
                  disabled={isInputDisabled()}
                  defaultValue={input}
                  className="textarea textarea-bordered w-full"
                  placeholder="Type here"
                  onChange={(e) => onRequiredFieldChange?.(id, e.target.value)}
                />
              ) : (
                <input
                  required
                  type="link"
                  defaultValue={input}
                  // value={input}
                  placeholder="Drop link here"
                  disabled={isInputDisabled()}
                  onChange={(e) => onRequiredFieldChange?.(id, e.target.value)}
                  className="input input-bordered input-primary w-full max-w-xs"
                />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

RequiredFieldItems.defaultProps = {
  onRemove: () => {},
  subtaskStatus: SubtaskStatus.Open,
  onRequiredFieldChange: () => {},
};
