/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { useGetUsersQuery } from "../userApiSlice";
import { setUsers } from "../userSlice";
import useFilteredQuery from "./useFilteredQuery";

const useUserTable = () => {
  const [rowPerPage, setRowPerPage] = useState(5);
  const [numOfPage, setNumofPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [userIds, setUserIds] = useState<string[]>();
  const [filteredUserIds, setFilteredUserIds] = useState<string[]>();

  const dispatch = useDispatch();
  // const userEntries = useSelector(usersSelectors.selectEntities);

  const {
    data: ResUsers,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery("", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const { handleSubmit, handleBlur, handleChange, errors, values, isSubmitting, searchedUserId } = useFilteredQuery();

  useEffect(() => {
    if (searchedUserId) {
      setUserIds(searchedUserId);
    } else if (ResUsers) {
      dispatch(setUsers(ResUsers?.entities));
      setUserIds(ResUsers?.ids);
    }
  }, [ResUsers, searchedUserId]);

  useEffect(() => {
    // console.log("paginate");
    if (userIds) {
      let totalPage = Math.ceil((userIds.length + 1) / rowPerPage);
      totalPage = Math.max(totalPage, 1); // Ensure totalPage is at least 1

      let start = 0;
      if (currentPage > 1 && currentPage <= totalPage) {
        start = rowPerPage * currentPage - rowPerPage;
      }

      if (currentPage >= totalPage) {
        start = rowPerPage * (totalPage - 1);
        setCurrentPage(totalPage);
      }

      const end = Math.min(rowPerPage * currentPage, userIds.length);

      // console.log(start, end);
      const data = userIds.slice(start, end);
      // console.log(data);
      setNumofPage(totalPage);
      if (data) {
        setFilteredUserIds(data);
      }
    }

    // console.log(filteredUserIds);
  }, [currentPage, rowPerPage, userIds, setFilteredUserIds]);

  const handleRowPerPage = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilteredUserIds([]);
    setRowPerPage(+e.target.value);
  };

  const handlePageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilteredUserIds([]);
    const Page = +e.target.value;
    if (Page > numOfPage) {
      setCurrentPage(numOfPage);
    } else {
      setCurrentPage(+e.target.value);
    }
  };

  const handleToFirstPage = () => {
    setCurrentPage(1);
  };

  const handlePreviousPage = () => {
    if (currentPage === 1) {
      setCurrentPage(1);
    } else {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage === numOfPage) {
      setCurrentPage(numOfPage);
    } else {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleToLastPage = () => {
    setCurrentPage(numOfPage);
  };

  return {
    handleNextPage,
    handlePageChange,
    handlePreviousPage,
    handleRowPerPage,
    handleToFirstPage,
    handleToLastPage,
    currentPage,
    numOfPage,
    rowPerPage,
    filteredUserIds,
    userIds,
    setUserIds,
    setFilteredUserIds,
    setRowPerPage,
    setNumofPage,
    setCurrentPage,
    isLoading,
    isSuccess,
    isError,
    error,
    handleSubmit, // filteredquery
    handleBlur,
    handleChange,
    errors,
    values,
    isSubmitting,
    searchedUserId,
  };
};
export default useUserTable;
