/* eslint-disable react/button-has-type */
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  type?: "submit" | "reset" | "button" | undefined;
  onClick: () => void;
};
function Button2({ children, className, onClick, type = "button" }: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 button text-center text-base-content border transition-all bg-base-300 hover:scale-[105%] hover:shadow-lg hover:shadow-base-300 hover:bg-base-content hover:text-base-300  rounded-lg cursor-pointer ease-in ${className || ""} `}
    >
      {children}
    </button>
  );
}

Button2.defaultProps = {
  className: "",
  type: "button",
};

export default Button2;
