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
};
function Select({
  placeholder,
  options,
  label,
  value = "",
  handleChange,
  className,
  name,
  usersOption,
  disabled,
}: Props) {
  return (
    <div className={`w-full flex text-lg border-b-2 border-base-content items-center gap-2 ${className || ""}`}>
      <span className="font-bold capitalize">{label}:</span>
      <select
        name={name}
        id={name}
        className="relative select select-secondary text-lg w-full max-w-xs capitalize border-0 rounded-none focus:border-0 focus:outline-none mx-2 rounded-t"
        onChange={handleChange}
        defaultValue={value}
        disabled={disabled}
      >
        <option value="">{placeholder}</option>
        {options &&
          options.map((option) => (
            <option key={option} value={option}>
              {option}
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
  );
}

Select.defaultProps = {
  value: "",
  className: "",
  options: [],
  usersOption: [],
  disabled: false,
};
export default Select;
