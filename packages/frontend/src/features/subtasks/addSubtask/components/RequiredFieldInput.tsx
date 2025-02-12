type RequiredFieldInputProps = {
  value: string;
  type: "text" | "link";
  onValueChange: (value: string) => void;
  onTypeChange: (type: "text" | "link") => void;
  onAdd: () => void;
};

export function RequiredFieldInput({ value, type, onValueChange, onTypeChange, onAdd }: RequiredFieldInputProps) {
  return (
    <div className="form-control w-full mx-auto mt-4">
      <div className="input-group flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
          placeholder="Add Required Field"
          className="input input-bordered w-full"
        />
        <select
          value={type}
          onChange={(e) => onTypeChange(e.target.value as "text" | "link")}
          className="select select-bordered rounded-lg select-md w-full max-w-xs h-[0.5rem]"
        >
          <option value="text">Text</option>
          <option value="link">Link</option>
        </select>
        <button type="button" className="btn btn-primary w-full sm:w-auto whitespace-nowrap" onClick={onAdd}>
          Add Item
        </button>
      </div>
    </div>
  );
}
