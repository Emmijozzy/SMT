/* eslint-disable jsx-a11y/label-has-associated-control */
// import { Link } from "react-router-dom";
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
// import Button2 from "../../../shared/components/Button2";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addAlert } from "../../alerts/AlertSlice";
import useAddUser from "./useAddUser";
import UserForm from "../components/UserForm";

function AddUser() {
  const { handleSubmit, handleBlur, handleChange, errors, values, isSubmitting } = useAddUser();

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
        <div className="order-1 flex w-full">
          <h2 className="md:justify-between h6 font-bold capitalize">Add New User</h2>
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
      <UserForm
        handleSubmit={handleSubmit}
        handleBlur={handleBlur}
        handleChange={handleChange}
        isSubmitting={isSubmitting}
        handleFormValidation={handleFormValidation}
        errors={errors}
        values={values}
      />
    </div>
  );
}
export default AddUser;
