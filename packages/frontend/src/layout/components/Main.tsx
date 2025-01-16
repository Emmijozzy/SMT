import { Outlet } from "react-router-dom";
import HeadNavbar from "./HeadNavbar";

function Main() {
  return (
    <main className="py-4 xl:ml-[17rem] transition w-full ">
      <HeadNavbar />
      <div className="w-full min-w-[350px] max-w-[90rem] mx-auto h-calc-half-vh overflow-auto rounded-lg px-4 bg-base-200  scrollbar-thin scrollbar-thumb-base-content/30 scrollbar-track-base-300 scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
        <Outlet />
      </div>
    </main>
  );
}
export default Main;
