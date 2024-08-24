/* eslint-disable jsx-a11y/control-has-associated-label */
import tasks from "../../../constans/tasks";

type Props = {};
function TasksTable(props: Props) {
  return (
    <div className="container">
      <div className="w-full">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-pink-900 text-white">
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1 ">
                <h3 className="font-semibold text-lg text-white">Card Tables</h3>
              </div>
            </div>
          </div>
          <div className="block w-full overflow-x-auto ">
            <table className="items-center w-full bg-transparent border-collapse">
              <thead>
                <tr>
                  <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-pink-800 text-pink-300 border-pink-700">
                    Project
                  </th>
                  <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-pink-800 text-pink-300 border-pink-700">
                    Budget
                  </th>
                  <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-pink-800 text-pink-300 border-pink-700">
                    Status
                  </th>
                  <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-pink-800 text-pink-300 border-pink-700">
                    Users
                  </th>
                  <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-pink-800 text-pink-300 border-pink-700">
                    Completion{" "}
                  </th>
                  <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-pink-800 text-pink-300 border-pink-700" />
                </tr>
              </thead>

              <tbody>
                <tr>
                  <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                    <img
                      src="https://demos.creative-tim.com/notus-js/assets/img/bootstrap.jpg"
                      className="h-12 w-12 bg-white rounded-full border"
                      alt="..."
                    />
                    <span className="ml-3 font-bold text-white"> Argon Design System </span>
                  </th>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    $2,500 USD
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <i className="fas fa-circle text-orange-500 mr-2" />
                    pending
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <div className="flex">
                      <img
                        src="https://demos.creative-tim.com/notus-js/assets/img/team-1-800x800.jpg"
                        alt="..."
                        className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow"
                      />
                      <img
                        src="https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg"
                        alt="..."
                        className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow -ml-4"
                      />
                      <img
                        src="https://demos.creative-tim.com/notus-js/assets/img/team-3-800x800.jpg"
                        alt="..."
                        className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow -ml-4"
                      />
                      <img
                        src="https://demos.creative-tim.com/notus-js/assets/img/team-4-470x470.png"
                        alt="..."
                        className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow -ml-4"
                      />
                    </div>
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <div className="flex items-center">
                      <span className="mr-2">60%</span>
                      <div className="relative w-full">
                        <div className="overflow-hidden h-2 text-xs flex rounded bg-red-200">
                          <div
                            style={{ width: "60%" }}
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  {/* </td> */}
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                    <a
                      href="#pablo"
                      className="text-blueGray-500 block py-1 px-3" /* onclick="openDropdown(event,'table-dark-1-dropdown')" */
                    >
                      <i className="fas fa-ellipsis-v" />
                    </a>
                    <div
                      className="hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
                      id="table-dark-1-dropdown"
                    >
                      <a
                        href="#pablo"
                        className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                      >
                        Action
                      </a>
                      <a
                        href="#pablo"
                        className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                      >
                        Another action
                      </a>
                      <a
                        href="#pablo"
                        className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                      >
                        Something else here
                      </a>
                      <div className="h-0 my-2 border border-solid border-blueGray-100" />
                      <a
                        href="#pablo"
                        className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                      >
                        Seprated link
                      </a>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
export default TasksTable;
