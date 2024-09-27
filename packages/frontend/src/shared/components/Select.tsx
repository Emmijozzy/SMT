import { ChangeEvent } from "react";
import { IUser } from "../../features/users/userInterface";

type Props = {
  name: string;
  placeholder: string;
  options?: string[];
  usersOption?: IUser[];
  value?: string;
  label: string;
  className?: string;
  handleChange: (e: ChangeEvent<unknown>) => void;
  disabled?: boolean;
  labelClass?: string;
};
function Select({
  placeholder,
  options,
  label,
  labelClass = "",
  value = "",
  handleChange,
  className,
  name,
  usersOption,
  disabled,
}: Props) {
  return (
    <div
      className={`relative w-full flex text-lg border-b-2 border-base-content items-center justify-between  ${className || ""}`}
    >
      <span className={`font-bold capitalize ${labelClass}`}>{label}:</span>
      <div className={`w-full bg-base-100 rounded-t-md ${disabled ? "bg-base-200 cursor-not-allowed" : ""}`}>
        <select
          name={name}
          id={name}
          className="relative select select-secondary w-full max-w-xs capitalize border-0 rounded-none focus:border-0 focus:outline-none mx-2 rounded-t"
          onChange={handleChange}
          defaultValue={value}
          disabled={disabled}
        >
          <option value="">{placeholder}</option>
          {options &&
            options.map((option) => (
              <option key={option} value={option}>
                {option.replace("_", " ")}
              </option>
            ))}
          {usersOption &&
            usersOption.map((user) => (
              <option key={user.userId} value={user.userId}>
                {user.fullName}: ({user.role})
              </option>
            ))}
        </select>
      </div>
    </div>
  );
}

Select.defaultProps = {
  value: "",
  className: "",
  options: [],
  usersOption: [],
  disabled: false,
  labelClass: "",
};
export default Select;
