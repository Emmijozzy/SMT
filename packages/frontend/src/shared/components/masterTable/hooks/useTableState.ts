import { useCallback, useEffect, useState } from "react";

type InitialState<T> = {
  currentPage: number;
  rowsPerPage: number;
  sortConfig: { key: keyof T | null; direction: "asc" | "desc" | null };
  sortedBy: string;
  toFilter: { option: string; column: string };
  viewSearch: boolean;
  searchQuery: string;
};

export function useTableState<T>(defaultColumn: string, tableId: string) {
  // Use tableId to create unique storage keys for different tables
  const storageKey = `table_state_${tableId}`;

  // Load initial state from localStorage or use defaults
  const loadInitialState = (): InitialState<T> => {
    const savedState = localStorage.getItem(storageKey);
    if (savedState) {
      return JSON.parse(savedState) as InitialState<T>;
    }
    return {
      currentPage: 1,
      rowsPerPage: 5,
      sortConfig: { key: null, direction: null },
      sortedBy: "",
      toFilter: { option: "", column: defaultColumn },
      viewSearch: false,
      searchQuery: "",
    };
  };

  const initialState = loadInitialState();

  const [currentPage, setCurrentPage] = useState(initialState.currentPage);
  const [rowsPerPage, setRowsPerPage] = useState(initialState.rowsPerPage);
  const [sortConfig, setSortConfig] = useState<{ key: keyof T | null; direction: "asc" | "desc" | null }>(
    initialState.sortConfig,
  );
  const [sortedBy, setSortedBy] = useState<keyof T | "">(initialState.sortedBy as keyof T | "");
  const [toFilter, setToFilter] = useState(initialState.toFilter);
  const [viewSearch, setViewSearch] = useState(initialState.viewSearch);
  const [searchQuery, setSearchQuery] = useState(initialState.searchQuery);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    const stateToSave = {
      currentPage,
      rowsPerPage,
      sortConfig,
      sortedBy,
      toFilter,
      viewSearch,
      searchQuery,
    };
    localStorage.setItem(storageKey, JSON.stringify(stateToSave));
  }, [currentPage, rowsPerPage, sortConfig, sortedBy, toFilter, viewSearch, searchQuery, storageKey]);

  const handleFilter = useCallback((option: string, column: string) => {
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

  // Add a reset function to clear saved state if needed
  const resetTableState = useCallback(() => {
    setCurrentPage(1);
    setRowsPerPage(5);
    setSortConfig({ key: null, direction: null });
    setSortedBy("" as keyof T | "");
    setToFilter({ option: "", column: defaultColumn });
    setViewSearch(false);
    setSearchQuery("");
    localStorage.removeItem(storageKey);
  }, [defaultColumn, storageKey]);

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
    resetTableState,
  };
}
