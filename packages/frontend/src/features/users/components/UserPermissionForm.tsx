import { ChangeEvent, FocusEvent } from "react";
import ToggleSwitch from "../../../shared/components/ToggleSwitch";
import User from "../userInterface";

type Props = {
  handleBlur: (e: FocusEvent<unknown, Element>) => void;
  handleChange: (e: ChangeEvent<unknown>) => void;
  values: User;
};

function UserPermissionForm({ handleBlur, handleChange, values }: Props) {
  const permissions = [
    { id: "canCreateTasks", label: "Can Create Tasks" },
    { id: "canEditTasks", label: "Can Edit Tasks" },
    { id: "canDeleteTasks", label: "Can Delete Tasks" },
    { id: "canAddSubtasks", label: "Can Add Subtasks" },
    { id: "canReassignTasks", label: "Can Reassign Tasks" },
    { id: "canViewReports", label: "Can View Reports" },
    { id: "canEditUsers", label: "Can Edit Users" },
    { id: "canDeleteUsers", label: "Can Delete Users" },
    { id: "canAssignRole", label: "Can Assign Roles" },
  ];

  return (
    <div className="w-full h-full">
      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4">
        {permissions.map(({ id, label }) => (
          <ToggleSwitch
            key={id}
            id={id}
            label={label}
            value={values[id as keyof User] as boolean}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        ))}
      </div>
    </div>
  );
}

export default UserPermissionForm;
