import { ChangeEvent, FocusEvent } from "react";

type Props = {
  inputbodyClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<unknown, Element>) => void;
  error: string;
  type?: string;
  value: string;
  label: string;
  id: string;
  placeholder?: string;
};

function InputField({
  inputClassName,
  inputbodyClassName,
  labelClassName,
  onChange,
  onBlur,
  error,
  type,
  value,
  label,
  id,
  placeholder,
}: Props) {
  return (
    <div className={`relative h-12 mt-4 ${inputbodyClassName || ""}`}>
      <span className="absolute top-0 right-0 text-[0.5rem] lg:text-[0.7rem] text-error">{error}</span>
      <input
        required
        className={`w-full h-full border-b-2 border-base-content/50 rounded-t-lg py-1 focus:border-b-2 focus:border-primary transition-colors focus:outline-none peer bg-inherit ${inputClassName || ""}`}
        id={id}
        name={id}
        type={type || "text"}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
      />
      <label
        className={`absolute top-1/2 translate-y-[-50%] bg-transparent left-0 px-0 peer-focus:top-0 peer-focus:left-0 text-sm leading-4 font-bold capitalize peer-focus:text-xs peer-focus:font-bold peer-focus:text-primary peer-valid:-top-0 peer-valid:left-0 peer-valid:text-xs peer-valid:font-bold peer-valid:text-primary duration-150 ${labelClassName || ""}`}
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
}

InputField.defaultProps = {
  inputbodyClassName: "",
  inputClassName: "",
  labelClassName: "",
  type: "",
  onChange: () => {},
  onBlur: () => {},
  placeholder: "",
};

export default InputField;
