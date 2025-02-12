import { useState } from "react";

export function TaskSubmissionForm({ task, onSubmit }) {
  const [summary, setSummary] = useState("");
  const [deliverables, setDeliverables] = useState([]);
  const [checklist, setChecklist] = useState(task.checklist);

  const handleSubmit = () => {
    onSubmit({ summary, deliverables, checklist });
  };

  const isFormValid = () => summary && deliverables.length > 0 && checklist.every((item) => item.completed);

  return (
    <div>
      <textarea value={summary} onChange={(e) => setSummary(e.target.value)} placeholder="Summary of work done" />
      <input type="file" onChange={(e) => setDeliverables([...e.target.files])} />
      <div>
        <h4>Checklist</h4>
        {checklist.map((item, index) => (
          <label key={index}>
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() =>
                setChecklist(checklist.map((i, idx) => (idx === index ? { ...i, completed: !i.completed } : i)))
              }
            />
            {item.label}
          </label>
        ))}
      </div>
      <button onClick={handleSubmit} disabled={!isFormValid()}>
        Submit for Review
      </button>
    </div>
  );
}
