import { Outlet } from "react-router-dom";
import HeadNavbar from "./HeadNavbar";

function Main() {
  return (
    <main className="py-4 xl:ml-[17rem] transition w-full ">
      <HeadNavbar />
      <div className="w-full h-calc-half-vh overflow-auto rounded-lg px-4 bg-base-200  scrollbar-thin scrollbar-thumb-base-content/30 scrollbar-track-base-300 scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
        <Outlet />
        {/* <div className="w-full h-full bg-base-200" />
        <div className="w-full h-full bg-base-200" />
        <div className="w-full h-full bg-[blue]" /> */}
      </div>
    </main>
  );
}
export default Main;
