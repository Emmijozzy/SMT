import { useState } from "react";

export function TaskCreationForm2({ onCreate }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [checklist, setChecklist] = useState([]);
  const [requiredFields, setRequiredFields] = useState([]);

  const handleCreate = () => {
    onCreate({
      title,
      description,
      checklist,
      requiredFields,
    });
  };

  return (
    <div>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Task Title" />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Task Description" />
      <div>
        <h4>Checklist</h4>
        {checklist.map((item, index) => (
          <div key={index}>
            <input
              type="text"
              value={item}
              onChange={(e) => setChecklist(checklist.map((i, idx) => (idx === index ? e.target.value : i)))}
            />
          </div>
        ))}
        <button onClick={() => setChecklist([...checklist, ""])}>Add Checklist Item</button>
      </div>
      <div>
        <h4>Required Fields</h4>
        {requiredFields.map((field, index) => (
          <div key={index}>
            <input
              type="text"
              value={field}
              onChange={(e) => setRequiredFields(requiredFields.map((f, idx) => (idx === index ? e.target.value : f)))}
            />
          </div>
        ))}
        <button onClick={() => setRequiredFields([...requiredFields, ""])}>Add Required Field</button>
      </div>
      <button onClick={handleCreate}>Create Task</button>
    </div>
  );
}
