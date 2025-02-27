import { useCallback, useState } from "react";

export function useTableState<T>(defaultColumn: string) {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState<{ key: keyof T | null; direction: "asc" | "desc" | null }>({
    key: null,
    direction: null,
  });

  const [sortedBy, setSortedBy] = useState<keyof T | "">("");
  const [toFilter, setToFilter] = useState({ option: "", column: defaultColumn });
  const [viewSearch, setViewSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleFilter = useCallback((option: string, column: string) => {
    // console.log(option, "option", column, "column");
    setToFilter({ option, column });
  }, []);

  const handleSort = useCallback((key: keyof T) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
    setSortedBy(key);
  }, []);

  const handleViewSearch = useCallback(() => {
    setViewSearch((prev) => !prev);
  }, []);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  }, []);

  return {
    currentPage,
    rowsPerPage,
    sortConfig,
    sortedBy,
    toFilter,
    viewSearch,
    searchQuery,
    handleFilter,
    handleSort,
    handleViewSearch,
    handleSearch,
    setCurrentPage,
    setRowsPerPage,
  };
}
