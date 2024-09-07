import { useState, useEffect, ChangeEvent } from "react";
import removeSpecialCharacters from "../../../shared/utils/removeSpecialCharacters";

const useSearchById = (userIds: string[]) => {
  const [searchId, setSearchId] = useState<string>();
  const [searchedIds, setSearchIds] = useState<string[]>();

  useEffect(() => {
    if (searchId) {
      const searchReg = new RegExp(removeSpecialCharacters(searchId.trim()), "gi");
      const foundIds = userIds?.filter((userId: string) => {
        const foundUserId = userId?.match(searchReg);
        return foundUserId && foundUserId?.length > 0 ? foundUserId : null;
      });
      setSearchIds(foundIds);
    } else {
      setSearchIds([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchId, setSearchId, setSearchIds]);

  const handleSearchId = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchId(e.target.value);
  };

  return {
    searchId,
    searchedIds,
    handleSearchId,
  };
};
export default useSearchById;
