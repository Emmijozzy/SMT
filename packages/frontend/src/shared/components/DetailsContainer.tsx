import { ReactNode } from "react";
import DetailRow from "./DetailRow";

type Props = {
  tableRows: (
    | { label: string; value: string; className?: string }
    | { label: string; value: ReactNode; className?: string }
  )[];
};

function DetailsContainer({ tableRows }: Props) {
  return (
    <div className="w-full">
      <table className="w-full">
        <tbody>
          {tableRows.map(({ label, value, className }) => (
            <DetailRow key={label} label={label} value={value} className={className} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DetailsContainer;
