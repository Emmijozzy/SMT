type Props = {
  label: string;
  value: string;
  className?: string;
};

function TeamDetailRow({ label, value, className }: Props) {
  return (
    <tr
      className={`w-full grid gridTemplateColumn text-[16px] leading-6 border-b-[1px] border-base-content/10 ${className || ""}`}
    >
      <td className="font-bold">
        <strong>{label}:</strong>
      </td>
      <td>
        <p className="">{value}</p>
      </td>
    </tr>
  );
}

TeamDetailRow.defaultProps = {
  className: "",
};

export default TeamDetailRow;
