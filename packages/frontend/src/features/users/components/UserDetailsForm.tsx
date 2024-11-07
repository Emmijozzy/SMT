import { FormikErrors } from "formik";
import { ChangeEvent, FocusEvent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import InputField from "../../../shared/components/InputField";
import Select from "../../../shared/components/Select";
import { teamSelectors } from "../../teams/teamSlice";
import User from "../userInterface";

type Props = {
  handleBlur: (e: FocusEvent<unknown, Element>) => void;
  handleChange: (e: ChangeEvent<unknown>) => void;
  errors: FormikErrors<User>;
  values: User;
  disabled?: boolean;
};
function UserDetailsForm({ handleBlur, handleChange, values, errors, disabled }: Props) {
  const teams = useSelector((state: RootState) => teamSelectors.selectAll(state));
  const renderInputField = <T extends keyof User>(id: T, label: string, type: string, halfWith = false) => (
    <InputField
      inputbodyClassName={`w-full ${halfWith ? "md:w-1/2" : ""}`}
      inputClassName="w-full"
      id={id}
      label={label}
      type={type}
      onChange={handleChange}
      value={String(values[id])}
      onBlur={handleBlur}
      error={errors[id] ? String(errors[id]) : ""}
      disabled={disabled}
    />
  );

  const renderSelectField = <T extends keyof User>(id: T, label: string, options: string[]) => (
    <Select
      className="border-b-[1px] border-base-content/70 w-[49%]"
      name={id}
      handleChange={handleChange}
      label={label}
      placeholder={`Select ${label}`}
      options={options}
    />
  );

  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex flex-col md:flex-row md:gap-4">
        {renderInputField("firstName", "First Name", "text", true)}
        {renderInputField("lastName", "Last Name", "text", true)}
      </div>
      {renderInputField("email", "Email", "email")}
      {renderInputField("phoneNo", "Phone", "tel")}
      {renderInputField("location", "Location", "text")}
      {renderInputField("whatsappLink", "Whatsapp Link", "url")}
      {renderInputField("facebookLink", "Facebook Link", "url")}
      {renderInputField("linkedInLink", "LinkedIn Link", "url")}

      <div className=" w-full mt-3 flex flex-wrap gap-2 justify-between">
        {renderSelectField("role", "Role", ["team_member", "manager", "admin"])}
        {renderSelectField("team", "Team", ["developer", "UI/UX", "data analyst"])}
      </div>
    </div>
  );
}

UserDetailsForm.defaultProps = {
  disabled: false,
};

export default UserDetailsForm;
