import React from "react";

type Props = {
  label: string;
  placeholder?: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
  type?: string;
};

function ProfileInput({ label, placeholder, value, onChange, error, disabled, type }: Props) {
  return (
    <div className="grid w-full h-16 items-center border-b-2 border-base-content">
      <label htmlFor="firstname" className="relative flex items-center gap-4">
        <p className="w-fit md:w-fit md:min-w-24 body-1 mt-3 whitespace-nowrap font-bold capitalize">{label}: </p>
        {error && <span className="absolute top-0 right-0 mt-2 label-text-alt text-error">{error}</span>}
        <input
          id="firstname"
          type={type}
          placeholder={placeholder}
          className="input mt-3 body-1 outline-none rounded-b-none rounded-t-md border-none border-2 input-primary w-full  border-t-none"
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
      </label>
    </div>
  );
}
export default ProfileInput;

ProfileInput.defaultProps = {
  placeholder: "",
  onChange: () => {},
  error: "",
  disabled: false,
  type: "text",
};
