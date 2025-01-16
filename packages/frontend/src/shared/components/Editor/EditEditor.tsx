import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { getPresentUser } from "../../../features/profile/userProfileSlice";
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

type EditEditorProps = {
  content: string;
  onChange: (e: string) => void;
  handleEditComment: () => void;
  isEditing: boolean;
};

function EditEditor({ content, onChange, handleEditComment, isEditing }: EditEditorProps) {
  const { fullName, profilePicUrl } = useSelector((state: RootState) => getPresentUser(state));

  return (
    <div className="border border-base-300 rounded-t-lg custom-quill-container">
      <ReactQuill theme="snow" value={content} onChange={onChange} modules={modules} className="rounded-b-lg" />
      <div className="flex justify-between p-2 bg-base-300 rounded-b-lg">
        <div className="flex items-center">
          <span>
            {fullName && (
              <Avartar imgUrl={profilePicUrl} name={fullName} className="w-8 h-8 text-sm font-bold rounded-full" />
            )}
          </span>
          <span className="ml-2">{fullName}</span>
        </div>

        {isEditing ? (
          <span className="loading loading-spinner loading-md" />
        ) : (
          <button
            type="button"
            onClick={handleEditComment}
            className="px-4 py-2 button text-center text-base-300 border transition-all bg-base-content hover:scale-[105%] hover:shadow-lg hover:shadow-base-content hover:bg-base-300 hover:text-base-content rounded-lg cursor-pointer ease-in "
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
}
export default EditEditor;
