export const getHeaderClassName = (index: number): string => {
  const baseClasses =
    "align-middle border border-solid border-primary py-3 text-xs uppercase border-l-0 border-r-0 font-semibold text-left sticky top-0 pr-3";

  const indexSpecificClasses = index === 0 ? "pl-3 w-76" : "";

  return `${baseClasses} ${indexSpecificClasses} bg-base-200 text-base-content/70`;
};
