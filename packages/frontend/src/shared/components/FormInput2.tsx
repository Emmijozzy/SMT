import { ChangeEvent } from "react";

type Props = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  className?: string;
};

function FormInput2({ value, onChange, placeholder, className }: Props) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e)}
      placeholder={placeholder}
      className={`input input-bordered w-full ${className || ""}`}
    />
  );
}

FormInput2.defaultProps = {
  className: "",
};

export default FormInput2;
