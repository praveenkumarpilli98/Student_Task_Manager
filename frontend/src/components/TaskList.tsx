import React from 'react';
import { Task } from '../types';
import { TaskCard } from './TaskCard';
import { LoadingSpinner } from './LoadingSpinner';
import { ClipboardList, Plus } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  loading: boolean;
  onToggleComplete: (id: string, currentStatus: boolean) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onOpenCreateModal: () => void;
  hasFilters: boolean;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  loading,
  onToggleComplete,
  onEdit,
  onDelete,
  onOpenCreateModal,
  hasFilters,
}) => {
  if (loading) {
    return <LoadingSpinner message="Fetching your tasks..." />;
  }

  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">
          <ClipboardList size={32} />
        </div>
        <h3 className="empty-state-title">
          {hasFilters ? 'No matching tasks found' : 'You have no tasks yet'}
        </h3>
        <p className="empty-state-text">
          {hasFilters
            ? 'Try adjusting your search query, status filter, or priority filter to see more tasks.'
            : 'Stay on top of your coursework, assignments, and study sessions by creating your first task!'}
        </p>
        <button
          type="button"
          className="btn btn-primary"
          onClick={onOpenCreateModal}
        >
          <Plus size={18} />
          <span>Add New Task</span>
        </button>
      </div>
    );
  }

  return (
    <div className="tasks-grid">
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onToggleComplete={onToggleComplete}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
