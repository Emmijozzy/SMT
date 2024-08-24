import { FormikErrors } from "formik";
import { ChangeEvent, FocusEvent } from "react";
import InputField from "../../../shared/components/InputField";
import User from "../userInterface";

type Props = {
  handleBlur: (e: FocusEvent<unknown, Element>) => void;
  handleChange: (e: ChangeEvent<unknown>) => void;
  errors: FormikErrors<User>;
  values: User;
};
function Password({ handleBlur, handleChange, errors, values }: Props) {
  return (
    <div className="flex flex-col flex-nowrap text-base-content">
      <InputField
        inputbodyClassName="w-full"
        inputClassName=""
        id="password"
        label="password"
        type="password"
        placeholder="                                      **********"
        onChange={handleChange}
        value={values.password}
        onBlur={handleBlur}
        error={`${errors.password || ""}`}
      />
      <InputField
        inputbodyClassName="w-full"
        inputClassName=""
        id="confirmPassword"
        label="Confirm password"
        type="password"
        placeholder="                                         **********"
        onChange={handleChange}
        value={values.confirmPassword}
        onBlur={handleBlur}
        error={`${errors.confirmPassword || ""}`}
      />
    </div>
  );
}
export default Password;
