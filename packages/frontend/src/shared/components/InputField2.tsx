import React, { ChangeEvent } from "react";

type Props = {
  label: string;
  placeholder?: string;
  value: string | number;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  disabled?: boolean;
  type?: string;
  className?: string;
  bodyClassName?: string;
  name: string;
  inputType?: "input" | "textarea";
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
  inputType = "input",
}: Props) {
  return (
    <div className={`grid w-full min-h-16 items-center border-b-2 border-base-content ${bodyClassName || ""}`}>
      <label htmlFor={name} className="relative flex items-center gap-2">
        <p className="w-fit md:w-fit md:min-w-24 text-lg mt-3 whitespace-nowrap font-bold capitalize">{label}: </p>
        {error && <span className="absolute top-0 right-0 mt-2 label-text-alt text-error">{error}</span>}
        {inputType === "input" && (
          <input
            name={name}
            id={name}
            type={type}
            placeholder={placeholder}
            className={`input mt-3 px-2 text-lg outline-none rounded-b-none rounded-t-md border-none border-2 input-primary w-full  border-t-none ${className || ""}`}
            value={value}
            onChange={onChange}
            disabled={disabled}
          />
        )}
        {inputType === "textarea" && (
          <textarea
            id={name}
            name={name}
            rows={10}
            // cols={20}
            className="w-full ml-2 bg-base-100 mt-2 rounded-t-md p-2 outline-none border-none"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled}
          >
            It was a dark and stormy night...
          </textarea>
        )}
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
  inputType: "input",
};
