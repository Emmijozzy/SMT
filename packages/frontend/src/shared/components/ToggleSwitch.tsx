import { ChangeEvent, FocusEvent } from "react";

/* eslint-disable jsx-a11y/label-has-associated-control */
type Props = {
  id: string;
  label: string;
  value: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<unknown, Element>) => void;
};

function ToggleSwitch({ id, label, value = false, onChange, onBlur }: Props) {
  return (
    <div className="grid grid-cols-[75%,auto]  items-center gap-4  capitalize border-b py-2">
      <span className="text-lg leading-4">{label}</span>
      <label htmlFor={id} className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" id={id} checked={value} className="sr-only peer" onChange={onChange} onBlur={onBlur} />
        <div className="group peer ring-0 bg-gradient-to-tr from-rose-100 via-rose-400 to-rose-500 justify-self-center rounded-full outline-none duration-300 after:duration-300 w-[3em] h-6  shadow-md peer-checked:bg-emerald-500  peer-focus:outline-none  after:content-['✖️'] after:text-xs  after:rounded-full after:absolute after:bg-gray-50 after:outline-none after:h-6 after:w-6 after:top-0 after:left-0 after:-rotate-180 after:flex after:justify-center after:items-center peer-checked:after:translate-x-7 peer-checked:after:content-['✔️'] peer-hover:after:scale-95 peer-checked:after:rotate-0 peer-checked:bg-gradient-to-tr peer-checked:from-green-100 peer-checked:via-lime-400 peer-checked:to-lime-500" />
      </label>
    </div>
  );
}

ToggleSwitch.defaultProps = {
  onChange: () => {},
  onBlur: () => {},
};

export default ToggleSwitch;
