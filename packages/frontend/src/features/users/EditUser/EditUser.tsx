import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
// import Button2 from "../../../shared/components/Button2";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import UserDetailsForm from "../components/UserDetailsForm";
import UserPermissionForm from "../components/UserPermissionForm";
import Password from "../components/Password";
import useEditUser from "./useEditUser";
import { addAlert } from "../../alerts/AlertSlice";

function EditUser() {
  const { userId = "" } = useParams<{ userId: string }>();

  const { handleSubmit, handleBlur, handleChange, errors, values, isSubmitting } = useEditUser(userId);

  console.log(values);

  const dispatch = useDispatch();

  const handleFormValidation = () => {
    const errorsArr = Object.values(errors);
    errorsArr.forEach((err) => {
      dispatch(addAlert({ message: err, type: "error" }));
    });
  };

  return (
    <div className="container transition-all">
      <div className="w-full flex flex-col md:flex-row-reverse md:justify-between">
        <div className="w-full order-1 flex justify-between mb-2">
          <h2 className="h5 font-bold capitalize">Edit User</h2>
          <button
            type="button"
            aria-label="Edit User"
            // onClick={() => handleShowEdit()}
            className="cursor-pointe ml-auto hover:text-base-content/40"
          >
            <Link to="/dash/users">
              <ArrowBackSharpIcon className="w-8 h-8" />
            </Link>
          </button>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <h5 className="h5 underline text-center underline-offset-8 my-3">User Details</h5>
        <UserDetailsForm handleBlur={handleBlur} handleChange={handleChange} errors={errors} values={values} disabled />
        <h5 className="h5 underline text-center underline-offset-8 my-4">Permissions</h5>
        <UserPermissionForm handleBlur={handleBlur} handleChange={handleChange} values={values} />
        <h5 className="h5 underline text-center underline-offset-8 my-3">Security</h5>
        <Password handleBlur={handleBlur} handleChange={handleChange} errors={errors} values={values} />

        <div className="absolute container w-full left-0 bottom-[-6rem]  flex justify-center gap-4">
          <button
            type="submit"
            className="px-4 py-2 button text-center text-base-content border transition-all bg-base-300 hover:scale-[105%] hover:shadow-lg hover:shadow-base-300 hover:bg-base-content hover:text-base-300  rounded-lg cursor-pointer ease-in"
            onClick={handleFormValidation}
          >
            {isSubmitting ? "Loading..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
export default EditUser;
