/* eslint-disable indent */
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import FormStep1 from "./components/FormStep1";
import FormStep2 from "./components/FormStep2";
import FormStep3 from "./components/FormStep3";
import useCreateTask from "./useCreateTask";

type Direction = "left" | "right" | "";

function CreateTask() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState<Direction>("");
  const [height, setHeight] = useState(0);
  // const [width, setWidth] = useState(0);
  const formRef = useRef<HTMLDivElement>(null);

  const {
    handleSubmit,
    handleChange,
    errors,
    values,
    isSubmitting,
  } = useCreateTask()

  const handleNextStep = () => {
    setDirection("right");
    setStep((prevStep) => prevStep + 1);
  };

  const handlePreviousStep = () => {
    setDirection("left");
    setStep((prevStep) => prevStep - 1);
  };

  let transitionClass;
  if (direction === "left") {
    if (step === 1) {
      transitionClass = "right-[200%] translate-x-[200%]";
    } else {
      transitionClass = "right-full translate-x-full";
    }
  } else if (direction === "right") {
    if (step === 3) {
      transitionClass = "left-[200%] -translate-x-[200%]";
    } else {
      transitionClass = "left-full -translate-x-full";
    }
  }
  const stepClass = direction === "right" ? "slide-right" : "slide-left";

  useEffect(() => {
    if (formRef.current) {
      // Adjust the height of the container based on the content
      setHeight(formRef.current.scrollHeight);
      // setWidth(formRef.current.scroll);
    }
  }, [step, direction]);

  console.log(step);

  return (
    <div className="container">
      <div className="w-full flex flex-col md:flex-row-reverse md:justify-between bg-base-100">
        <div className="order-1 flex">
          <h2 className="md:hidden h6 font-bold capitalize">Add New User</h2>
          <button
            type="button"
            aria-label="Edit User"
            // onClick={() => handleShowEdit()}
            className="cursor-pointe ml-auto hover:text-base-content/40"
          >
            <Link to="/dash/tasks">
              <ArrowBackSharpIcon className="w-8 h-8" />
            </Link>
          </button>
        </div>
      </div>
      <form className="w-full bg-base-200 rounded pt-3">
        <div className="flex flex-col w-full relative overflow-hidden" style={{ height: `${height + 40}px` }}>
          <ul className="flex items-center h-10 gap mx-auto">
            <li
              className={`py-2 px-3 font-bold rounded-l ${step === 1 ? "bg-base-200 text-base-content" : "bg-base-content text-base-200 "}`}
            >
              General
            </li>
            <li
              className={`py-2 px-3 font-bold  ${step === 2 ? "bg-base-200 text-base-content" : "bg-base-content text-base-200 "} `}
            >
              Assignment
            </li>
            <li
              className={`py-2 px-3 font-bold rounded-r ${step === 3 ? "bg-base-200 text-base-content" : "bg-base-content text-base-200 "} `}
            >
              TimeFrame
            </li>
          </ul>
          <div
            className={`absolute w-full top-10 transition-transform duration-500 ease-in-out transform ${transitionClass} ${stepClass}`}
            ref={formRef}
            // style={{ right: direction == "right" ? "-100%" : direction == "left" ? "100%" : "0" }}
          >
            {step === 1 && <FormStep1 onNext={handleNextStep} errors={errors} values={values} handleChange={handleChange} />}
            {step === 2 && <FormStep2 onNext={handleNextStep} onPrevious={handlePreviousStep} values={values} handleChange={handleChange} />}
            {step === 3 && <FormStep3 onSubmit={handleSubmit} onPrevious={handlePreviousStep} values={values} errors={errors} handleChange={handleChange} />}
          </div>
        </div>
      </form>
    </div>
  );
}
export default CreateTask;

// <div className="max-w-md mx-auto p-8 border rounded shadow-md mt-10">
//   {step === 1 && <FormStep1 onNext={handleNextStep} />}
//   {step === 2 && <FormStep2 onNext={handleNextStep} onPrevious={handlePreviousStep} />}
//   {step === 3 && <FormStep3 onSubmit={handleSubmit} onPrevious={handlePreviousStep} />}
//   <div className="mt-4 text-gray-500">Step {step} of 3</div>
// </div>
