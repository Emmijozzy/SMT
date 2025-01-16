import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import { handleBack } from "../../../../shared/utils/handleBack";
import { UserHeaderProps } from "../types";

export function UserHeader({ user, userRole }: UserHeaderProps) {
  return (
    <div className="w-full flex justify-between px-2">
      <h6 className="h6">User Details</h6>
      <nav className="flex items-center gap-2">
        {userRole === "admin" && !user.del_flg && (
          <Link to={`../${user.userId}/edit`}>
            <button type="button" aria-label="Edit User" className="cursor-pointer">
              <EditIcon className="w-7 h-7" />
            </button>
          </Link>
        )}
        <button
          type="button"
          aria-label="Go Back"
          onClick={handleBack}
          className="cursor-pointer hover:text-base-content/40"
        >
          <ArrowBackSharpIcon className="w-8 h-8" />
        </button>
      </nav>
    </div>
  );
}
