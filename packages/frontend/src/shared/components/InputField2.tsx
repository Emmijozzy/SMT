import React from "react";

type Props = {
  label: string;
  placeholder?: string;
  value: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
  type?: string;
  className?: string;
  bodyClassName?: string;
  name: string;
};

function InputField2({
  label,
  placeholder,
  value,
  onChange,
  error,
  disabled,
  type,
  className,
  name,
  bodyClassName,
}: Props) {
  return (
    <div className={`grid w-full h-16 items-center border-b-2 border-base-content ${bodyClassName || ""}`}>
      <label htmlFor={name} className="relative flex items-center gap-4">
        <p className="w-fit md:w-fit md:min-w-24 body-1 mt-3 whitespace-nowrap font-bold capitalize">{label}: </p>
        {error && <span className="absolute top-0 right-0 mt-2 label-text-alt text-error">{error}</span>}
        <input
          name={name}
          id={name}
          type={type}
          placeholder={placeholder}
          className={`input mt-3 px-2 body-1 outline-none rounded-b-none rounded-t-md border-none border-2 input-primary w-full  border-t-none ${className || ""}`}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
        {/* <input
          name={name}
          type={type}
          className="w-full h-full px-3 py-3 font-sans text-sm font-normal uppercase transition-all bg-transparent border rounded-md peer border-blue-gray-200 text-blue-gray-700 outline outline-0 placeholder-border placeholder-border-blue-gray-200 placeholder-border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 "
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          // onBlur={onBlur}
          disabled={disabled}
          autoComplete="off"
        /> */}
      </label>
    </div>
  );
}
export default InputField2;

InputField2.defaultProps = {
  placeholder: "",
  onChange: () => {},
  error: "",
  disabled: false,
  type: "text",
  className: "",
  bodyClassName: "",
};
