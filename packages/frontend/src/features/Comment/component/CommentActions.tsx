type CommentActionsProps = {
  onShowEdit: () => void;
  onShowDelete: () => void;
  showEdit: boolean;
};

export function CommentActions({ onShowEdit, onShowDelete, showEdit }: CommentActionsProps) {
  return (
    <div className="flex gap-4 ml-8 mt-2">
      <button onClick={onShowEdit} className="btn btn-ghost btn-xs" type="button">
        {showEdit ? "Cancel" : "Edit"}
      </button>
      <button onClick={onShowDelete} className="btn btn-ghost btn-xs text-error" type="button">
        Delete
      </button>
    </div>
  );
}
