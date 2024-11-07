import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import { RootState } from "../../../../app/store";
import { usersSelectors } from "../../../users/userSlice";
import { ITeam } from "../../teamInterface";
import TeamDetailRow from "./TeamDetailRow";

type Props = {
  team: ITeam;
  handleEditTeamDetails: () => void;
};

function ViewTeamDetails({ team, handleEditTeamDetails }: Props) {
  const managerName = useSelector((state: RootState) =>
    usersSelectors.selectById(state, team.managerId as string),
  )?.fullName;
  return (
    <div className="container transition-all">
      <div className="w-full flex flex-col bg-base-200 rounded-lg py-2">
        <div className="w-full flex justify-between px-4">
          <h6 className="h6">Details</h6>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Edit Team"
                className="cursor-pointer hover:text-base-content/40"
                onClick={handleEditTeamDetails}
              >
                <EditIcon className="w-7 h-7 hover:text-warning cursor-pointer" />
              </button>
              <Link to="/dash/teams">
                <button type="button" aria-label="Back to tasks" className="cursor-pointer hover:text-base-content/40">
                  <ArrowBackSharpIcon className="w-12 h-8" />
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full">
          <table className="w-full">
            <tbody>
              <TeamDetailRow label="Team ID" value={team.teamId as string} />
              <TeamDetailRow label="Name" value={team.name} className="" />
              <TeamDetailRow label="Description" value={team.description} />
              <TeamDetailRow label="Manager" value={managerName || ""} className="capitalize" />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ViewTeamDetails;
