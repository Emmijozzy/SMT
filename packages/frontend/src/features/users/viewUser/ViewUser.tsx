import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { usersSelectors } from "../userSlice";
import { RootState } from "../../../app/store";

function ViewUser() {
  const { userId = "" } = useParams<{ userId: string }>();

  const user = useSelector((state: RootState) => usersSelectors.selectById(state, userId));

  let content;

  if (user) {
    const {
      fullName,
      // profilePicUrl: profilePic,
      email,
      role,
      team,
      // createdAt: joined,
      phone_no: phoneNo,
      location,
      socialLinks: { whatsappLink, facebookLink, linkedInLink },
    } = user;

    content = (
      <div className="w-full p-4 bg-base-100 rounded-lg  transition-all">
        <div className="w-full flex items-center justify-between">
          <h6 className="h6 capitalize font-bold">User Details</h6>
          <div className="flex items-center gap-4">
            <Link to={`../${userId}/edit`}>
              <button type="button" aria-label="Edit User" className="cursor-pointer">
                <EditIcon className="w-7 h-7" />
              </button>
            </Link>
            <Link to="/dash/users">
              <button
                type="button"
                aria-label="Edit User"
                // onClick={() => handleShowEdit()}
                className="cursor-pointer hover:text-base-content/40"
              >
                <ArrowBackSharpIcon className="w-8 h-8" />
              </button>
            </Link>
          </div>
        </div>
        <div className="flex flex-col flex-nowrap text-base-content">
          <div className="flex w-full h-16 items-center border-b-2 border-base-content">
            <p className="w-20 md:w-32 body-1 mr-10 font-bold capitalize">Name:</p>
            <p className="w-40 md:w-[50%] body-1 truncate ... hover:text-clip capitalize">{fullName}</p>
          </div>
          <div className="flex w-full h-16 items-center border-b-2 border-base-content">
            <p className="w-20 md:w-32 body-1 mr-10 font-bold capitalize">User ID:</p>
            <p className="w-40 md:w-[50%] body-1 truncate ... hover:text-clip capitalize">{userId}</p>
          </div>
          <div className="flex w-full h-16 items-center border-b-2 border-base-content">
            <p className="w-20 md:w-32 body-1 mr-10 font-bold capitalize">Email :</p>
            <p className="w-40 md:w-fit body-1 truncate ... hover:text-clip">{email}</p>
          </div>
          <div className="flex w-full h-16 items-center border-b-2 border-base-content">
            <p className="w-20 md:w-32 body-1 mr-10 font-bold  capitalize">Role: </p>
            <p className="w-40 md:w-fit body-1 truncate ... hover:text-clip capitalize">{role.replace("_", " ")}</p>
          </div>
          <div className="flex w-full h-16 items-center border-b-2 border-base-content">
            <p className="w-20 md:w-32 body-1 mr-10 font-bold  capitalize">Dept. :</p>
            <p className="w-40 md:w-fit body-1 truncate ... hover:text-clip capitalize">{team}</p>
          </div>
          <div className="flex w-full h-16 items-center border-b-2 border-base-content">
            <p className="w-20 md:w-32 body-1 mr-10 font-bold  capitalize">Phone :</p>
            <p className="w-40 md:w-fit body-1 truncate ... hover:text-clip capitalize">{phoneNo}</p>
          </div>
          <div className="flex w-full h-16 items-center border-b-2 border-base-content">
            <p className="w-20 md:w-32 body-1 mr-10 font-bold  capitalize">Location :</p>
            <p className="w-40 md:w-fit body-1 truncate ... hover:text-clip capitalize">{location}</p>
          </div>
          <div className="flex w-full h-16 items-center  border-base-content">
            <p className="w-20 md:w-32 body-1 mr-10 font-bold  capitalize">Social :</p>
            <div className="flex gap-4">
              <a aria-label="Whatsapp" href={whatsappLink} className="cursor-pointer">
                <WhatsAppIcon className="w-7 h-7" />
              </a>
              <a aria-label="Facebook" href={facebookLink} className="cursor-pointer">
                <FacebookIcon className="w-7 h-7" />
              </a>
              <a aria-label="LinkedIn" href={linkedInLink} className="cursor-pointer">
                <LinkedInIcon className="w-7 h-7" />
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return content;
}
export default ViewUser;
