import { useState, useCallback } from 'react';

export type TimeFilter = 'today' | 'week' | 'month';
export type ActiveTab = 'overview' | 'team' | 'tasks' | 'projects' | 'analytics';

export const useDashboardFilters = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('week');
  const [searchTerm, setSearchTerm] = useState('');

  const handleTabChange = useCallback((tab: ActiveTab) => {
    setActiveTab(tab);
  }, []);

  const handleTimeFilterChange = useCallback((filter: TimeFilter) => {
    setTimeFilter(filter);
  }, []);

  const handleSearchChange = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  const resetFilters = useCallback(() => {
    setActiveTab('overview');
    setTimeFilter('week');
    setSearchTerm('');
  }, []);

  return {
    activeTab,
    timeFilter,
    searchTerm,
    handleTabChange,
    handleTimeFilterChange,
    handleSearchChange,
    resetFilters,
  };
};
