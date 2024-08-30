import { ChangeEvent } from "react";

type Props = {
  name: string;
  placeholder: string;
  options: string[];
  value?: string;
  label: string;
  className?: string;
  handleChange: (e: ChangeEvent<unknown>) => void;
};
function Select({ placeholder, options, label, value = "", handleChange,  className, name}: Props) {
  return (
    <div className={`w-full flex text-lg border-b-2 border-base-content items-center gap-2 ${className || ""}`}>
      <span className="font-bold capitalize">{label}:</span>
      <select
        name={name}
        id={name}
        className="relative select select-secondary text-lg w-full max-w-xs capitalize border-0 rounded-none focus:border-0 focus:outline-none mx-2 rounded-t"
        onChange={handleChange}
        defaultValue={value}
      >
        <option value="">{placeholder}</option>
        {options &&
          options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
      </select>
    </div>
  );
}

Select.defaultProps = {
  value: "",
  className: "",
};
export default Select;
