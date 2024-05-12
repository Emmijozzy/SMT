/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import Alerts from "../features/alerts/Alerts";
// import { useGetUserProfileQuery } from "../features/users/userApiSlice";

function Layout() {
  // const { isLoading, error, isError } = useGetUserProfileQuery("user");

  // //console.log(data, error, isError);

  // if (isLoading) {
  //   return <h3>Loading</h3>;
  // }

  return (
    <div className="relative overflow-hidden left-0 top-0 flex min-h-screen min-w-[100vw] bg-base-200">
      <Alerts />
      <Sidebar />
      <Main />
    </div>
  );
}
export default Layout;
