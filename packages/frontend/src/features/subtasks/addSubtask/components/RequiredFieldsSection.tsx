import { useState } from "react";
import { RequiredFields } from "../useAddSubtask";
import { RequiredFieldItems } from "./RequiredFieldItems";
import { RequiredFieldInput } from "./RequiredFieldInput";

type Props = {
  requiredFields: RequiredFields;
  handleRemoveRequiredField: (id: string) => void;
  handleAddRequiredField: (requiredField: RequiredFields[number]) => void;
};

// Create a separate component for required fields section
export function RequiredFieldsSection({ requiredFields, handleRemoveRequiredField, handleAddRequiredField }: Props) {
  const [requiredField, setRequiredField] = useState("");
  const [requiredFieldType, setRequiredFieldType] = useState<"text" | "link">("text");

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="border-b-[1px] border-base-content/40">
        <h6 className="h6 font-medium">Subtask Required Fields</h6>
      </div>
      <RequiredFieldItems fields={requiredFields} onRemove={handleRemoveRequiredField} />
      <RequiredFieldInput
        value={requiredField}
        type={requiredFieldType}
        onValueChange={setRequiredField}
        onTypeChange={setRequiredFieldType}
        onAdd={() => {
          handleAddRequiredField({
            id: `field_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            field: requiredField,
            input: "",
            type: requiredFieldType,
          });
          setRequiredField("");
        }}
      />
    </div>
  );
}
