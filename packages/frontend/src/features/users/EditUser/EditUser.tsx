import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
// import Button2 from "../../../shared/components/Button2";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { addAlert } from "../../alerts/AlertSlice";
import UserForm from "../components/UserForm";
import useEditUser from "./useEditUser";

function EditUser() {
  const { userId = "" } = useParams<{ userId: string }>();

  const { handleSubmit, handleBlur, handleChange, errors, values, isSubmitting } = useEditUser(userId);

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
export default EditUser;
