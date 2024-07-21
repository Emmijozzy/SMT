import { ReactNode } from "react";

type Props = {
  className?: string;
  children: ReactNode;
};
function Section({ className, children }: Props) {
  return (
    <section className="w-full h-full z-10 pb-4">
      <div className={`relative w-full h-full bg-base-200 transition-all ${className || ""}`}>
        <div className="absolute top-0 left-0 w-full h-full bg-base-200 rounded-lg flex flex-col flex-nowrap gap-4 ">
          {children}
        </div>
      </div>
    </section>
  );
}

Section.defaultProps = {
  className: "",
};

export default Section;
