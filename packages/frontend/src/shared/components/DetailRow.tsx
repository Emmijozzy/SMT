type Props = {
  label: string;
  value: string;
  className?: string;
};

function DetailRow({ label, value, className }: Props) {
  return (
    <tr
      className={`w-full grid gridTemplateColumn text-[16px] leading-6 border-b-[1px] border-base-content/10 px-4 ${className || ""} `}
    >
      <td className="font-bold capitalize">
        <strong>{label}:</strong>
      </td>
      <td>
        <p className="">{value}</p>
      </td>
    </tr>
  );
}

DetailRow.defaultProps = {
  className: "",
};

export default DetailRow;
