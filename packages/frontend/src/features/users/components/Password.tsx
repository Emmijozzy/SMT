import { FormikErrors } from "formik";
import { ChangeEvent } from "react";
import InputField3 from "../../../shared/components/InputField3";
import User from "../userInterface";

type Props = {
  handleChange: (e: ChangeEvent<unknown>) => void;
  errors: FormikErrors<User>;
  values: User;
};
function Password({ handleChange, errors, values }: Props) {
  return (
    <div className="flex flex-col flex-nowrap text-base-content">
      <InputField3
        bodyClassName="w-full"
        className="ml-8"
        name="password"
        label="password"
        type="password"
        placeholder="                                      **********"
        onChange={handleChange}
        value={values.password}
        error={`${errors.password || ""}`}
      />
      <InputField3
        bodyClassName="w-full"
        className="ml-2"
        name="confirmPassword"
        label="Confirm password"
        type="password"
        placeholder="                                         **********"
        onChange={handleChange}
        value={values.confirmPassword}
        error={`${errors.confirmPassword || ""}`}
      />
    </div>
  );
}
export default Password;
