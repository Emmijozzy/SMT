import { FormikErrors } from "formik";
import { ChangeEvent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import InputField3 from "../../../shared/components/InputField3";
import Select from "../../../shared/components/Select";
import { teamSelectors } from "../../teams/teamSlice";
import User from "../userInterface";

type Props = {
  handleChange: (e: ChangeEvent<unknown>) => void;
  errors: FormikErrors<User>;
  values: User;
  disabled?: boolean;
};
function UserDetailsForm({ handleChange, values, errors, disabled }: Props) {
  const teams = useSelector((state: RootState) => teamSelectors.selectAll(state));
  const renderInputField = <T extends keyof User>(id: T, label: string, type: string, halfWith = false) => (
    <InputField3
      bodyClassName={`w-full ${halfWith ? "md:w-1/2" : ""}`}
      className="w-full"
      name={id}
      label={label}
      type={type}
      onChange={handleChange}
      value={String(values[id])}
      error={errors[id] ? String(errors[id]) : ""}
      disabled={disabled}
    />
  );

  const renderSelectField = <T extends keyof User>(id: T, label: string, options: string[]) => (
    <Select
      className="lg:w-[49%] border-b-[1px] border-base-content/40 h-13 text-sm gap-9 "
      labelClass="mr-2 lg:mr-8"
      label={label}
      placeholder={`Select ${label}`}
      options={options}
      name={id}
      handleChange={handleChange}
      // disabled={disabled}
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
        {renderSelectField("team", "Team", [...teams.map((team) => team.name)])}
      </div>
    </div>
  );
}

UserDetailsForm.defaultProps = {
  disabled: false,
};

export default UserDetailsForm;
