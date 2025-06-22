/* eslint-disable jsx-a11y/anchor-is-valid */
import { FiCalendar, FiFileText, FiList, FiUserPlus } from "react-icons/fi";

interface FloatingActionButtonProps {
  onCreateTask: () => void;
  onAddMember: () => void;
  onScheduleMeeting: () => void;
  onGenerateReport: () => void;
}

export function FloatingActionButton({
  onCreateTask,
  onAddMember,
  onScheduleMeeting,
  onGenerateReport,
}: FloatingActionButtonProps) {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="dropdown dropdown-top dropdown-end">
        <button type="button" className="btn btn-primary btn-circle btn-lg shadow-lg" aria-label="Open actions menu">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
        </button>
        <ul className="dropdown-content z-[1] menu p-2 shadow-lg bg-base-100 rounded-box w-52 mb-2">
          <li>
            <button type="button" onClick={onCreateTask} className="flex items-center w-full text-left">
              <FiList className="h-4 w-4" />
              Create Task
            </button>
          </li>
          <li>
            <button type="button" onClick={onAddMember} className="flex items-center w-full text-left">
              <FiUserPlus className="h-4 w-4" />
              Add Team Member
            </button>
          </li>
          <li>
            <button type="button" onClick={onScheduleMeeting} className="flex items-center w-full text-left">
              <FiCalendar className="h-4 w-4" />
              Schedule Meeting
            </button>
          </li>
          <li>
            <button type="button" onClick={onGenerateReport} className="flex items-center w-full text-left">
              <FiFileText className="h-4 w-4" />
              Generate Report
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
