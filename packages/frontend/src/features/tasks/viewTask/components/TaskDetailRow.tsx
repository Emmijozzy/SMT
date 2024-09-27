import React, { memo } from "react";

type Props = {
  label: string;
  value?: string;
  children?: React.ReactNode;
};

function TaskDetailRow({ label, value, children }: Props) {
  return (
    <tr className="w-full grid gridTemplateColumn text-[16px] leading-6 border-b-[1px] border-base-content/10">
      <td className="font-bold">
        <strong>{label}:</strong>
      </td>
      <td>{children || <p className="capitalize">{value}</p>}</td>
    </tr>
  );
}

TaskDetailRow.defaultProps = {
  value: undefined,
  children: undefined,
};

// export default memo(TaskDetailsRow);

const MemoizedTaskDetailsRow = memo(TaskDetailRow);
export default MemoizedTaskDetailsRow;
