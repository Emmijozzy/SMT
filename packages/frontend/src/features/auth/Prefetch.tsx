import { useEffect } from "react";
import { Outlet } from "react-router-dom";
// import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { store } from "../../app/store";
import { clearStatus } from "../../shared/Slice/statusSlice";
import { clearAlert } from "../alerts/AlertSlice";
import { tasksApiSlice } from "../tasks/tasksApiSlice";
import { teamApiSlice } from "../teams/teamApiSlice";
import { userApiSlice } from "../users/userApiSlice";
// import { getPresentUser } from "../users/userProfileSlice";

function Prefetch() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearStatus());
    dispatch(clearAlert());

    store.dispatch(userApiSlice.util.prefetch("getUserProfile", "user", { force: true }));
    store.dispatch(userApiSlice.util.prefetch("getUsers", undefined, { force: true }));
    store.dispatch(tasksApiSlice.util.prefetch("getTasks", undefined, { force: true }));
    store.dispatch(teamApiSlice.util.prefetch("getTeams", undefined, { force: true }));
  }, [dispatch]);
  // const { userId } = useSelector(getPresentUser);

  // console.log(userId);
  // let content;
  // if (!userId) {
  //   content = <h1>Loading</h1>;
  // } else {
  //   content = <Outlet />;
  // }

  console.log("prefetch");

  return <Outlet />;
}

export default Prefetch;
