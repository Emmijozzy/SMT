import SaveAsIcon from "@mui/icons-material/SaveAs";
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import { useEffect } from "react";
import InputField2 from "../../shared/components/InputField2";
import useUpdateProfileInfo from "./useUpdateProfileInfo";

type Props = {
  handleShowEdit: () => void;
};

function ProfileEditForm({ handleShowEdit }: Props) {
  const { isSuccess, handleSubmit, handleChange, errors, values } = useUpdateProfileInfo();

  const errorExist = Object.keys(errors).length > 0;

  useEffect(() => {
    if (isSuccess) {
      handleShowEdit();
    }
  }, [handleShowEdit, isSuccess]);

  return (
    <form onSubmit={handleSubmit} className="w-full p-4 bg-base-100 rounded-lg transition-all">
      <div className="w-full flex items-center justify-between">
        <h6 className="h6 capitalize font-bold">Edit Profile Information</h6>
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
            onClick={() => handleShowEdit()}
            className={`cursor-pointer hover:text-base-content/40 ${errorExist ? "text-base-content/40" : ""}`}
          >
            <ArrowBackSharpIcon className="w-8 h-8" />
          </button>
        </div>
      </div>

      <div className="flex flex-col flex-nowrap text-base-content">
        <InputField2
          label="Email"
          placeholder="Enter your email"
          value={values.email || ""}
          onChange={handleChange}
          error={errors.email}
          name="email"
          type="email"
        />
        <InputField2
          label="Phone"
          placeholder="Enter your phone"
          value={values.phone || ""}
          onChange={handleChange}
          error={errors.phone}
          name="phone"
          type="tel"
        />
        <InputField2
          label="Location"
          placeholder="Enter your location"
          value={values.location || ""}
          onChange={handleChange}
          error={errors.location}
          name="location"
        />
        <InputField2
          label="Whatsapps Link"
          placeholder="Enter your Whatsapp link"
          value={values.whatsappLink || ""}
          onChange={handleChange}
          error={errors.whatsappLink}
          name="whatsappLink"
          type="url"
          className="lg:ml-4"
        />
        <InputField2
          label="Facebook Link"
          placeholder="Enter your Facebook link"
          value={values.facebookLink || ""}
          onChange={handleChange}
          error={errors.facebookLink}
          name="facebookLink"
          type="url"
          className="lg:ml-7"
        />
        <InputField2
          label="LinkedIn Link"
          placeholder="Enter your LinkedIn link"
          value={values.linkedInLink || ""}
          onChange={handleChange}
          error={errors.linkedInLink}
          name="linkedInLink"
          type="url"
          className="lg:ml-10"
        />
      </div>
    </form>
  );
}
export default ProfileEditForm;
