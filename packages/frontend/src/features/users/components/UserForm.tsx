import { FormikErrors } from "formik";
import React from "react";
import User from "../userInterface";
import Password from "./Password";
import UserDetailsForm from "./UserDetailsForm";
import UserPermissionForm from "./UserPermissionForm";

type Props = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleBlur: (e: React.FocusEvent<unknown>) => void;
  handleChange: (e: React.ChangeEvent<unknown>) => void;
  handleFormValidation: () => void;
  errors: FormikErrors<User>;
  values: User;
  isSubmitting: boolean;
};

function UserForm({
  handleBlur,
  handleChange,
  handleSubmit,
  handleFormValidation,
  errors,
  values,
  isSubmitting,
}: Props) {
  return (
    <form onSubmit={handleSubmit}>
      <div role="tablist" className="tabs tabs-boxed">
        <input type="radio" name="my_tabs_2" role="tab" className="tab h-10 " aria-label="Details" defaultChecked />
        <div role="tabpanel" className="tab-content bg-base-200 px-2 pb-4">
          <UserDetailsForm handleChange={handleChange} errors={errors} values={values} />
        </div>

        <input type="radio" name="my_tabs_2" role="tab" className="tab h-10" aria-label="Permissions" />
        <div role="tabpanel" className="tab-content bg-base-200 px-2 pb-4">
          <UserPermissionForm handleBlur={handleBlur} handleChange={handleChange} values={values} />
        </div>

        <input type="radio" name="my_tabs_2" role="tab" className="tab h-10" aria-label="Password" />
        <div role="tabpanel" className="tab-content bg-base-200 px-2 pb-4">
          <Password handleChange={handleChange} errors={errors} values={values} />
        </div>
      </div>

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
  );
}

export default UserForm;
