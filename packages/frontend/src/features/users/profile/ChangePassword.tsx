import { useEffect } from "react";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import ProfileInput from "./ProfileInput";
import useChangePassword from "./useChangePassword";

type Props = {
  onchangeePassword: () => void;
};

function ChangePassword({ onchangeePassword }: Props) {
  const { isSuccess, handleSubmit, handleChange, errors, values } = useChangePassword();

  const errorExist = Object.keys(errors).length > 0;

  useEffect(() => {
    if (isSuccess) {
      onchangeePassword();
    }
  }, [onchangeePassword, isSuccess]);

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full p-4 bg-base-100 rounded-lg border border-error cursor-pointer transition-all hover:border-[red]"
    >
      <div className="w-full flex items-center justify-between">
        <h6 className="h6 capitalize font-bold">Change Password</h6>
        <div className="flex gap-4">
          <button
            disabled={errorExist}
            type="submit"
            aria-label="Edit User"
            className={`cursor-pointer hover:text-base-content/40 ${errorExist ? "text-base-content/40" : ""}`}
          >
            <SaveAsIcon className="w-8 h-8" />
          </button>
          <button
            type="button"
            aria-label="Edit User"
            onClick={() => onchangeePassword()}
            className={`cursor-pointer hover:text-base-content/40 ${errorExist ? "text-base-content/40" : ""}`}
          >
            <ArrowBackSharpIcon className="w-8 h-8" />
          </button>
        </div>
      </div>
      <div className="flex flex-col flex-nowrap text-base-content">
        <div className="flex flex-col flex-nowrap text-base-content">
          <ProfileInput
            name="oldPassword"
            className="ml-12"
            label="Old Password"
            placeholder="********"
            type="password"
            value={values.oldPassword}
            error={errors.oldPassword}
            onChange={handleChange}
          />
          <ProfileInput
            name="newPassword"
            className="ml-10"
            label="New Password"
            placeholder="********"
            type="password"
            value={values.newPassword}
            error={errors.newPassword}
            onChange={handleChange}
          />
          <ProfileInput
            name="confirmPassword"
            className="ml-2"
            label="Confirm Password"
            placeholder="********"
            type="Password"
            value={values.confirmPassword}
            error={errors.confirmPassword}
            onChange={handleChange}
          />
        </div>
      </div>
    </form>
  );
}
export default ChangePassword;
