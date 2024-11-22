import AddIcon from "@mui/icons-material/Add";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import TableHead from "./components/TableHead";
import TeamTableRow from "./components/TeamTableRow";
import useTeamTable from "./useTeamTable";
import Pagination from "./components/Pagination";

function TeamTable() {
  const { filteredTeam, totalTeam } = useTeamTable();

  const memoizedFilteredTeam = useMemo(() => filteredTeam || [], [filteredTeam]);

  return (
    <div className="container mx-auto px-4">
      <div className="w-full bg-base-200 rounded shadow-lg py-1">
        <div className="block w-full   overflow-x-auto ">
          <div className="flex items-center my-3 justify-between">
            <div className="relative w-full px-4">
              <h3 className="font-semibold text-lg text-base-content">Teams Table</h3>
            </div>
            <button
              type="button"
              className="w-48 px-2 py-2 button text-center text-base-100 transition-all bg-transparent shadow-inner shadow-base-300 hover:scale-[105%] hover:shadow-lg hover:shadow-base-300  rounded-lg cursor-pointer ease-in bg-gradient-to-tl from-base-content from-2% to-base-300 to-98% mx-4 "
            >
              <Link to="create_team" className="flex items-center justify-center text-xs">
                <AddIcon className="h-8 w-8" />
                &nbsp;&nbsp;Add New Card
              </Link>
            </button>
          </div>
          <div className="block w-full overflow-">
            <table className="items-center w-full bg-transparent border-collapse overflow-scroll">
              <TableHead />
              <tbody className="mb-10 mt-2">
                {memoizedFilteredTeam.length > 0 ? (
                  memoizedFilteredTeam.map((id) => <TeamTableRow key={id} teamId={id} />)
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center py-4">
                      No tasks found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <Pagination totalRows={totalTeam?.length || 0} />
      </div>
    </div>
  );
}

export default TeamTable;
