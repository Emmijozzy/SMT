function TableHead() {
  return (
    <thead className="align-bottom">
      <tr className="border-b border-base-content/40 ">
        <th className="px-6 py-3 font-bold text-left uppercase align-middle text-md border-b-solid tracking-none whitespace-nowrap text-base-content/70 ">
          Details
        </th>
        <th className="px-6 py-3 pl-2 font-bold text-left uppercase align-middle bg-transparent shadow-none text-md border-b-solid tracking-none whitespace-nowrap text-base-content/70">
          Function
        </th>
        <th className="px-6 py-3 pl-2 font-bold text-left uppercase align-middle bg-transparent shadow-none text-md border-b-solid tracking-none whitespace-nowrap text-base-content/70">
          Status
        </th>
        <th className="px-6 py-3 pl-2 font-bold text-left uppercase bg-transparent shadow-none text-md border-b-solid tracking-none whitespace-nowrap text-base-content/70">
          Joined
        </th>
        <th className="px-6 py-3 font-semibold uppercase align-middle bg-transparent border-solid shadow-none tracking-none whitespace-nowrap text-base-content/70">
          Action
        </th>
      </tr>
    </thead>
  );
}
export default TableHead;
