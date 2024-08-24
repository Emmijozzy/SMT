import { ChangeEvent, FocusEvent } from "react";
import ToggleSwitch from "../../../shared/components/ToggleSwitch";
import User from "../userInterface";

type Props = {
  handleBlur: (e: FocusEvent<unknown, Element>) => void;
  handleChange: (e: ChangeEvent<unknown>) => void;
  values: User;
};
function UserPermissionForm({ handleBlur, handleChange, values }: Props) {
  return (
    <div className="w-full h-full">
      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4">
        <ToggleSwitch
          id="canCreateTasks"
          label="Can Create Tasks"
          value={values.canCreateTasks}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <ToggleSwitch
          id="canEditTasks"
          label="can edit tasks"
          value={values.canEditTasks}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <ToggleSwitch
          id="canDeleteTasks"
          label="can delete users"
          value={values.canDeleteTasks}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <ToggleSwitch
          id="canAddSubtasks"
          label="can add subtasks"
          value={values.canAddSubtasks}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <ToggleSwitch
          id="canReassignTasks"
          label="can reassign tasks"
          value={values.canReassignTasks}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <ToggleSwitch
          id="canViewReports"
          label="can view Report"
          value={values.canViewReports}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <ToggleSwitch
          id="canEditUsers"
          label="can Edit users"
          value={values.canEditUsers}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <ToggleSwitch
          id="canDeleteUsers"
          label="can Edit users"
          value={values.canDeleteUsers}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <ToggleSwitch
          id="canAssignRole"
          label="can Assign roles"
          value={values.canAssignRole}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
    </div>
  );
}
export default UserPermissionForm;
