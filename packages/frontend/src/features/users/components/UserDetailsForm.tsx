import { FormikErrors } from "formik";
import { ChangeEvent, FocusEvent } from "react";
import InputField from "../../../shared/components/InputField";
import User from "../userInterface";

type Props = {
  handleBlur: (e: FocusEvent<unknown, Element>) => void;
  handleChange: (e: ChangeEvent<unknown>) => void;
  errors: FormikErrors<User>;
  values: User;
  disabled?: boolean;
};
function UserDetailsForm({ handleBlur, handleChange, values, errors, disabled }: Props) {
  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex flex-col md:flex-row md:gap-4">
        <InputField
          inputbodyClassName="w-full md:w-1/2"
          inputClassName="w-full"
          id="firstName"
          label="First Name"
          onChange={handleChange}
          value={values.firstName}
          onBlur={handleBlur}
          error={`${errors.firstName || ""}`}
          disabled={disabled}
        />
        <InputField
          inputbodyClassName="w-full md:w-1/2"
          inputClassName="w-full"
          id="lastName"
          label="Last Name"
          onChange={handleChange}
          value={values.lastName}
          onBlur={handleBlur}
          error={`${errors.lastName || ""}`}
          disabled={disabled}
        />
      </div>
      <InputField
        inputbodyClassName="w-full"
        inputClassName=""
        id="email"
        label="Email"
        type="email"
        onChange={handleChange}
        value={values.email}
        onBlur={handleBlur}
        error={`${errors.email || ""}`}
      />
      <InputField
        inputbodyClassName="w-full"
        inputClassName=""
        id="phoneNo"
        type="tel"
        label="Phone"
        onChange={handleChange}
        value={values.phoneNo}
        onBlur={handleBlur}
        error={`${errors.phoneNo || ""}`}
      />
      <InputField
        inputbodyClassName="w-full"
        inputClassName=""
        id="location"
        label="Location"
        value={values.location}
        onChange={handleChange}
        onBlur={handleBlur}
        error={`${errors.location || ""}`}
      />
      <InputField
        inputbodyClassName="w-full"
        inputClassName=""
        id="whatsappLink"
        label="Whatsapp Link"
        type="url"
        onChange={handleChange}
        value={values.whatsappLink ? values.whatsappLink : ""}
        onBlur={handleBlur}
        error={`${errors.whatsappLink || ""}`}
      />
      <InputField
        inputbodyClassName="w-full"
        inputClassName=""
        id="facebookLink"
        label="Facebook ink"
        type="url"
        onChange={handleChange}
        value={values.facebookLink ? values.facebookLink : ""}
        onBlur={handleBlur}
        error={`${errors.facebookLink || ""}`}
      />
      <InputField
        inputbodyClassName="w-full"
        inputClassName=""
        id="linkedInLink"
        label="LinkedIn Link"
        type="url"
        onChange={handleChange}
        value={values.linkedInLink ? values.linkedInLink : ""}
        onBlur={handleBlur}
        error={`${errors.linkedInLink || ""}`}
      />
      <div className=" w-full mt-3 flex flex-wrap gap-2 justify-between">
        <div className="w-full md:w-[45%] flex text-lg border-b-2 border-base-content/60 items-center">
          <span>Role: </span>
          <select
            name="role"
            id="role"
            className="relative select select-secondary text-lg w-full max-w-xs capitalize border-0 rounded-none focus:border-0 focus:outline-none"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.role}
            defaultValue=""
          >
            <option value="">Select user role</option>
            <option value="team_member">Team Member</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="w-full md:w-[45%] flex text-lg border-b-2 border-base-content/60 items-center">
          <span>Dept.: </span>
          <select
            className="relative select select-secondary text-lg w-full max-w-xs capitalize border-0 rounded-none focus:border-0 focus:outline-none"
            name="team"
            id="team"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.team}
          >
            <option value="">Select user Department</option>
            <option value="developer">Developer</option>
            <option value="UI/UX">UI/UX</option>
            <option value="data analysit">Data Analysit</option>
          </select>
        </div>
      </div>
    </div>
  );
}

UserDetailsForm.defaultProps = {
  disabled: false,
};

export default UserDetailsForm;
