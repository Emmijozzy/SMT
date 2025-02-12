/* eslint-disable indent */
type Props = {
  priority: string;
};
function PriorityIndicator({ priority }: Props) {
  let svgContent;

  switch (priority.toLowerCase()) {
    case "high":
      svgContent = (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#FF4C4C" />
          <path d="M12 7L10.5 15H13.5L12 7Z" fill="#FFFFFF" />
          <circle cx="12" cy="19" r="1" fill="#FFFFFF" />
        </svg>
      );
      break;
    case "medium":
      svgContent = (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#FFA500" />
          <rect x="9" y="10" width="6" height="4" rx="1" fill="#FFFFFF" />
          <rect x="11" y="7" width="2" height="2" rx="1" fill="#FFFFFF" />
          <rect x="11" y="15" width="2" height="2" rx="1" fill="#FFFFFF" />
        </svg>
      );
      break;
    case "low":
      svgContent = (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#4CAF50" />
          <line x1="8" y1="14" x2="16" y2="14" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
          <line x1="12" y1="10" x2="12" y2="14" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
      break;
    default:
      svgContent = null;
  }

  return svgContent;
}
export default PriorityIndicator;
