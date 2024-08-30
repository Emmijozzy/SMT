import { FormikErrors } from "formik";
import InputField2 from "../../../../shared/components/InputField2";
import { ITask } from "../../tasksInterface";
import { ChangeEvent } from "react";

type Props = {
  onSubmit: () => void;
  onPrevious: () => void;
  handleChange: (e: ChangeEvent<unknown>) => void;
  errors: FormikErrors<ITask>;
  values: ITask;
};
function FormStep3({ onSubmit, onPrevious, errors, handleChange, values }: Props) {
  return (
    <>
      <div className="w-full px-2">
        <InputField2
          label="Start Date"
          placeholder="Enter task title"
          onChange={handleChange}
          value={values.startDate}
          error={errors.startDate as string}
          name="startDate"
          type="date"
          />
        <InputField2
          label="End Date"
          placeholder="Enter task title"
          onChange={handleChange}
          value={values.dueDate}
          error={errors.dueDate as string}
          name="dueDate"
          type="date"
        />
      </div>
      <div className="w-full flex mt-4 justify-between bg-base-100 pt-4">
        <button
          type="button"
          className="px-8 py-3 button text-center text-base-content border transition-all bg-base-300 hover:scale-[105%] hover:shadow-lg hover:shadow-base-300 hover:bg-base-content hover:text-base-300  rounded-lg cursor-pointer ease-in"
          onClick={onPrevious}
        >
          Previous
        </button>
        <button
          type="submit"
          className="px-8 py-3 button text-center text-base-content border transition-all bg-base-300 hover:scale-[105%] hover:shadow-lg hover:shadow-base-300 hover:bg-base-content hover:text-base-300  rounded-lg cursor-pointer ease-in"
          onClick={onSubmit}
        >
          Submit
        </button>
      </div>
    </>
  );
}
export default FormStep3;
