/* eslint-disable indent */
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import EditIcon from "@mui/icons-material/Edit";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { RootState } from "../../../app/store";
import DetailsContainer from "../../../shared/components/DetailsContainer";
import { usersSelectors } from "../userSlice";

function ViewUser() {
  const { userId = "" } = useParams<{ userId: string }>();

  const user = useSelector((state: RootState) => usersSelectors.selectById(state, userId));

  const tableRows = user
    ? [
        { label: "User ID", value: user.userId || "" },
        { label: "Name", value: user.fullName || "", className: "" },
        { label: "Email", value: user.email || "", className: "" },
        { label: "Role", value: user.role.replace("_", " ") || "", className: "capitalize" },
        { label: "Team", value: user.team || "", className: "capitalize" },
        { label: "phone", value: user.phone_no?.toString() || "", className: "capitalize" },
        { label: "location", value: user.location || "", className: "capitalize" },
      ]
    : [];

  const handleGoBack = () => {
    window.history.back();
  };

  let content;

  if (user) {
    const { socialLinks } = user;

    content = (
      <div className="container transition-all">
        <div className="w-full flex flex-col bg-base-200 rounded-lg py-2 overflow-hidden">
          <div className="w-full flex justify-between px-4">
            <h6 className="h6">User Details</h6>
            <nav className="flex items-center gap-2">
              {!user.del_flg && (
                <Link to={`../${userId}/edit`}>
                  <button type="button" aria-label="Edit User" className="cursor-pointer">
                    <EditIcon className="w-7 h-7" />
                  </button>
                </Link>
              )}
              <button
                type="button"
                aria-label="Edit User"
                onClick={handleGoBack}
                className="cursor-pointer hover:text-base-content/40"
              >
                <ArrowBackSharpIcon className="w-8 h-8" />
              </button>
            </nav>
          </div>

          {user.del_flg ? (
            <div className="w-full flex place-content-center">
              {" "}
              <p className="text-error"> User Deleted</p>
            </div>
          ) : (
            <>
              <DetailsContainer tableRows={tableRows} />
              <div className="flex w-full items-center  border-base-content">
                <div className="flex gap-4 ml-auto mr-2 mt-2">
                  <a
                    aria-label="Whatsapp"
                    href={socialLinks?.whatsappLink || "https://"}
                    target="_blank"
                    className="cursor-pointer"
                    rel="noreferrer"
                  >
                    <WhatsAppIcon className="w-7 h-7" />
                  </a>
                  <a
                    aria-label="Facebook"
                    href={socialLinks?.facebookLink || "https://"}
                    target="_blank"
                    className="cursor-pointer"
                    rel="noreferrer"
                  >
                    <FacebookIcon className="w-7 h-7" />
                  </a>
                  <a
                    aria-label="LinkedIn"
                    href={socialLinks?.linkedInLink || "https://"}
                    target="_blank"
                    className="cursor-pointer"
                    rel="noreferrer"
                  >
                    <LinkedInIcon className="w-7 h-7" />
                  </a>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  return content;
}

export default ViewUser;
