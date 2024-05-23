import { useEffect } from "react";
import { Outlet } from "react-router-dom";
// import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { store } from "../../app/store";
import { userApiSlice } from "../users/userApiSlice";
import { clearStatus } from "../../shared/Slice/statusSlice";
import { clearAlert } from "../alerts/AlertSlice";
// import { getPresentUser } from "../users/userProfileSlice";

function Prefetch() {
  const dispatch = useDispatch();

  dispatch(clearStatus());
  dispatch(clearAlert());

  useEffect(() => {
    store.dispatch(userApiSlice.util.prefetch("getUserProfile", "user", { force: true }));
  });

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
