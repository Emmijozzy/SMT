import { useState, useEffect } from 'react';

export interface Activity {
  id: number;
  user: string;
  action: string;
  item: string;
  time: string;
  type: 'success' | 'info' | 'warning' | 'error';
  avatar: string;
}

export const useManagerActivity = () => {
  const [activities, setActivities] = useState<Activity[]>([
    {
      id: 1,
      user: "Alex Johnson",
      action: "completed",
      item: "User authentication module",
      time: "2 hours ago",
      type: "success",
      avatar: "AJ",
    },
    {
      id: 2,
      user: "Sarah Williams",
      action: "submitted for review",
      item: "Mobile app wireframes",
      time: "4 hours ago",
      type: "info",
      avatar: "SW",
    },
    {
      id: 3,
      user: "Michael Chen",
      action: "reported issue with",
      item: "Payment gateway testing",
      time: "6 hours ago",
      type: "warning",
      avatar: "MC",
    },
    {
      id: 4,
      user: "Emily Davis",
      action: "started working on",
      item: "Security audit documentation",
      time: "8 hours ago",
      type: "info",
      avatar: "ED",
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // TODO: Replace with Redux RTK query
  const fetchActivities = async () => {
    setLoading(true);
    try {
      // This will be replaced with RTK Query
      // const result = await dispatch(activityApi.endpoints.getActivities.initiate());
      setError(null);
    } catch (err) {
      setError('Failed to fetch activities');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  return {
    activities,
    loading,
    error,
    refetch: fetchActivities,
  };
};
