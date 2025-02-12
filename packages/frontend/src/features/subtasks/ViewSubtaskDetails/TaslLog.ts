export interface ChecklistItem {
  label: string;
  completed: boolean;
}

export interface TaskUpdate {
  id: string;
  timestamp: Date;
  action: string;
  actor: {
    name: string;
    role: string;
  };
  details?: {
    summary?: string;
    deliverables?: string[];
    checklist?: ChecklistItem[];
    feedback?: string;
    decision?: string;
  };
}

export const generateDummyLogs = (): TaskUpdate[] => [
  {
    id: "1",
    timestamp: new Date("2024-02-01T09:00:00"),
    action: "Task created",
    actor: {
      name: "Sarah Chen",
      role: "Manager",
    },
    details: {
      checklist: [
        { label: "Design updated", completed: false },
        { label: "Code tested", completed: false },
        { label: "Documentation added", completed: false },
      ],
    },
  },
  {
    id: "2",
    timestamp: new Date("2024-02-01T10:30:00"),
    action: "Task assigned",
    actor: {
      name: "Sarah Chen",
      role: "Manager",
    },
    details: {
      decision: "Assigned to John Smith",
    },
  },
  {
    id: "3",
    timestamp: new Date("2024-02-02T09:15:00"),
    action: "Status updated",
    actor: {
      name: "John Smith",
      role: "Developer",
    },
    details: {
      decision: "Moved to \"In Progress\"",
    },
  },
  {
    id: "4",
    timestamp: new Date("2024-02-03T16:45:00"),
    action: "Task submitted for review",
    actor: {
      name: "John Smith",
      role: "Developer",
    },
    details: {
      summary: "Completed homepage redesign with new brand guidelines",
      deliverables: ["homepage-v1.zip", "design-specs.pdf"],
      checklist: [
        { label: "Design updated", completed: true },
        { label: "Code tested", completed: true },
        { label: "Documentation added", completed: false },
      ],
    },
  },
  {
    id: "5",
    timestamp: new Date("2024-02-04T10:00:00"),
    action: "Review completed",
    actor: {
      name: "Sarah Chen",
      role: "Manager",
    },
    details: {
      feedback:
        "Great work on the design implementation. However, documentation is missing and there are some responsive design issues on tablet devices.",
      decision: "Moved to \"Needs Revision\"",
    },
  },
  {
    id: "6",
    timestamp: new Date("2024-02-05T14:20:00"),
    action: "Task updated",
    actor: {
      name: "John Smith",
      role: "Developer",
    },
    details: {
      summary: "Added documentation and fixed responsive design issues",
      deliverables: ["homepage-v2.zip", "design-specs.pdf", "documentation.md"],
      checklist: [
        { label: "Design updated", completed: true },
        { label: "Code tested", completed: true },
        { label: "Documentation added", completed: true },
      ],
    },
  },
  {
    id: "7",
    timestamp: new Date("2024-02-06T11:30:00"),
    action: "Task approved",
    actor: {
      name: "Sarah Chen",
      role: "Manager",
    },
    details: {
      feedback: "Excellent work! All requirements have been met.",
      decision: "Moved to \"Completed\"",
    },
  },
  {
    id: "8",
    timestamp: new Date("2024-02-06T11:35:00"),
    action: "Task archived",
    actor: {
      name: "System",
      role: "Automated",
    },
    details: {
      decision: "Task automatically archived after completion",
    },
  },
];
