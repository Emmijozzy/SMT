import { ChangeEvent } from "react";

type Props = {
  handleRowPerPage: (e: ChangeEvent<HTMLSelectElement>) => void;
};
function RowPerPage({ handleRowPerPage }: Props) {
  return (
    <div className="h-12 w-full flex items-center justify-between px-6">
      <div className="text-base-content/70 text-md">
        <span className="text-md pr-1">Rows Per page: </span>
        <select
          name="show"
          id="select-show"
          className="select select-bordered select-xs text-md " /* onChange={handleChange} */
          onChange={(e) => handleRowPerPage(e)}
          defaultValue={5}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
          <option value={200}>200</option>
        </select>
      </div>
    </div>
  );
}
export default RowPerPage;
