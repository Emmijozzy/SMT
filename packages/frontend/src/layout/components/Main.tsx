import { Outlet } from "react-router-dom";
import HeadNavbar from "./HeadNavbar";

function Main() {
  return (
    <main className="py-4 xl:ml-[17rem] transition w-full">
      <HeadNavbar />
      <div className="w-full h-calc-half-vh bg-base-100 overflow-auto rounded-lg px-4 bg-base-200">
        <Outlet />
        <div className="w-full h-full bg-[blue]" />
        <div className="w-full h-full bg-[blue]" />
        <div className="w-full h-full bg-[blue]" />
      </div>
    </main>
  );
}
export default Main;
