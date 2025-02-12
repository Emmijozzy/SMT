type Props = {
  value: string;
  onChange: (value: string) => void;
  onAdd: () => void;
};

export function ChecklistInput({ value, onChange, onAdd }: Props) {
  return (
    <div className="form-control w-full mx-auto mt-4">
      <div className="input-group flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Add new checklist item"
          className="input input-bordered w-full"
        />
        <button type="button" className="btn btn-primary w-full sm:w-auto whitespace-nowrap" onClick={onAdd}>
          Add Item
        </button>
      </div>
    </div>
  );
}
