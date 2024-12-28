type Props = {
  onClose: () => void;
  onDelete: () => void;
};

function DeleteCommentModal({ onClose, onDelete }: Props) {
  return (
    <dialog className="modal sm:modal-middle visible opacity-100 pointer-events-auto bg-base-300/50">
      <div className="modal-box  bg-base-content p-6 rounded-lg shadow-lg">
        {/* SVG Icon for Warning */}
        <div className="flex justify-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-red-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        {/* Modal Title and Message */}
        <h3 className="font-bold text-xl text-center text-base-300 mb-2">Delete Comment?</h3>
        <p className="text-center text-base-300/70 mb-6">
          Are you sure you want to delete this comment? This action cannot be undone.
        </p>

        {/* Action Buttons */}
        <div className="modal-action flex justify-center space-x-4">
          <form method="dialog" className="flex justify-center space-x-4">
            {/* Cancel Button */}
            <button
              type="button"
              onClick={onClose}
              className="btn bg-base-200/20 text-base-300 hover:bg-base-300/30 px-6 py-2 rounded-lg"
            >
              Cancel
            </button>
            {/* Delete Button */}
            <button
              type="button"
              onClick={onDelete}
              className="btn bg-red-500 text-base-content hover:bg-red-600 px-6 py-2 rounded-lg"
            >
              Delete
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
}

export default DeleteCommentModal;
