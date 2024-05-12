import { useSelector } from "react-redux";
import HeadNavbar from "./HeadNavbar";
import { RootState } from "../../app/store";

function Main() {
  const userProfile = useSelector((state: RootState) => state.userProfile.userProfile);

  console.log(userProfile);

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
