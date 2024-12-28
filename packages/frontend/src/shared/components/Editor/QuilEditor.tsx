import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Avartar from "../Avartar";

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["blockquote"],
    ["link", "code"],
    ["clean"],
  ],
};

function QuillEditor() {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    window.prompt("Editor Content:", value);
  };

  return (
    <>
      <div className="border border-base-300 rounded-t-lg custom-quill-container">
        <ReactQuill theme="snow" value={value} onChange={setValue} modules={modules} className="rounded-b-lg" />
        <div className="flex justify-between p-2 bg-base-300 rounded-b-lg">
          <div className="flex items-center">
            <span>
              <Avartar imgUrl="" name="John Doe" className="w-8 h-8 rounded-full" />
            </span>
            <span className="ml-2">John Doe</span>
          </div>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-4 py-2 button text-center text-base-300 border transition-all bg-base-content hover:scale-[105%] hover:shadow-lg hover:shadow-base-content hover:bg-base-300 hover:text-base-content rounded-lg cursor-pointer ease-in "
          >
            Add
          </button>
        </div>
      </div>
      {/* <div className="mt-4 bg-base-100 rounded-lg">
        {dummyArr.map(() => (
          <div className="comment flex flex-col items-start">
            <div className="flex items-center gap-2">
              <span>
      v                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            <Avartar imgUrl="" name="John Doe" className="w-8 h-8 rounded-full" />
              </span>
              <span className="font-bold">John Doe</span>
              <span className="text-base-content/50 text-xs">2 hours ago</span>
            </div>
            <div className="flex items-center ml-8 mt-1">
              <div dangerouslySetInnerHTML={{ __html: value }} />
            </div>
          </div>
        ))}
      </div> */}
    </>
  );
}
export default QuillEditor;
