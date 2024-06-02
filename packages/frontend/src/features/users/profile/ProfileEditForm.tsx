import SaveAsIcon from "@mui/icons-material/SaveAs";
import ProfileInput from "./ProfileInput";

type Prop = {
  handleShowEdit: () => void;
};

function ProfileEditForm({ handleShowEdit }: Prop) {
  return (
    <div className="w-full p-4 bg-base-100 rounded-lg bg-base-100 transition-all">
      <div className="w-full flex items-center justify-between">
        <h6 className="h6 capitalize font-bold">Edit Profile Information</h6>
        <button
          type="button"
          aria-label="Edit User"
          className="cursor-pointer hover:text-base-content/40"
          onClick={() => handleShowEdit()}
        >
          <SaveAsIcon className="w-7 h-7" />
        </button>
      </div>

      <form className="flex flex-col flex-nowrap text-base-content">
        <ProfileInput label="FirstName" placeholder="Enter your firstname" value="Joseph" disabled />
        <ProfileInput label="LastName" placeholder="Enter your lastname" value="Ogunsuyi" disabled />
        <ProfileInput label="Email" placeholder="Enter your email" value="emmijozzy@gamilvsbdgvgdfvshgjhmdfhjh.com" />
        <ProfileInput label="Dept." placeholder="Enter your department" value="Web Development" disabled />
        <ProfileInput label="Phone" placeholder="Enter your phone" value="+2349032846121" />
        <ProfileInput label="Location" placeholder="Enter your location" value="Lagos, Nigeria" />
        <ProfileInput label="Whatsapps Link" placeholder="Enter your Whatsapp link" value="" />
        <ProfileInput label="Facebook Link" placeholder="Enter your Facebook link" value="" />
        <ProfileInput label="LinkedIn Link" placeholder="Enter your LinkedIn link" value="" />
      </form>
    </div>
  );
}
export default ProfileEditForm;
