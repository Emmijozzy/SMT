import { memo } from "react";

/* eslint-disable jsx-a11y/control-has-associated-label */
const TableHead = memo(() => (
  <thead>
    <tr>
      <th className=" w-72 px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-base-200 text-base-content/80 border-primary">
        Project
      </th>
      <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-base-200 text-base-content/80 border-primary">
        Team
      </th>
      <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-base-200 text-base-content/80 border-primary">
        Priority
      </th>
      <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-base-200 text-base-content/80 border-primary">
        Status
      </th>
      <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-base-200 text-base-content/80 border-primary">
        Users
      </th>
      <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-base-200 text-base-content/80 border-primary">
        Completion{" "}
      </th>
      <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-base-200 text-base-content/80 border-primary">
        Due
      </th>
      <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-base-200 text-base-content/80 border-primary" />
    </tr>
  </thead>
));
export default TableHead;
