/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";

interface Props {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  name: string;
  type: string;
  tagName: string;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  className?: string;
}

function FormInput({ value, onBlur, onChange, name, type, tagName, placeholder, disabled, error, className }: Props) {
  return (
    <div className="relative mb-2">
      <div className="relative  h-14 w-full min-w-[200px]">
        <input
          name={name}
          type={type}
          className={`w-full h-full px-3 py-3 font-sans text-sm font-normal uppercase transition-all bg-transparent border rounded-md peer border-blue-gray-200 text-blue-gray-700 outline outline-0 placeholder-border placeholder-border-blue-gray-200 placeholder-border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 ${className || ""}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
        />
        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
          {tagName}
        </label>
      </div>
      {error && <p className="absolute -bottom-5 text-xs transition-all text-error error ">{error}</p>}
    </div>
  );
}

FormInput.defaultProps = {
  placeholder: "",
  className: " ",
  error: "",
  disabled: false,
};

export default FormInput;
