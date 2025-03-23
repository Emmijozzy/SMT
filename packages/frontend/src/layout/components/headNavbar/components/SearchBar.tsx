import SearchIcon from "@mui/icons-material/Search";

export function SearchBar() {
  return (
    <div className="h-10 w-[4ren] hidden lg:flex items-center bg-base-100 mr-2 rounded-lg border-none hover:border-2 hover:border-sky-50">
      <span className="ml-2">
        <SearchIcon className="my-2 text-base-content" />
      </span>
      <p className="text-base-content/40 mx-2">Search for Task ....</p>
    </div>
  );
}
