import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector } from "react-redux";
import { RootState } from "../../../../app/store";
import DetailsContainer from "../../../../shared/components/DetailsContainer";
import { usersSelectors } from "../../../users/userSlice";
import { ITeam } from "../../teamInterface";
import { handleBack } from "../../../../shared/utils/handleBack";

type Props = {
  team: ITeam;
  handleEditTeamDetails: () => void;
};

function ViewTeamDetails({ team, handleEditTeamDetails }: Props) {
  const managerName =
    useSelector((state: RootState) => usersSelectors.selectById(state, team.managerId as string))?.fullName ?? "";

  const tableRows = [
    { label: "Team ID", value: team.teamId as string },
    { label: "Name", value: team.name, className: "" },
    { label: "Description", value: team.description },
    { label: "Manager", value: managerName, className: "capitalize" },
  ];

  return (
    <div className="container transition-all">
      <div className="w-full flex flex-col bg-base-200 rounded-lg py-2 overflow-hidden">
        <div className="w-full flex justify-between px-4">
          <h6 className="h6">Details</h6>
          <nav className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Edit Team"
              className="cursor-pointer hover:text-base-content/40"
              onClick={handleEditTeamDetails}
            >
              <EditIcon className="w-7 h-7 hover:text-warning" />
            </button>
            <button
              type="button"
              aria-label="Back to tasks"
              onClick={handleBack}
              className="cursor-pointer hover:text-base-content/40"
            >
              <ArrowBackSharpIcon className="w-12 h-8" />
            </button>
          </nav>
        </div>
        <DetailsContainer tableRows={tableRows} />
      </div>
    </div>
  );
}

export default ViewTeamDetails;
