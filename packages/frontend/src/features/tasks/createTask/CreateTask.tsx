/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable indent */
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { handleBack } from "../../../shared/utils/handleBack";
import { addAlert } from "../../alerts/AlertSlice";
import FormStep1 from "./components/FormStep1";
import FormStep2 from "./components/FormStep2";
import FormStep3 from "./components/FormStep3";
import useCreateTask from "./useCreateTask";

type Direction = "left" | "right" | "";

function CreateTask() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState<Direction>("");
  const [height, setHeight] = useState(0);
  const formRef = useRef<HTMLDivElement>(null);
  const formSubmitRef = useRef<HTMLFormElement>(null);

  const { handleSubmit, handleChange, errors, values, validateForm } = useCreateTask();

  const dispatch = useDispatch();

  useEffect(() => {
    const errs = Object.values(errors);
    errs.forEach((error) => {
      dispatch(addAlert({ message: error, type: "error" }));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleSubmit]);

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
      setHeight(formRef.current.scrollHeight);
    }
  }, [step, direction]);

  return (
    <div className="container">
      <div className="w-full flex flex-col md:flex-row-reverse md:justify-between bg-base-100">
        <div className="order-1 flex">
          <h2 className="md:hidden h6 font-bold capitalize">Add New User</h2>
          <button
            type="button"
            aria-label="Edit User"
            onClick={() => handleBack()}
            className="cursor-pointe ml-auto hover:text-base-content/40"
          >
            <ArrowBackSharpIcon className="w-8 h-8" />
          </button>
        </div>
      </div>
      <form ref={formSubmitRef} onSubmit={handleSubmit} className="w-full bg-base-200 rounded pt-3">
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
            className={`absolute w-full top-10 transition-transform duration-500 ease-in-out transform ${transitionClass || ""} ${stepClass}`}
            ref={formRef}
          >
            {step === 1 && (
              <FormStep1 onNext={handleNextStep} errors={errors} values={values} handleChange={handleChange} />
            )}
            {step === 2 && (
              <FormStep2
                onNext={handleNextStep}
                onPrevious={handlePreviousStep}
                values={values}
                handleChange={handleChange}
              />
            )}
            {step === 3 && (
              <FormStep3
                // onSubmit={handleSubmit}
                onPrevious={handlePreviousStep}
                values={values}
                errors={errors}
                handleChange={handleChange}
                validate={validateForm}
              />
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
export default CreateTask;
