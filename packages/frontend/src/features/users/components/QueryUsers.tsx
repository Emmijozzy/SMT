import { ChangeEvent } from "react";
import InputField3 from "../../../shared/components/InputField3";
import Select from "../../../shared/components/Select";
// import useFilteredQuery from "../UserTable/useFilteredQuery";

type Props = {
  showFileterd: boolean;
  handleSubmit: () => void;
  handleChange: (e: ChangeEvent<any>) => void;
  values: Record<string, string>;
  isSubmitting: boolean;
};

function QueryUsers({ showFileterd, handleChange, handleSubmit, values, isSubmitting }: Props) {
  return (
    <div className={`w-full transition ${showFileterd ? "" : "hidden"}`}>
      <form onSubmit={handleSubmit}>
        <InputField3
          label="Fullname"
          placeholder="Enter name"
          onChange={handleChange}
          value={values.fullName}
          name="fullName"
        />
        <InputField3
          label="email"
          placeholder="Enter email"
          onChange={handleChange}
          value={values.email}
          name="email"
        />
        <InputField3
          label="Status"
          placeholder="Enter your firstname"
          onChange={handleChange}
          value={values.status}
          name="email"
        />
        <div className=" w-full mt-4 flex flex-wrap gap-2 justify-between">
          <Select
            className="lg:w-[49%] border-b-[1px] border-base-content/40 h-13 text-sm gap-9 "
            labelClass="mr-2 lg:mr-8"
            label="role"
            placeholder="Select user role"
            options={["team_member", "manager", "Admin"]}
            name="role"
            handleChange={handleChange}
          />
          <Select
            className="lg:w-[49%] border-b-[1px] border-base-content/40 h-13 text-sm gap-9 "
            labelClass="mr-2 lg:mr-8"
            label="Dept."
            placeholder="Select user Department"
            options={["developer", "ui/ux", "data_analysit"]}
            name="team"
            handleChange={handleChange}
          />
        </div>
        <div className="w-full flex mt-4 justify-center">
          <button
            type="submit"
            className="px-8 py-3 button text-center text-base-content border transition-all bg-base-300 hover:scale-[105%] hover:shadow-lg hover:shadow-base-300 hover:bg-base-content hover:text-base-300  rounded-lg cursor-pointer ease-in"
            // onClick={handleFormValidation}
          >
            {isSubmitting ? "Loading..." : "Search"}
          </button>
        </div>
      </form>
    </div>
  );
}
export default QueryUsers;
