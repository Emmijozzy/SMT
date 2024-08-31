import { FormikErrors } from "formik";
import { ChangeEvent } from "react";
import InputField2 from "../../../../shared/components/InputField2";
import Select from "../../../../shared/components/Select";
import { ITask } from "../../tasksInterface";

type Props = {
  onNext: () => void;
  handleChange: (e: ChangeEvent<unknown>) => void;
  errors: FormikErrors<ITask>;
  values: ITask;
};

function FormStep1({ onNext, handleChange, errors, values }: Props) {
  return (
    <div className="w-full">
      <div className="w-full h-full px-2">
        <InputField2
          label="title"
          placeholder="Enter task title"
          onChange={handleChange}
          value={values.title ? values.title : ""}
          error={errors.title}
          name="title"
        />
        <InputField2
          label="description"
          inputType="textarea"
          placeholder="Describe the task"
          onChange={handleChange}
          value={values.description ? values.description : ""}
          error={errors.description}
          name="description"
        />
        <Select
          name="priority"
          label="priority"
          placeholder="Select Priority"
          options={["High", "medium", "low"]}
          className="gap-[1.6rem] pt-2"
          handleChange={handleChange}
          value={values.priority}
        />
        <Select
          name="status"
          label="stutus"
          placeholder="Select Status"
          options={["not started", "in progress", "completed", "closed"]}
          className="gap-[1.6rem] pt-2"
          handleChange={handleChange}
          value={values.status}
        />
      </div>
      <div className="w-full h-full flex mt-3 justify-end bg-base-100 pt-4">
        <button
          type="button"
          className="px-8 py-3 button text-center text-base-content border transition-all bg-base-300 hover:scale-[105%] hover:shadow-lg hover:shadow-base-300 hover:bg-base-content hover:text-base-300  rounded-lg cursor-pointer ease-in"
          // onFocus={}
          onClick={onNext}
          // disabled={Form1ErrorExist}
        >
          Next
        </button>
      </div>
    </div>
  );
}
export default FormStep1;
