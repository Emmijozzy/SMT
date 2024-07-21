import { useState } from "react";
import PasswordSharpIcon from "@mui/icons-material/PasswordSharp";
import ProfileInfo from "./ProfileInfo";
import ProfilePics from "./ProfilePics";
import ProfileEditForm from "./ProfileEditForm";
import ChangePassword from "./ChangePassword";
import Section from "../../../shared/components/Section";

/*
 */

function Profile() {
  const [showToEdit, setToEdit] = useState(false);
  const [showChangpassword, setShowChangePassword] = useState(true);

  const handleShowEdit = () => {
    setToEdit((pre) => !pre);
  };

  const handleChangePassword = () => {
    setShowChangePassword((pre) => !pre);
  };

  return (
    <Section>
      <ProfilePics />
      {showToEdit ? (
        <ProfileEditForm handleShowEdit={handleShowEdit} />
      ) : (
        <ProfileInfo handleShowEdit={handleShowEdit} />
      )}

      {showChangpassword ? (
        <button
          type="button"
          aria-label="Edit User"
          className="w-full p-4 bg-base-100 rounded-lg bg-base-100 border hover:border-2 border-error cursor-pointer transition-all hover:border-[red]  text-error hover:text-[red]"
          onClick={() => handleChangePassword()}
        >
          <div className="w-full flex items-center justify-between">
            <h6 className="h6 capitalize font-bold text-base-content">Change Password</h6>
            <span className="cursor-pointer">
              <PasswordSharpIcon className="w-7 h-7" />
            </span>
          </div>
        </button>
      ) : (
        <ChangePassword onchangeePassword={handleChangePassword} />
      )}
    </Section>
  );
}
export default Profile;
