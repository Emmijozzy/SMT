/* eslint-disable no-void */
import { FaTrashRestore } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../app/store";
import ResData from "../../../shared/interface/resdata";
import log from "../../../shared/utils/log";
import { addAlert } from "../../alerts/AlertSlice";
import { useDeleteTaskMutation, useRestoreTaskMutation } from "../tasksApiSlice";
import { getShowModal, getTaskId, setCloseModal } from "./deleteTaskSlice";

function DeleteTask() {
  const forDelete = useSelector((state: RootState) => state.deleteTask.forDelete);
  const showModal = useSelector(getShowModal);
  const taskId = useSelector(getTaskId);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [deleteTask, { isError: isDelError, isLoading: isDelLoading }] = useDeleteTaskMutation();
  const [restoreTask, { isError: isResError, isLoading: isResLoading }] = useRestoreTaskMutation();

  const handleDelete = () => {
    const taskDelete = async () => {
      try {
        const resData = (await deleteTask({ deleteTaskId: taskId })) as ResData;
        if (Object.keys(resData)[0] === "error" || isDelError) {
          const resError = resData.error as ResData;
          throw new Error(resError.data.message);
        }

        const resMessage = resData.data.message;
        dispatch(addAlert({ message: resMessage, type: "success" }));
        dispatch(setCloseModal());
        navigate("/dash/tasks");
      } catch (e) {
        const err = e as Error;
        dispatch(addAlert({ message: err.message, type: "error" }));
        log("error", "Error deleting task", err.message, err.stack as string);
      }
    };

    void taskDelete();
  };

  const handleRestore = () => {
    const restorerUser = async () => {
      try {
        const resData = (await restoreTask({ restoreTaskId: taskId })) as ResData;
        if (Object.keys(resData)[0] === "error" || isResError) {
          const resError = resData.error as ResData;
          throw new Error(resError.data.message);
        }
        const resMessage = resData.data.message;
        dispatch(addAlert({ message: resMessage, type: "success" }));
        dispatch(setCloseModal());
        navigate("/dash/tasks/");
      } catch (e) {
        const err = e as Error;
        dispatch(addAlert({ message: err.message, type: "error" }));
        log("error", "Change password Error", err.message, err.stack as string);
      }
    };

    void restorerUser();
  };

  // console.log(showModal, deleteTaskId);

  const handleCloseModal = () => {
    dispatch(setCloseModal());
  };

  let content;

  if (showModal) {
    content = (
      <div className="fixed w-screen h-screen bg-secondary/40 flex items-center justify-center z-[999]">
        <div className="group select-none w-[270px] relative flex flex-col p-3 items-center justify-center bg-base-300 border border-base-300 shadow-lg rounded-2xl">
          <button
            type="button"
            className="absolute right-0 top-0 m-4 mb-2 md:mb-0 bg-base-200 px-4 py-1 text-sm shadow-lg font-bold tracking-wider border-2 border-gray-600 hover:border-base-200 text-base-content rounded-full hover:shadow-lg hover:bg-base-300 transition ease-in duration-300"
            onClick={handleCloseModal}
          >
            X
          </button>
          <div className="">
            <div className="text-center p-3 flex-auto justify-center">
              {forDelete ? (
                <RiDeleteBin6Fill className="group-hover:animate-bounce w-12 h-12 mx-auto text-error" />
              ) : (
                <FaTrashRestore className="group-hover:animate-bounce w-12 h-12 mx-auto text-error" />
              )}
              <h2 className="text-xl font-bold py-4 text-base-content">Are you sure?</h2>
              <p className="font-bold text-sm text-base-content/70 px-2">
                Do you really want to <span className="text-error">{forDelete ? "delete" : "restore"}</span> this task:{" "}
                <span className="block text-lg font-bold uppercase">{taskId} ?</span>
              </p>
            </div>
            <div className="py-2 mt-2 text-center space-x-1 md:block">
              <button
                type="button"
                className="bg-error hover:bg-transparent px-5 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-red-500 hover:border-red-500 text-error-content hover:text-red-500 rounded-full transition ease-in duration-300"
                onClick={forDelete ? handleDelete : handleRestore}
              >
                {isDelLoading || isResLoading ? "Loading.." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return content;
}
export default DeleteTask;
