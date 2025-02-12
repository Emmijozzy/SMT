import { RequiredFieldItems } from "../../addSubtask/components/RequiredFieldItems";
import { RequiredFields } from "../../addSubtask/useAddSubtask";
import { SubtaskStatus } from "../../SubtaskStatus";

type Props = {
  requiredFields: RequiredFields;
  subtaskStatus: SubtaskStatus;
  onRequiredFieldChange?: (id: string, value: string) => void;
};

function RequiredFieldSection({ requiredFields, subtaskStatus, onRequiredFieldChange }: Props) {
  if (!requiredFields || requiredFields?.length === 0) return null;
  return (
    <div className="w-full bg-base-200 p-1 rounded-lg shadow-sm">
      <h6 className="text-xl font-semibold mb-2 mx-2">Required Fields</h6>
      <RequiredFieldItems
        onRequiredFieldChange={onRequiredFieldChange}
        fields={requiredFields}
        subtaskStatus={subtaskStatus}
      />
    </div>
  );
}

RequiredFieldSection.defaultProps = {
  onRequiredFieldChange: () => {},
};

export default RequiredFieldSection;
