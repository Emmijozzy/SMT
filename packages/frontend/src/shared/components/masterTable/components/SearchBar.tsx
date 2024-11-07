import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

interface SearchBarProps {
  viewSearch: boolean;
  handleSearch: (query: string) => void;
  handleViewSearch: () => void;
}

export function SearchBar({ viewSearch, handleSearch, handleViewSearch }: SearchBarProps) {
  if (viewSearch) {
    return (
      <div className="absolute w-full">
        <div className="relative md:w-1/2 mx-auto">
          <SearchIcon className="absolute left-3 top-[25%] text-base-content" />
          <input
            className="input w-full rounded-full h-10 px-12 py-1 border-2 border-transparent focus:outline-none focus:border-secondary placeholder-base-content/40 transition-all duration-300 shadow-md"
            placeholder="Search..."
            type="text"
            onChange={(e) => handleSearch(e.target.value)}
          />
          <button
            type="button"
            aria-label="Clear search"
            onClick={handleViewSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1"
          >
            <CloseIcon className="h-4 w-4 text-base-content" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      type="button"
      aria-label="Search"
      onClick={handleViewSearch}
      className="h-7 w-[5ren] lg:flex p-0 items-center bg-base-100 mr-2 rounded-lg border-none hover:border-2 hover:bg-base-300"
    >
      <SearchIcon className="h-6 w-6 md:h-4 md:w-4 ml-2 m-0 p-0 text-base-content" />
      <p className="text-base-content/40 mx-2 hidden md:flex">Search ....</p>
    </button>
  );
}
