/* eslint-disable jsx-a11y/label-has-associated-control */
import { FormikErrors } from "formik";
import { ChangeEvent } from "react";
import Button2 from "../../../shared/components/Button2";
import { ISubtask } from "../subtaskInterface";
import { ChecklistSection } from "./components/ChecklistSection";
import { RequiredFieldsSection } from "./components/RequiredFieldsSection";
import { SubtaskBasicInfo } from "./components/SubtaskBasicInfo";
import { CheckLists, RequiredFields } from "./useAddSubtask";

type Props = {
  handleSubmit: () => void;
  handleChange: (e: ChangeEvent<unknown>) => void;
  errors: FormikErrors<ISubtask>;
  values: Partial<ISubtask>;
  checklists: CheckLists;
  requiredFields: RequiredFields;
  handleAddCheckList: (checkList: CheckLists[number]) => void;
  handleRemoveCheckList: (id: string) => void;
  handleAddRequiredField: (requiredField: RequiredFields[number]) => void;
  handleRemoveRequiredField: (id: string) => void;
};

function AddSubtaskForm({
  handleSubmit,
  handleChange,
  errors,
  values,
  checklists,
  requiredFields,
  handleAddCheckList,
  handleRemoveCheckList,
  handleAddRequiredField,
  handleRemoveRequiredField,
}: Props) {
  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6 p-4">
      <SubtaskBasicInfo handleChange={handleChange} errors={errors} values={values} />

      <ChecklistSection checklists={checklists} onAdd={handleAddCheckList} onRemove={handleRemoveCheckList} />
      <RequiredFieldsSection
        requiredFields={requiredFields}
        handleAddRequiredField={handleAddRequiredField}
        handleRemoveRequiredField={handleRemoveRequiredField}
      />

      <Button2 type="submit" className="w-full sm:w-32 mx-auto mt-6">
        Submit
      </Button2>
    </form>
  );
}
export default AddSubtaskForm;
