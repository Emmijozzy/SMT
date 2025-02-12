/* eslint-disable indent */
import { FaCheck, FaClock, FaEye, FaFolder, FaUndo } from "react-icons/fa";

type Props = {
  status: "open" | "in_process" | "in_review" | "revisit" | "completed";
  onClick?: () => void;
  disabled?: boolean;
};

function StatusButton({ status, onClick, disabled }: Props) {
  const getButtonStyles = () => {
    switch (status) {
      case "open":
        return "bg-blue-500 hover:bg-blue-600 text-white";
      case "in_process":
        return "bg-yellow-500 hover:bg-yellow-600 text-black";
      case "in_review":
        return "bg-purple-500 hover:bg-purple-600 text-white";
      case "completed":
        return "bg-green-500 hover:bg-green-600 text-white";
      case "revisit":
        return "bg-orange-500 hover:bg-orange-600 text-white";
      default:
        return "bg-gray-500 hover:bg-gray-600 text-white";
    }
  };

  const getIcon = () => {
    switch (status) {
      case "open":
        return <FaFolder className="inline-block mr-2" />;
      case "in_process":
        return <FaClock className="inline-block mr-2" />;
      case "in_review":
        return <FaEye className="inline-block mr-2" />;
      case "completed":
        return <FaCheck className="inline-block mr-2" />;
      case "revisit":
        return <FaUndo className="inline-block mr-2" />;
      default:
        return null;
    }
  };

  return (
    <button
      type="button"
      className={`px-4 py-2 rounded-md transition-colors duration-200 capitalize ${
        disabled ? "bg-gray-500 cursor-not-allowed" : getButtonStyles()
      }`}
      onClick={onClick}
      disabled={disabled}
      aria-label={`Move task to ${status.replace("_", " ")}`}
    >
      {getIcon()} {status.replace("_", " ")}
    </button>
  );
}

StatusButton.defaultProps = {
  onClick: () => {},
  disabled: false,
};

export default StatusButton;
