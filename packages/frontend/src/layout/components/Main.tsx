// type Props = {};

import HeadNavbar from "./HeadNavbar";

function Main() {
  return (
    <main className="p-4 xl:ml-[17rem] transition w-full">
      <HeadNavbar />
      <div className="w-full h-calc-half-vh bg-base-100 overflow-auto rounded-lg">
        <div className="w-full h-full bg-[blue]" />
        <div className="w-full h-full bg-[blue]" />
        <div className="w-full h-full bg-[blue]" />
      </div>
    </main>
  );
}
export default Main;
