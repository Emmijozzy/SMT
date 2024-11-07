export const getHeaderClassName = (index: number): string => {
  const baseClasses =
    "align-middle border border-solid border-primary py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left";

  return index === 0
    ? `pl-3 w-72 bg-base-200 text-base-content/70 ${baseClasses}`
    : `pr-4 bg-base-200 text-base-content/70 ${baseClasses}`;
};
