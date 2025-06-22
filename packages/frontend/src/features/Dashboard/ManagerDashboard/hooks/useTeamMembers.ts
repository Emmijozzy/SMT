import { useEffect, useState } from "react";

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  avatar: string;
  completedTasks: number;
  overdueTasks: number;
  productivity: number;
  currentTask: string;
  status: "active" | "busy" | "away";
  workload: number;
  lastActive: string;
  skills: string[];
  email: string;
  phone: string;
}

export const useTeamMembers = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: 1,
      name: "Alex Johnson",
      role: "Senior Developer",
      avatar: "AJ",
      completedTasks: 24,
      overdueTasks: 2,
      productivity: 92,
      currentTask: "User authentication system",
      status: "active",
      workload: 85,
      lastActive: "2 hours ago",
      skills: ["React", "Node.js", "TypeScript"],
      email: "alex.johnson@company.com",
      phone: "+1 (555) 123-4567",
    },
    {
      id: 2,
      name: "Sarah Williams",
      role: "UI/UX Designer",
      avatar: "SW",
      completedTasks: 19,
      overdueTasks: 1,
      productivity: 88,
      currentTask: "Dashboard redesign",
      status: "active",
      workload: 72,
      lastActive: "1 hour ago",
      skills: ["Figma", "Adobe XD", "Prototyping"],
      email: "sarah.williams@company.com",
      phone: "+1 (555) 234-5678",
    },
    {
      id: 3,
      name: "Michael Chen",
      role: "Backend Developer",
      avatar: "MC",
      completedTasks: 22,
      overdueTasks: 3,
      productivity: 85,
      currentTask: "API optimization",
      status: "busy",
      workload: 95,
      lastActive: "30 minutes ago",
      skills: ["Python", "Django", "PostgreSQL"],
      email: "michael.chen@company.com",
      phone: "+1 (555) 345-6789",
    },
    {
      id: 4,
      name: "Emily Davis",
      role: "QA Engineer",
      avatar: "ED",
      completedTasks: 17,
      overdueTasks: 4,
      productivity: 81,
      currentTask: "Testing mobile app",
      status: "away",
      workload: 68,
      lastActive: "4 hours ago",
      skills: ["Selenium", "Jest", "Cypress"],
      email: "emily.davis@company.com",
      phone: "+1 (555) 456-7890",
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // TODO: Replace with Redux RTK query
  const fetchTeamMembers = async () => {
    setLoading(true);
    try {
      // This will be replaced with RTK Query
      // const result = await dispatch(teamApi.endpoints.getTeamMembers.initiate());
      setError(null);
    } catch (err) {
      setError("Failed to fetch team members");
    } finally {
      setLoading(false);
    }
  };

  const updateMemberStatus = async (memberId: number, status: TeamMember["status"]) => {
    try {
      setTeamMembers((prev) => prev.map((member) => (member.id === memberId ? { ...member, status } : member)));
      // TODO: API call with RTK Query
    } catch (err) {
      setError("Failed to update member status");
    }
  };

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  return {
    teamMembers,
    loading,
    error,
    refetch: fetchTeamMembers,
    updateMemberStatus,
  };
};
