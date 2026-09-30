import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useAuth } from '../hooks/useAuth';
import { taskService } from '../services/taskService';
import { Task, TaskStats, FilterStatus, FilterPriority, SortField, Priority } from '../types';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { StatsCard } from '../components/StatsCard';
import { SearchBar } from '../components/SearchBar';
import { FilterBar } from '../components/FilterBar';
import { TaskList } from '../components/TaskList';
import { TaskForm } from '../components/TaskForm';
import { ProfileModal } from '../components/ProfileModal';
import { ErrorMessage } from '../components/ErrorMessage';
import { ClipboardList, CheckCircle2, Clock } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  // Tasks state
  const [tasks, setTasks] = useState<Task[]>([]);
  const [stats, setStats] = useState<TaskStats>({ total: 0, completed: 0, pending: 0 });
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Filters and search state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<FilterStatus>('all');
  const [priorityFilter, setPriorityFilter] = useState<FilterPriority>('all');
  const [sortBy, setSortBy] = useState<SortField>('createdAt');

  // Modals & responsive drawer state
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);

  // Fetch tasks from backend MongoDB API
  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setErrorMessage('');
      const data = await taskService.getTasks({
        status: statusFilter,
        priority: priorityFilter,
        search: searchQuery,
        sortBy,
        sortOrder: sortBy === 'title' ? 'asc' : 'desc',
      });
      setTasks(data.tasks);
      setStats(data.stats);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to fetch tasks from server.');
    } finally {
      setLoading(false);
    }
  }, [statusFilter, priorityFilter, searchQuery, sortBy]);

  // Load tasks on filter/search change
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchTasks();
    }, 250);
    return () => clearTimeout(debounceTimer);
  }, [fetchTasks]);

  // Handle task creation or update
  const handleSaveTask = async (data: {
    title: string;
    description: string;
    priority: Priority;
    dueDate?: string | null;
  }) => {
    if (taskToEdit) {
      await taskService.updateTask(taskToEdit._id, data);
    } else {
      await taskService.createTask(data);
    }
    // Refresh list
    await fetchTasks();
  };

  // Handle task complete toggle
  const handleToggleComplete = async (id: string, currentStatus: boolean) => {
    try {
      // Optimistic update for snappy UI
      setTasks((prev) =>
        prev.map((t) => (t._id === id ? { ...t, completed: !currentStatus } : t))
      );
      setStats((prev) => ({
        ...prev,
        completed: currentStatus ? prev.completed - 1 : prev.completed + 1,
        pending: currentStatus ? prev.pending + 1 : prev.pending - 1,
      }));

      await taskService.toggleComplete(id, !currentStatus);
      // Synchronize in background
      await fetchTasks();
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to update task completion status.');
      // Revert on error
      await fetchTasks();
    }
  };

  // Handle delete task
  const handleDeleteTask = async (id: string) => {
    try {
      // Optimistic removal
      setTasks((prev) => prev.filter((t) => t._id !== id));
      await taskService.deleteTask(id);
      await fetchTasks();
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to delete task.');
      await fetchTasks();
    }
  };

  // Open modal for new task
  const handleOpenCreateModal = () => {
    setTaskToEdit(null);
    setIsTaskModalOpen(true);
  };

  // Open modal for editing existing task
  const handleOpenEditModal = (task: Task) => {
    setTaskToEdit(task);
    setIsTaskModalOpen(true);
  };

  const hasActiveFilters = useMemo(() => {
    return statusFilter !== 'all' || priorityFilter !== 'all' || searchQuery.trim() !== '';
  }, [statusFilter, priorityFilter, searchQuery]);

  return (
    <div className="app-container">
      {/* Top Navbar */}
      <Navbar
        onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
        onOpenProfile={() => setIsProfileModalOpen(true)}
      />

      <div className="dashboard-layout">
        {/* Sidebar */}
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          currentFilter={statusFilter}
          onSelectFilter={(status) => setStatusFilter(status)}
          onOpenProfile={() => setIsProfileModalOpen(true)}
          stats={stats}
        />

        {/* Main Dashboard Content Area */}
        <main className="dashboard-main">
          {/* Welcome Message */}
          <div style={{ marginBottom: '1.75rem' }}>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
              Welcome back, {user?.name?.split(' ')[0] || 'Student'}! 🎓
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '0.25rem' }}>
              Here is an overview of your academic tasks, assignments, and deadlines.
            </p>
          </div>

          {/* Error Message banner */}
          <ErrorMessage
            message={errorMessage}
            onDismiss={() => setErrorMessage('')}
          />

          {/* Statistics Cards */}
          <section className="stats-grid" aria-label="Dashboard Statistics">
            <StatsCard
              title="Total Tasks"
              value={stats.total}
              icon={<ClipboardList size={26} />}
              variant="primary"
            />
            <StatsCard
              title="Completed Tasks"
              value={stats.completed}
              icon={<CheckCircle2 size={26} />}
              variant="success"
            />
            <StatsCard
              title="Pending Tasks"
              value={stats.pending}
              icon={<Clock size={26} />}
              variant="warning"
            />
          </section>

          {/* Controls Bar: Search, Filters, Add Button */}
          <section className="controls-bar" aria-label="Task Controls">
            <SearchBar
              value={searchQuery}
              onChange={(val) => setSearchQuery(val)}
            />
            <FilterBar
              status={statusFilter}
              onStatusChange={(status) => setStatusFilter(status)}
              priority={priorityFilter}
              onPriorityChange={(p) => setPriorityFilter(p)}
              sortBy={sortBy}
              onSortByChange={(s) => setSortBy(s)}
              onOpenCreateModal={handleOpenCreateModal}
            />
          </section>

          {/* Tasks List / Grid */}
          <section aria-label="Tasks List">
            <TaskList
              tasks={tasks}
              loading={loading}
              onToggleComplete={handleToggleComplete}
              onEdit={handleOpenEditModal}
              onDelete={handleDeleteTask}
              onOpenCreateModal={handleOpenCreateModal}
              hasFilters={hasActiveFilters}
            />
          </section>
        </main>
      </div>

      {/* Task Creation / Edit Modal */}
      <TaskForm
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onSubmit={handleSaveTask}
        initialData={taskToEdit}
      />

      {/* Student Profile Modal */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        completedTasksCount={stats.completed}
      />
    </div>
  );
};
