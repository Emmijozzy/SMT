/* eslint-disable indent */
import { useParams } from "react-router-dom";
import useRole from "../../users/hooks/useRole";
import { ErrorState } from "../components/ErrorState";
import { LoadingState } from "../components/LoadingState";
import { SubtaskContent } from "../components/SubtaskContent";
import { useSubtaskData } from "../hooks/useSubtaskData";
import ActionSections from "./components/ActionSections";

interface ViewSubtaskDetailsProps {
  showEdit: () => void;
  showDeleteModal: () => void;
}

function ViewSubtaskDetails({ showEdit, showDeleteModal }: ViewSubtaskDetailsProps) {
  const { subtaskId = "" } = useParams();
  const { subtask, isFetching, isError } = useSubtaskData(subtaskId);
  const role = useRole();

  if (!subtask && isFetching) return <LoadingState />;
  if (isError || !subtask) return <ErrorState />;

  return (
    <>
      <SubtaskContent subtask={subtask} role={role || ""} showEdit={showEdit} showDeleteModal={showDeleteModal} />

      <ActionSections subtask={subtask} />
    </>
  );
}
export default ViewSubtaskDetails;
