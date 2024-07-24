/* eslint-disable jsx-a11y/label-has-associated-control */
// import { Link } from "react-router-dom";
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
// import Button2 from "../../../shared/components/Button2";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import UserDetailsForm from "./UserDetailsForm";
import UserPermissionForm from "./UserPermissionForm";
import Password from "./Password";
import UseAddUser from "./UseAddUser";
import { addAlert } from "../../alerts/AlertSlice";

function AddUser() {
  const { handleSubmit, handleBlur, handleChange, errors, values, isSubmitting } = UseAddUser();

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
        <div className="order-1 flex">
          <h2 className="md:hidden h6 font-bold capitalize">Add New User</h2>
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
        <div role="tablist" className="tabs tabs-lifted tabs-sm">
          <input type="radio" name="my_tabs_2" role="tab" className="tab h-10 " aria-label="Details" />
          <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
            <UserDetailsForm handleBlur={handleBlur} handleChange={handleChange} errors={errors} values={values} />
          </div>

          <input
            type="radio"
            name="my_tabs_2"
            role="tab"
            className="tab h-10"
            aria-label="Permissions"
            defaultChecked
          />
          <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
            <UserPermissionForm handleBlur={handleBlur} handleChange={handleChange} values={values} />
          </div>

          <input type="radio" name="my_tabs_2" role="tab" className="tab h-10" aria-label="Password" />
          <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
            <Password handleBlur={handleBlur} handleChange={handleChange} errors={errors} values={values} />
          </div>
        </div>
        <div className="absolute container w-full left-0 bottom-[-6rem]  flex justify-center gap-4">
          <button
            type="submit"
            className="px-4 py-2 button text-center text-base-content border transition-all bg-base-300 hover:scale-[105%] hover:shadow-lg hover:shadow-base-300 hover:bg-base-content hover:text-base-300  rounded-lg cursor-pointer ease-in"
            onClick={handleFormValidation}
          >
            {isSubmitting ? "Loading..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
export default AddUser;
