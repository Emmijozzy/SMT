import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { ChangeEvent } from "react";

type Props = {
  handleSearchId: (e: ChangeEvent<HTMLInputElement>) => void;
};
function SearchUserId({ handleSearchId }: Props) {
  return (
    <div className="div relative w-2/4 hidden md:inline">
      <button type="button" aria-label="Search User" className="absolute left-2 -translate-y-1/2 top-1/2 p-1">
        <SearchIcon className="h-8 w-8 absolute left-1 -translate-y-1/2 top-1/2 p-1 pr-2 text-base-content/60" />
      </button>
      <input
        className="w-full input rounded-lg px-8 py-4 border-2 border-transparent focus:outline-none focus:border-primary/50 placeholder-gray-400 transition-all duration-300 shadow-md"
        placeholder="Search User ID ...."
        type="text"
        onChange={(e) => handleSearchId(e)}
      />
      <button type="button" aria-label="reset" className="absolute right-3 -translate-y-1/2 top-1/2 p-1">
        <CloseIcon className="h-8 w-8 text-base-content/60" />
      </button>
    </div>
  );
}
export default SearchUserId;
