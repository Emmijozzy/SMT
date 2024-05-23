import { useEffect, useState } from "react";
import { useRefreshMutation } from "../authApiSlice";

const useRefresh = () => {
  const [refresh, { isError, isLoading, isSuccess }] = useRefreshMutation();
  const [data, setdata] = useState();

  useEffect(() => {
    const refreshData = refresh({ data: "" });
    console.log(refreshData);
    setdata(refreshData);
  }, []);

  // return <div>useRefresh</div>;
  return data;
};
export default useRefresh;
