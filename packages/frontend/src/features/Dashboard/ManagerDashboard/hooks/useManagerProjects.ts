import { useEffect, useState } from "react";
import { ManagerProject } from "../type";

export const useManagerProjects = () => {
  const [projects, setProjects] = useState<ManagerProject[]>([
    {
      id: 1,
      name: "E-commerce Platform",
      progress: 68,
      deadline: "2024-02-28",
      status: "active",
      teamSize: 5,
      tasksCompleted: 34,
      totalTasks: 50,
      priority: "high",
      budget: 150000,
      budgetUsed: 98000,
      client: "TechCorp Inc.",
      manager: "You",
      description: "Complete e-commerce solution with payment integration",
    },
    {
      id: 2,
      name: "Mobile Application",
      progress: 45,
      deadline: "2024-03-15",
      status: "active",
      teamSize: 4,
      tasksCompleted: 18,
      totalTasks: 40,
      priority: "medium",
      budget: 120000,
      budgetUsed: 54000,
      client: "StartupXYZ",
      manager: "You",
      description: "Cross-platform mobile app for inventory management",
    },
    {
      id: 3,
      name: "Legacy System Migration",
      progress: 25,
      deadline: "2024-04-30",
      status: "planning",
      teamSize: 6,
      tasksCompleted: 8,
      totalTasks: 32,
      priority: "low",
      budget: 200000,
      budgetUsed: 25000,
      client: "Enterprise Corp",
      manager: "You",
      description: "Migrate legacy systems to modern cloud infrastructure",
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // TODO: Replace with Redux RTK query
  const fetchProjects = async () => {
    setLoading(true);
    try {
      // This will be replaced with RTK Query
      // const result = await dispatch(projectsApi.endpoints.getProjects.initiate());
      setError(null);
    } catch (err) {
      setError("Failed to fetch projects");
    } finally {
      setLoading(false);
    }
  };

  const createProject = async (projectData: Omit<ManagerProject, "id">) => {
    try {
      const newProject = { ...projectData, id: Date.now() };
      setProjects((prev) => [...prev, newProject]);
      // TODO: API call with RTK Query
    } catch (err) {
      setError("Failed to create project");
    }
  };

  const updateProject = async (projectId: number, updates: Partial<ManagerProject>) => {
    try {
      setProjects((prev) => prev.map((project) => (project.id === projectId ? { ...project, ...updates } : project)));
      // TODO: API call with RTK Query
    } catch (err) {
      setError("Failed to update project");
    }
  };

  useEffect(() => {
    fetchProjects().finally(() => {
      // TODO: Implement refresh logic
    });
  }, []);

  return {
    projects,
    loading,
    error,
    refetch: fetchProjects,
    createProject,
    updateProject,
  };
};
