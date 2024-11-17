import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import InputField3 from "../../../shared/components/InputField3";
import Select from "../../../shared/components/Select";
import { handleBack } from "../../../shared/utils/handleBack";
import { IUser } from "../../users/userInterface";
import { usersSelectors } from "../../users/userSlice";
import useCreateTeam from "./useCreateTeam";

function CreateTeam() {
  const { handleSubmit, handleChange, errors, values, isSubmitting, handleFormValidation } = useCreateTeam();

  const users = useSelector((state: RootState) => usersSelectors.selectAll(state));
  const manager = users.filter((user: IUser) => user.role === "manager");

  return (
    <div className="container mx-auto px-4">
      <div className="w-full flex flex-col bg-base-100">
        <div className="w-full order-1 flex justify-between">
          <h2 className="h6 font-bold capitalize">Add New Team</h2>
          <button
            type="button"
            aria-label="Edit User"
            onClick={handleBack}
            className="cursor-pointe ml-auto hover:text-base-content/40"
          >
            <ArrowBackSharpIcon className="w-8 h-8" />
          </button>
        </div>
        <div className="w-full order-2">
          <form onSubmit={handleSubmit} className="w-full rounded pt-3">
            <InputField3
              label="Name"
              placeholder="Enter team name"
              onChange={handleChange}
              value={values.name}
              error={errors.name}
              name="name"
            />
            <InputField3
              label="Description"
              placeholder="Describe the team"
              onChange={handleChange}
              value={values.description}
              name="description"
              error={errors.description}
              inputType="textarea"
            />
            <Select
              className="border-b-[1px] border-base-content/40 h-13 text-sm gap-4 "
              labelClass="mr-2 lg:mr-8"
              label="Manager"
              placeholder="Select team manager"
              usersOption={manager}
              value={values.managerId}
              name="managerId"
              handleChange={handleChange}
            />

            <div className="w-full flex mt-4 justify-center">
              <button
                type="submit"
                className="px-8 py-3 button text-center text-base-content border transition-all bg-base-300 hover:scale-[105%] hover:shadow-lg hover:shadow-base-300 hover:bg-base-content hover:text-base-300  rounded-lg cursor-pointer ease-in"
                onClick={handleFormValidation}
              >
                {isSubmitting ? "Loading..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateTeam;
