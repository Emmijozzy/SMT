import { useEffect, useState } from "react";
import { ManagerTask } from "../type";

export const useManagerTasks = () => {
  const [tasks, setTasks] = useState<ManagerTask[]>([
    {
      id: 1,
      title: "Implement payment gateway integration",
      project: "E-commerce Platform",
      assignedTo: "Michael Chen",
      due: "2024-01-15",
      priority: "critical",
      status: "in-progress",
      progress: 65,
      estimatedHours: 16,
      actualHours: 12,
      tags: ["Backend", "Payment", "Security"],
      description: "Integrate Stripe payment gateway with proper error handling and security measures",
      blockers: ["Waiting for API keys from client"],
    },
    {
      id: 2,
      title: "Mobile app UI redesign",
      project: "Mobile Application",
      assignedTo: "Sarah Williams",
      due: "2024-01-18",
      priority: "high",
      status: "in-review",
      progress: 95,
      estimatedHours: 24,
      actualHours: 22,
      tags: ["UI/UX", "Mobile", "Design"],
      description: "Redesign the mobile app interface based on user feedback",
      blockers: [],
    },
    {
      id: 3,
      title: "Database optimization",
      project: "Performance Improvement",
      assignedTo: "Alex Johnson",
      due: "2024-01-20",
      priority: "medium",
      status: "pending",
      progress: 15,
      estimatedHours: 12,
      actualHours: 2,
      tags: ["Database", "Performance"],
      description: "Optimize database queries and improve response times",
      blockers: [],
    },
    {
      id: 4,
      title: "Security audit report",
      project: "Security Assessment",
      assignedTo: "Emily Davis",
      due: "2024-01-12",
      priority: "critical",
      status: "in-review",
      progress: 100,
      estimatedHours: 8,
      actualHours: 10,
      tags: ["Security", "Audit", "Documentation"],
      description: "Complete comprehensive security audit and generate report",
      blockers: ["Pending client access to production environment"],
    },
    {
      id: 4,
      title: "Security audit report",
      project: "Security Assessment",
      assignedTo: "Emily Davis",
      due: "2024-01-12",
      priority: "critical",
      status: "in-review",
      progress: 100,
      estimatedHours: 8,
      actualHours: 10,
      tags: ["Security", "Audit", "Documentation"],
      description: "Complete comprehensive security audit and generate report",
      blockers: ["Pending client access to production environment"],
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // TODO: Replace with Redux RTK query
  const fetchTasks = async () => {
    setLoading(true);
    try {
      // This will be replaced with RTK Query
      // const result = await dispatch(tasksApi.endpoints.getTasks.initiate());
      setError(null);
    } catch (err) {
      setError("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (taskData: Omit<ManagerTask, "id">) => {
    try {
      const newTask = { ...taskData, id: Date.now() };
      setTasks((prev) => [...prev, newTask]);
      // TODO: API call with RTK Query
    } catch (err) {
      setError("Failed to create task");
    }
  };

  const updateTask = async (taskId: number, updates: Partial<ManagerTask>) => {
    try {
      setTasks((prev) => prev.map((task) => (task.id === taskId ? { ...task, ...updates } : task)));
      // TODO: API call with RTK Query
    } catch (err) {
      setError("Failed to update task");
    }
  };

  const deleteTask = async (taskId: number) => {
    try {
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
      // TODO: API call with RTK Query
    } catch (err) {
      setError("Failed to delete task");
    }
  };

  useEffect(() => {
    fetchTasks().finally(() => {
      // TODO: RTK Query
    });
  }, []);
  return {
    tasks,
    loading,
    error,
    refetch: fetchTasks,
    createTask,
    updateTask,
    deleteTask,
  };
};
