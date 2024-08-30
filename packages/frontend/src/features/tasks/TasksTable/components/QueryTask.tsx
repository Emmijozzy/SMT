import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";
import InputField2 from "../../../../shared/components/InputField2";

function QueryTask() {
  const [showFileterd, setShowFiltered] = useState(false);

  const handleShowFiltered = () => {
    setShowFiltered((pre) => !pre);
  };

  return (
    <div className="container">
      <div className="w-full p-2 bg-base-200 rounded">
        <div className="flex flex-col w-full transition-all">
          <div className="flex justify-between items-center">
            <button
              type="button"
              aria-label="Open Sidebar"
              onClick={() => handleShowFiltered()}
              className="h-full flex items-center mr-3"
            >
              <ArrowDropDownIcon className={`h-14 w-14 transition ${showFileterd ? "rotate-180" : ""}`} />
            </button>
            <div className="div relative w-2/4 hidden md:inline">
              <SearchIcon className="h-8 w-8 absolute left-1 -translate-y-1/2 top-1/2 p-1 pr-2 text-base-content/60" />
              <input
                className="w-full input rounded-lg px-8 py-4 border-2 border-transparent focus:outline-none focus:border-primary/50 placeholder-gray-400 transition-all duration-300 shadow-md"
                placeholder="Search Task ID ...."
                // value={searchId}
                type="text"
                // onChange={(e) => handleSearchId(e)}
              />
              <button type="button" aria-label="reset" className="absolute right-3 -translate-y-1/2 top-1/2 p-1">
                <CloseIcon className="h-8 w-8 text-base-content/60" />
              </button>
            </div>

            <button
              type="button"
              className="px-2 py-2 button text-center text-base-300 transition-all bg-transparent shadow-inner shadow-base-300 hover:scale-[105%] hover:shadow-lg hover:shadow-base-300  rounded-lg cursor-pointer ease-in bg-gradient-to-tl from-base-content from-2% to-base-300 to-98%  "
            >
              <Link to="/dash/tasks/create_task" className="flex items-center justify-center text-xs">
                <AddIcon className="h-8 w-8" />
                &nbsp;&nbsp;Add New Task
              </Link>
            </button>
          </div>
          <div className={`w-full transition ${showFileterd ? "" : "hidden"}`}>
            <form /* onSubmit={handleSubmit} */>
              <InputField2
                label="Fullname"
                placeholder="Enter name"
                // onChange={handleChange}
                // value={values.fullName}
                name="fullName"
              />
              <InputField2
                label="email"
                placeholder="Enter email"
                // onChange={handleChange}
                // value={values.email}
                name="email"
              />
              <InputField2
                label="Status"
                placeholder="Enter your firstname"
                // onChange={handleChange}
                // value={values.status}
                name="email"
              />
              <div className=" w-full mt-4 flex flex-wrap gap-2 justify-between">
                <div className="w-full md:w-[45%] flex text-lg border-b-2 border-base-content items-center">
                  <span className="font-bold">Status: </span>
                  <select
                    name="role"
                    id="role"
                    className="relative select select-secondary text-lg w-full max-w-xs capitalize border-0 rounded-none focus:border-0 focus:outline-none mx-2 rounded-t"
                    // onChange={handleChange}
                    // onBlur={handleBlur}
                    defaultValue=""
                  >
                    <option value="">Select task status</option>
                    <option value="not started">not started</option>
                    <option value="in process">in process</option>
                    <option value="completed">completed</option>
                    <option value="close">close</option>
                  </select>
                </div>
                <div className="w-full md:w-[45%] flex text-lg border-b-2 border-base-content items-center">
                  <span className="font-bold">Priority: </span>
                  <select
                    className="relative select select-secondary text-lg w-full max-w-xs capitalize border-0 rounded-none focus:border-0 focus:outline-none mx-2 rounded-t"
                    name="team"
                    id="team"
                    // onChange={handleChange}
                    // onBlur={handleBlur}
                    defaultValue=""
                  >
                    <option value="">Select Task priority</option>
                    <option value="high">High</option>
                    <option value="medium">medium</option>
                    <option value="low">low</option>
                  </select>
                </div>
              </div>
              <div className="w-full flex mt-4 justify-center">
                <button
                  type="submit"
                  className="px-8 py-3 button text-center text-base-content border transition-all bg-base-300 hover:scale-[105%] hover:shadow-lg hover:shadow-base-300 hover:bg-base-content hover:text-base-300  rounded-lg cursor-pointer ease-in"
                  // onClick={handleFormValidation}
                >
                  {/* isSubmitting */ true ? "Loading..." : "Search"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default QueryTask;
