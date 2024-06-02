import React from "react";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import ProfileInput from "./ProfileInput";

type Props = {
  onchangeePassword: () => void;
};

function ChangePassword({ onchangeePassword }: Props) {
  return (
    <div className="w-full p-4 bg-base-100 rounded-lg bg-base-100 border border-error cursor-pointer transition-all hover:border-[red]">
      <div className="w-full flex items-center justify-between">
        <h6 className="h6 capitalize font-bold">Change Password</h6>
        <button type="button" aria-label="Edit User" className="cursor-pointer" onClick={() => onchangeePassword()}>
          <SaveAsIcon className="w-7 h-7 text-[red] hover:text-base-content/40" />
        </button>
      </div>
      <div className="flex flex-col flex-nowrap text-base-content">
        <form className="flex flex-col flex-nowrap text-base-content">
          <ProfileInput label="Old Password" placeholder="********" type="password" value="" />
          <ProfileInput label="New Password" placeholder="********" type="password" value="" />
          <ProfileInput label="Confirm Password" placeholder="********" type="Password" value="" />
        </form>
      </div>
    </div>
  );
}
export default ChangePassword;
