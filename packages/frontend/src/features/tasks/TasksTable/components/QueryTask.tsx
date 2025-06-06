import AddIcon from "@mui/icons-material/Add";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { memo, useState } from "react";
import { Link } from "react-router-dom";
import InputField3 from "../../../../shared/components/InputField3";
import Select from "../../../../shared/components/Select";
import UseTaskFilterQuery from "../UseTaskFilterQuery";

const QueryTask = memo(() => {
  const [showFilter, setShowFilter] = useState(false);

  const { handleSubmit, handleChange, values, isSubmitting } = UseTaskFilterQuery();

  const handleShowFiltered = () => {
    setShowFilter((pre) => !pre);
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
              <ArrowDropDownIcon className={`h-14 w-14 transition ${showFilter ? "rotate-180" : ""}`} />
            </button>

            <button
              type="button"
              className="px-2 py-2 button text-center text-base-300 transition-all bg-transparent shadow-inner shadow-base-300 hover:scale-[105%] hover:shadow-lg hover:shadow-base-300  rounded-lg cursor-pointer ease-in bg-gradient-to-tl from-base-content from-2% to-base-300 to-98%  "
            >
              <Link to="create_task" className="flex items-center justify-center text-xs">
                <AddIcon className="h-8 w-8" />
                &nbsp;&nbsp;Add New Task
              </Link>
            </button>
          </div>
          <div className={`w-full transition ${showFilter ? "" : "hidden"}`}>
            <form onSubmit={handleSubmit}>
              <InputField3
                label="title"
                placeholder="Enter title"
                onChange={handleChange}
                value={values.title}
                name="title"
              />

              <div className=" w-full mt-4 flex flex-wrap gap-2 justify-between">
                <InputField3
                  label="Assignee"
                  placeholder="Enter task assignee"
                  onChange={handleChange}
                  value={values.assignedTo}
                  name="email"
                  bodyClassName="lg:w-[49%]"
                />
                <Select
                  className="lg:w-[49%] border-b-[1px] border-base-content/40 h-13 text-sm gap-4 "
                  labelClass="mr-2 lg:mr-8"
                  label="team"
                  placeholder="Select responsible team"
                  options={["developer", "ui/ux", "analyst"]}
                  name="responsibleTeam"
                  value={values.priority}
                  handleChange={handleChange}
                />
              </div>
              <div className=" w-full mt-4 flex flex-wrap gap-2 justify-between">
                <InputField3
                  label="Start Date"
                  onChange={handleChange}
                  value={values.startDate}
                  name="startDate"
                  bodyClassName="lg:w-[49%]"
                  type="date"
                />
                <InputField3
                  label="Due Date"
                  onChange={handleChange}
                  value={values.dueDate}
                  name="dueDate"
                  bodyClassName="lg:w-[49%]"
                  type="date"
                />
              </div>
              <div className=" w-full mt-4 flex flex-wrap gap-2 justify-between">
                <Select
                  className="lg:w-[49%] border-b-[1px] border-base-content/40 h-13 text-sm gap-4 "
                  label="status"
                  labelClass="mr-2 lg:mr-10"
                  placeholder="Select task status"
                  options={["not started", "in progress", "completed", "closed"]}
                  name="status"
                  value={values.status}
                  handleChange={handleChange}
                />
                <Select
                  className="lg:w-[49%] border-b-[1px] border-base-content/40 h-13 text-sm gap-4 "
                  labelClass="mr-2 lg:mr-8"
                  label="priority"
                  placeholder="Select task priority"
                  options={["high", "medium", "low"]}
                  name="priority"
                  value={values.priority}
                  handleChange={handleChange}
                />
              </div>
              <div className="w-full flex mt-4 justify-center">
                <button
                  type="submit"
                  className="px-8 py-3 button text-center text-base-content border transition-all bg-base-300 hover:scale-[105%] hover:shadow-lg hover:shadow-base-300 hover:bg-base-content hover:text-base-300  rounded-lg cursor-pointer ease-in"
                  // onClick={handleFormValidation}
                >
                  {isSubmitting ? "Loading..." : "Search"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
});
export default QueryTask;
