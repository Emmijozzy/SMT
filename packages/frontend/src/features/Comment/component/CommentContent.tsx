/* eslint-disable react/no-danger */
import User from "../../../shared/components/User";
import formatDateTime from "../../../shared/utils/formatDateTime";
import { IUser } from "../../users/userInterface";
import { CommentType } from "../commentInterface";

type CommentContentProps = {
  commentUser: IUser | null;
  userIsLoading: boolean;
  comment: CommentType;
  createdAt: string;
};

export function CommentContent({ comment, createdAt, commentUser, userIsLoading }: CommentContentProps) {
  return (
    <>
      <div className="flex items-center gap-2 w-full">
        <User userId={comment.userId} index={0} />
        <span className="font-bold">{userIsLoading || !commentUser ? "Loading..." : commentUser.fullName}</span>
        <span className="text-base-content/50 text-xs ml-auto">{formatDateTime(new Date(createdAt))}</span>
      </div>
      <div className="flex items-center ml-8 mt-1">
        <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: comment.comment }} />
      </div>
    </>
  );
}
