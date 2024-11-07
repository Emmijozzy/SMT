/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/require-default-props */
import { ComponentType, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import Pagination from "./components/Pagination";
import { SearchBar } from "./components/SearchBar";
import TableHeader from "./components/TableHeader";
import { useTableState } from "./hooks/useTableState";

export interface TableHeaderProps {
  className: string;
  columns: Array<{
    label: string;
    searchable: boolean;
    sortable?: boolean;
    filterable?: boolean;
    filterOptions?: string[];
  }>;
}

export interface TableBodyProps<T> {
  data: T;
  [key: string]: unknown;
}

export interface TableProps<T> {
  className?: string;
  name: string;
  data: T[];
  tableHead: TableHeaderProps;
  TableBody: ComponentType<TableBodyProps<T>>;
}

function MasterTable<T extends Record<string, unknown>>() {
  return function TableWrapper(props: TableProps<T>) {
    const { className, name, data, tableHead, TableBody } = props;

    const {
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
    } = useTableState<T>(tableHead.columns[0].label);

    const processedData = useMemo(() => {
      let result = [...data];

      if (searchQuery) {
        result = result.filter((item) =>
          Object.values(item).some((value) => String(value).toLowerCase().includes(searchQuery.toLowerCase())),
        );
      }

      if (toFilter.option) {
        result = result.filter((item) => String(item[toFilter.column]).toLowerCase() === toFilter.option.toLowerCase());
      }
      // if (toFilter.option) {
      //   result = result.filter((item) => String(item[toFilter.column]).toLowerCase() === toFilter.option.toLowerCase());
      // }

      if (sortConfig.key) {
        result.sort((a, b) => {
          const aValue = String(a[sortConfig.key!]);
          const bValue = String(b[sortConfig.key!]);
          return sortConfig.direction === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        });
      }

      return result;
    }, [data, toFilter, sortConfig, searchQuery]);

    const currentRows = useMemo(() => {
      const start = (currentPage - 1) * rowsPerPage;
      return processedData.slice(start, start + rowsPerPage);
    }, [processedData, currentPage, rowsPerPage]);

    return (
      <div className="container mx-auto px-4 transition-all">
        <div className="w-full">
          <div
            className={`relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-base-200 text-base-content/70 ${className || ""}`}
          >
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="relative flex flex-wrap items-center">
                <h3 className="font-semibold text-lg text-base-content flex-1 px-4">{name} Table</h3>
                <SearchBar viewSearch={viewSearch} handleSearch={handleSearch} handleViewSearch={handleViewSearch} />
              </div>
            </div>

            <div className="block w-full overflow-x-auto">
              <div className="relative w-full min-h-80 flex flex-col justify-between">
                <table className="items-center w-full bg-transparent border-collapse">
                  <TableHeader
                    className={tableHead.className}
                    columns={tableHead.columns}
                    onSort={handleSort}
                    onFilter={handleFilter}
                    sortedBy={sortedBy as string}
                  />
                  <tbody className="mb-10 mt-2">
                    {currentRows.map((item) => (
                      <TableBody key={uuidv4()} data={item} />
                    ))}
                  </tbody>
                </table>
              </div>
              <Pagination
                totalRows={processedData.length}
                rowsPerPage={rowsPerPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                setRowsPerPage={setRowsPerPage}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };
}

export default MasterTable;
