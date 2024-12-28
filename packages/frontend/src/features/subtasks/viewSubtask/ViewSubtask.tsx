import { useState } from "react";
import QuillEditor from "../../../shared/components/Editor/QuilEditor";
import Comment from "../../Comment/Comment";
import ViewSubtaskDetails from "../ViewSubtaskDetails";
import DeleteSubtaskModal from "../deleteSubtask/DeleteSubtaskModal";
import EditSubtaskDetails from "../editSubtaskDetails/EditSubtaskDetails";

const dummyComments = [
  {
    commentId: "c1",
    userId: "AFOP00027",
    taskId: "t1",
    team: "Engineering",
    comment: `
      <div class="comment">
        <h2>Hey everyone!</h2>
        <p>I just wanted to share my thoughts on this topic. itn jkrhvnkfjvhefkjhsbkjhefbvfhksvj bkj,hbvfkjs,vhbnvkjh,vnbfdksvj,dhbfnv fksdjvhbdnkvj,hbvkjh,bvsdfkvjh,bvkjbhkfdj,bvndbsvjhvbd <strong>I found it really insightful</strong>, especially the part about <em>time management</em>.</p>
        <ul>
          <li>Using a planner to organize my tasks.</li>
          <li>Setting specific goals for each day.</li>
          <li>Taking short breaks to avoid burnout.</li>
        </ul>
        <blockquote>
          "Time management is the key to productivity."
        </blockquote>
      </div>
    `,
    createdAt: new Date("2024-01-15T10:30:00"),
  },
  {
    commentId: "c1",
    userId: "AFOP00027",
    taskId: "t1",
    team: "Engineering",
    comment: `
      <div class="comment">
        <h2>Hey everyone!</h2>
        <p>I just wanted to share my thoughts on this topic. itn jkrhvnkfjvhefkjhsbkjhefbvfhksvj bkj,hbvfkjs,vhbnvkjh,vnbfdksvj,dhbfnv fksdjvhbdnkvj,hbvkjh,bvsdfkvjh,bvkjbhkfdj,bvndbsvjhvbd <strong>I found it really insightful</strong>, especially the part about <em>time management</em>.</p>
        <ul>
          <li>Using a planner to organize my tasks.</li>
          <li>Setting specific goals for each day.</li>
          <li>Taking short breaks to avoid burnout.</li>
        </ul>
        <blockquote>
          "Time management is the key to productivity."
        </blockquote>
      </div>
    `,
    createdAt: new Date("2024-01-15T10:30:00"),
  },
  {
    commentId: "c2",
    userId: "AFOP00027",
    taskId: "t1",
    team: "Product",
    comment: `
      <div class="comment">
        <p>Great points! 👍 I'd like to add that <strong>team collaboration</strong> is crucial.</p>
        <p>Here's what we've implemented:</p>
        <ul>
          <li>Daily stand-ups</li>
          <li>Weekly retrospectives</li>
          <li>Shared documentation</li>
        </ul>
      </div>
    `,
    createdAt: new Date("2024-01-15T11:45:00"),
  },
  {
    commentId: "c2",
    userId: "AFOP00027",
    taskId: "t1",
    team: "Product",
    comment: `
      <div class="comment">
        <p>Great points! 👍 I'd like to add that <strong>team collaboration</strong> is crucial.</p>
        <p>Here's what we've implemented:</p>
        <ul>
          <li>Daily stand-ups</li>
          <li>Weekly retrospectives</li>
          <li>Shared documentation</li>
        </ul>
      </div>
    `,
    createdAt: new Date("2024-01-15T11:45:00"),
  },
];

function ViewSubtask() {
  const [showEdit, setShowEdit] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <>
      {showEdit ? (
        <EditSubtaskDetails showEdit={() => setShowEdit(false)} />
      ) : (
        <ViewSubtaskDetails showDeleteModal={() => setShowDeleteModal(true)} showEdit={() => setShowEdit(true)} />
      )}

      <div className="container transition-all">
        <div className="w-full flex justify-between">
          <h6 className="h6 px-2">Comments</h6>
        </div>
        <div>
          <QuillEditor />
          <Comment
            comments={dummyComments}
            onReply={(id) => console.log("Reply to:", id)}
            onEdit={(id) => console.log("Edit:", id)}
            onDelete={(id) => console.log("Delete:", id)}
          />
        </div>
      </div>

      {showDeleteModal && <DeleteSubtaskModal onClose={() => setShowDeleteModal(false)} />}
    </>
  );
}
export default ViewSubtask;
