/* eslint-disable react/no-danger */
import User from "../../../shared/components/User";
import formatDateTime from "../../../shared/utils/formatDateTime";
import { CommentType } from "../commentInterface";

type CommentContentProps = {
  userName: string;
  comment: CommentType;
  createdAt: string;
};

export function CommentContent({ userName, comment, createdAt }: CommentContentProps) {
  return (
    <>
      <div className="flex items-center gap-2 w-full">
        <User userId={comment.userId} index={0} />
        <span className="font-bold">{userName}</span>
        <span className="text-base-content/50 text-xs ml-auto">{formatDateTime(new Date(createdAt))}</span>
      </div>
      <div className="flex items-center ml-8 mt-1">
        <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: comment.comment }} />
      </div>
    </>
  );
}
