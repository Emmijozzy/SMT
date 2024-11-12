/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import EditIcon from "@mui/icons-material/Edit";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { IUser } from "../users/userInterface";

type Props = {
  handleShowEdit: () => void;
};

function ProfileInfo({ handleShowEdit }: Props) {
  const {
    fullName,
    email,
    team,
    phone_no: PhoneNo,
    location,
    socialLinks,
  } = useSelector((state: RootState) => state.userProfile.userProfile) as IUser;

  return (
    <div className="w-full p-4 bg-base-100 rounded-lg transition-all">
      <div className="w-full flex items-center justify-between">
        <h6 className="h6 capitalize font-bold">Profile Information</h6>
        <button type="button" aria-label="Edit User" className="cursor-pointer" onClick={() => handleShowEdit()}>
          <EditIcon className="w-7 h-7" />
        </button>
      </div>
      <div className="flex flex-col flex-nowrap text-base-content">
        <div className="flex w-full h-16 items-center border-b-2 border-base-content">
          <p className="w-20 md:w-32 body-1 mr-10 font-bold capitalize">Name:</p>
          <p className="w-40 md:w-[50%] body-1 truncate ... hover:text-clip capitalize">{fullName}</p>
        </div>
        <div className="flex w-full h-16 items-center border-b-2 border-base-content">
          <p className="w-20 md:w-32 body-1 mr-10 font-bold capitalize">Email :</p>
          <p className="w-40 md:w-fit body-1 truncate ... hover:text-clip">{email}</p>
        </div>
        <div className="flex w-full h-16 items-center border-b-2 border-base-content">
          <p className="w-20 md:w-32 body-1 mr-10 font-bold  capitalize">Dept. :</p>
          <p className="w-40 md:w-fit body-1 truncate ... hover:text-clip capitalize">{team || ""}</p>
        </div>
        <div className="flex w-full h-16 items-center border-b-2 border-base-content">
          <p className="w-20 md:w-32 body-1 mr-10 font-bold  capitalize">Phone :</p>
          <p className="w-40 md:w-fit body-1 truncate ... hover:text-clip capitalize">{PhoneNo}</p>
        </div>
        <div className="flex w-full h-16 items-center border-b-2 border-base-content">
          <p className="w-20 md:w-32 body-1 mr-10 font-bold  capitalize">Location :</p>
          <p className="w-40 md:w-fit body-1 truncate ... hover:text-clip capitalize">{location}</p>
        </div>
        <div className="flex w-full h-16 items-center  border-base-content">
          <p className="w-20 md:w-32 body-1 mr-10 font-bold  capitalize">Social :</p>
          <div className="flex gap-4">
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
      </div>
    </div>
  );
}
export default ProfileInfo;
