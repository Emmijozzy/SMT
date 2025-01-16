import { memo } from "react";
import { Loader } from "../../../../routes/LazyWrapper2";
import QuillEditor from "../../../../shared/components/Editor/QuilEditor";
import Comment from "../../../Comment/Comment";
import { CommentSectionProps } from "../interfaces/SubtaskViewProps";

const CommentSection = memo(
  ({ comments, isLoading, isSubmitting, onAddComment, onEditComment, onDeleteComment }: CommentSectionProps) => {
    const hasComments = comments.length > 0;

    return (
      <div className="container transition-all">
        <div className="w-full flex justify-between">
          <h6 className="h6 px-2">Comments</h6>
        </div>
        <div>
          <QuillEditor handleAddComment={onAddComment} isAdding={isSubmitting} />
          {isLoading ? (
            <Loader transparent />
          ) : (
            hasComments && (
              <Comment
                comments={comments}
                onEdit={onEditComment}
                onDelete={onDeleteComment}
                isEditing={false}
                isDeleting={false}
              />
            )
          )}
        </div>
      </div>
    );
  },
);

export default CommentSection;
