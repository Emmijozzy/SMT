type Props = {
  isSubmitting: boolean;
  name: string;
  className?: string;
};

function Button({ isSubmitting, name, className }: Props) {
  return (
    <button
      className={`block w-full h-14 select-none rounded-lg bg-[#e7469b] py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-400/20 transition-all hover:shadow-lg hover:shadow-[#e7469b66] focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ${className || ""}`}
      type="submit"
      data-ripple-light="true"
      disabled={isSubmitting}
    >
      {isSubmitting ? "Submitting..." : name}
    </button>
  );
}

Button.defaultProps = {
  className: "",
};

export default Button;
