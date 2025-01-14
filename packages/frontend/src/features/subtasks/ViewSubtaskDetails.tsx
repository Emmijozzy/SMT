import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../app/store";
import DetailsContainer from "../../shared/components/DetailsContainer";
import useRole from "../users/hooks/useRole";
import { SubtaskActions } from "./components/SubtaskActions";
import { useSubtaskTableRows } from "./components/SubtaskTableRows";
import { subtasksSelectors } from "./subtaskSlice";

interface ViewSubtaskDetailsProps {
  showEdit: () => void;
  showDeleteModal: () => void;
}

function ViewSubtaskDetails({ showEdit, showDeleteModal }: ViewSubtaskDetailsProps) {
  const { subtaskId } = useParams();
  const subtask = useSelector((state: RootState) => subtasksSelectors.selectById(state, subtaskId || ""));
  const role = useRole();
  const tableRows = useSubtaskTableRows(subtask);

  return (
    <div className="container transition-all">
      <div className="w-full flex flex-col bg-base-200">
        <div className="w-full flex justify-between">
          <h6 className="h6 px-2">Details</h6>
          <SubtaskActions role={role || ""} showEdit={showEdit} showDeleteModal={showDeleteModal} />
        </div>
        <DetailsContainer tableRows={tableRows} />
      </div>
    </div>
  );
}

export default ViewSubtaskDetails;
