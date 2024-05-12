import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { store } from "../../app/store";
import { userApiSlice } from "../users/userApiSlice";

function Prefetch() {
  useEffect(() => {
    const user = store.dispatch(userApiSlice.util.prefetch("getUserProfile", "user", { force: true }));

    console.log(user);
  });

  return <Outlet />;
}

export default Prefetch;
