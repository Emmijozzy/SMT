import { memo } from "react";

/* eslint-disable jsx-a11y/control-has-associated-label */
const TableHead = memo(() => (
  <thead>
    <tr>
      <th className=" w-72 px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-base-200 text-base-content/80 border-primary">
        Name
      </th>
      <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-base-200 text-base-content/80 border-primary">
        Members
      </th>
      <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-base-200 text-base-content/80 border-primary">
        Not Started Task
      </th>
      <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-base-200 text-base-content/80 border-primary">
        Pending Tasks
      </th>
      <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-base-200 text-base-content/80 border-primary">
        Completed Tasks
      </th>
      <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-base-200 text-base-content/80 border-primary">
        Closed Tasks
      </th>
      <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-base-200 text-base-content/80 border-primary">
        {" "}
      </th>
    </tr>
  </thead>
));
export default TableHead;
