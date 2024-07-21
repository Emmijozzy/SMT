import { useDispatch, useSelector } from "react-redux";
import { useClickOutside } from "@mantine/hooks";
import CloseIcon from "@mui/icons-material/Close";
import { ChangeEvent } from "react";
import { RootState } from "../../app/store";
import { setSelectColor, setSettingBar, setThemes } from "../layoutSlice";

function SettingBar() {
  // const [openSidenav] = useState(false);
  const dispatch = useDispatch();
  const openSettingBar = useSelector((state: RootState) => state.layout.settingBar);
  const theme = useSelector((state: RootState) => state.layout.themes);
  const selectColor = useSelector((state: RootState) => state.layout.selectColor);
  const ref = useClickOutside(() => dispatch(setSettingBar(false)));

  const handleSettingBar = () => {
    dispatch(setSettingBar(false));
  };

  const handleThemeselect = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setThemes(e.target.value));
  };

  return (
    <div
      ref={ref}
      className={`${openSettingBar ? "-translate-x-0" : "translate-x-80"} w-60  h-[calc(100vh-32px)] fixed right-0 z-50 my-4 ml-4  rounded-xl transition-transform duration-300 border border-base-100 bg-base-200 z-[9999]`}
    >
      <div className="relative flex items-center justify-center py-4 mb-2 overflow-hidden">
        <button
          type="button"
          aria-label="Close Sidebar"
          onClick={() => handleSettingBar()}
          className="absolute left-0 top-0 p-3"
        >
          <CloseIcon className="h-6 w-6 text-base-content" />
        </button>
        <div className="w-full  mx-4">
          <h3 className="text-base font-bold text-base-content text-center ml-7">Dashboard Options</h3>
          <div className="mt-4">
            <p className="text-xs font-bold content text-base">Themes</p>
            <select
              value={theme}
              onChange={handleThemeselect}
              className="select select-bordered rounded-lg select-xs w-full max-w-xs h-[0.5rem] mt-1"
            >
              <option value="system">System</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="cupcake">Cupcake</option>
              <option value="retro">Retro</option>
              <option value="synthwave">Synthwave</option>
            </select>
          </div>
          <div className="mt-4">
            <p className="text-xs font-bold content text-base">Select</p>
            <div className="my-2 text-left w-full" /* sidenav-colors="" */>
              <button
                type="button"
                className={`rounded-full h-5.75 mr-1.25 w-5.75 ease-in-out bg-gradient-to-tl from-purple-700 to-pink-500 relative inline-block cursor-pointer whitespace-nowrap border border-solid text-center align-baseline font-bold uppercase leading-none text-white transition-all duration-200 hover:border-slate-700 border-white border-xl ${selectColor === "bg-pink-gradient" ? "scale-75" : "scale-100"} `}
                aria-label="Pink gradient"
                onClick={() => dispatch(setSelectColor("bg-pink-gradient"))}
              />
              <button
                type="button"
                className={`rounded-full h-5.75 mr-1.25 w-5.75 ease-in-out bg-gradient-to-tl from-gray-900 to-slate-800 relative inline-block cursor-pointer whitespace-nowrap border border-solid border-white text-center align-baseline font-bold uppercase leading-none text-white transition-all duration-200 hover:border-slate-700  ${selectColor === "bg-gray-gradient" ? "scale-75" : "scale-100"}`}
                aria-label="Gray gradient"
                onClick={() => dispatch(setSelectColor("bg-gray-gradient"))}
              />
              <button
                type="button"
                className={`rounded-full h-5.75 mr-1.25 w-5.75 ease-in-out bg-gradient-to-tl from-blue-600 to-cyan-400 relative inline-block cursor-pointer whitespace-nowrap border border-solid border-white text-center align-baseline font-bold uppercase leading-none text-white transition-all duration-200 hover:border-slate-700 ${selectColor === "bg-blue-gradient" ? "scale-75" : "scale-100"}`}
                aria-label="Blue gradient"
                onClick={() => dispatch(setSelectColor("bg-blue-gradient"))}
              />
              <button
                type="button"
                className={`rounded-full h-5.75 mr-1.25 w-5.75 ease-in-out bg-gradient-to-tl from-green-600 to-lime-400 relative inline-block cursor-pointer whitespace-nowrap border border-solid text-center align-baseline font-bold uppercase leading-none text-white transition-all duration-200 hover:border-slate-700 border-white  ${selectColor === "bg-green-gradient" ? "scale-75" : "scale-100"}`}
                aria-label="Lime gradient"
                onClick={() => dispatch(setSelectColor("bg-green-gradient"))}
              />
              <button
                type="button"
                className={` rounded-full h-5.75 mr-1.25 w-5.75 ease-in-out bg-gradient-to-tl from-red-500 to-yellow-400 relative inline-block cursor-pointer whitespace-nowrap border border-solid text-center align-baseline font-bold uppercase leading-none text-white transition-all duration-200 hover:border-slate-700 border-slate-700 nter whitespace-nowrap border border-solid text-center align-baseline font-bold uppercase leading-none text-white transition-all duration-200 hover:border-slate-700 border-white  ${selectColor === "bg-orange-gradient" ? "scale-75" : "scale-100"}`}
                aria-label="yellow gradient"
                onClick={() => dispatch(setSelectColor("bg-orange-gradient"))}
                // active-color=""
              />
              <button
                type="button"
                className={`rounded-full h-5.75 mr-1.25 w-5.75 ease-in-out bg-gradient-to-tl from-red-600 to-rose-400 relative inline-block cursor-pointer whitespace-nowrap border border-solid text-center align-baseline font-bold uppercase leading-none text-white transition-all duration-200 hover:border-slate-700 border-white ${selectColor === "bg-red-gradient" ? "scale-75" : "scale-100"}`}
                aria-label="red gradient"
                onClick={() => dispatch(setSelectColor("bg-red-gradient"))}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SettingBar;
