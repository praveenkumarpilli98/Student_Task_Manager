import React from 'react';
import { Task } from '../types';
import {
  CheckCircle2,
  Circle,
  Calendar,
  Pencil,
  Trash2,
  AlertTriangle,
} from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onToggleComplete: (id: string, currentStatus: boolean) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onToggleComplete,
  onEdit,
  onDelete,
}) => {
  // Format due date
  const formatDueDate = (dateString?: string | null) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return null;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const taskDate = new Date(date);
    taskDate.setHours(0, 0, 0, 0);

    const isOverdue = taskDate < today && !task.completed;
    const isToday = taskDate.getTime() === today.getTime();

    const formatted = date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined,
    });

    return {
      text: isToday ? `Today (${formatted})` : formatted,
      isOverdue,
    };
  };

  const dueDateInfo = formatDueDate(task.dueDate);

  return (
    <div className={`task-card ${task.completed ? 'is-completed' : ''}`}>
      {/* Top Priority Accent Bar */}
      <div className={`task-card-accent accent-${task.priority}`} />

      {/* Header with completion checkbox and title */}
      <div className="task-header">
        <button
          type="button"
          className={`task-checkbox-btn ${task.completed ? 'checked' : ''}`}
          onClick={() => onToggleComplete(task._id, task.completed)}
          title={task.completed ? 'Mark as incomplete' : 'Mark as completed'}
          aria-label={task.completed ? 'Mark as incomplete' : 'Mark as completed'}
        >
          {task.completed ? (
            <CheckCircle2 size={22} />
          ) : (
            <Circle size={22} />
          )}
        </button>

        <h3 className={`task-title ${task.completed ? 'completed' : ''}`}>
          {task.title}
        </h3>
      </div>

      {/* Description */}
      {task.description && (
        <p className="task-description">{task.description}</p>
      )}

      {/* Meta Badges (Priority & Due Date) */}
      <div className="task-meta">
        <span className={`badge badge-${task.priority}`}>
          {task.priority === 'high' && <AlertTriangle size={12} />}
          {task.priority} Priority
        </span>

        {dueDateInfo && (
          <span
            className={`badge badge-date ${
              dueDateInfo.isOverdue ? 'overdue' : ''
            }`}
          >
            <Calendar size={12} />
            {dueDateInfo.isOverdue ? `Overdue: ${dueDateInfo.text}` : dueDateInfo.text}
          </span>
        )}
      </div>

      {/* Footer with action buttons */}
      <div className="task-footer">
        <button
          type="button"
          className={`btn ${task.completed ? 'btn-secondary' : 'btn-primary'}`}
          style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem' }}
          onClick={() => onToggleComplete(task._id, task.completed)}
        >
          {task.completed ? 'Completed' : 'Mark Complete'}
        </button>

        <div className="task-actions">
          <button
            type="button"
            className="btn-icon"
            onClick={() => onEdit(task)}
            title="Edit task"
            aria-label="Edit task"
          >
            <Pencil size={17} />
          </button>
          <button
            type="button"
            className="btn-icon"
            onClick={() => {
              if (window.confirm(`Are you sure you want to delete "${task.title}"?`)) {
                onDelete(task._id);
              }
            }}
            title="Delete task"
            style={{ color: 'var(--danger)' }}
            aria-label="Delete task"
          >
            <Trash2 size={17} />
          </button>
        </div>
      </div>
    </div>
  );
};
