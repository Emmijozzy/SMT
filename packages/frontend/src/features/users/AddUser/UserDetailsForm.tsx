import { FormikErrors } from "formik";
import { ChangeEvent, FocusEvent } from "react";
import InputField from "../../../shared/components/InputField";
import AddUser from "./AddUserInterface";

type Props = {
  handleBlur: (e: FocusEvent<unknown, Element>) => void;
  handleChange: (e: ChangeEvent<unknown>) => void;
  errors: FormikErrors<AddUser>;
  values: AddUser;
};
function UserDetailsForm({ handleBlur, handleChange, values, errors }: Props) {
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
        value={values.whatsappLink}
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
        value={values.facebookLink}
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
        value={values.linkedInLink}
        onBlur={handleBlur}
        error={`${errors.linkedInLink || ""}`}
      />
      <div className="mt-4 flex flex-wrap gap-2 justify-center">
        <select
          name="role"
          id="role"
          className="relative select select-secondary w-full max-w-xs capitalize"
          onChange={handleChange}
          onBlur={handleBlur}
          defaultValue="select"
        >
          <option disabled value="select">
            Select user role
          </option>
          <option value="team_member">Team Member</option>
          <option value="manager">Manager</option>
          <option value="admin">Admin</option>
        </select>
        <select
          className="select select-secondary w-full max-w-xs"
          name="team"
          id="team"
          onChange={handleChange}
          onBlur={handleBlur}
          defaultValue="select"
        >
          <option disabled value="select">
            Select user Department
          </option>
          <option>Developer</option>
          <option>UI/UX</option>
          <option>Data Analysit</option>
        </select>
      </div>
    </div>
  );
}
export default UserDetailsForm;
