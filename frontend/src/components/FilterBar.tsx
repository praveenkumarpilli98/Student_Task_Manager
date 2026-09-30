import React from 'react';
import { FilterStatus, FilterPriority, SortField } from '../types';
import { Plus, SlidersHorizontal } from 'lucide-react';

interface FilterBarProps {
  status: FilterStatus;
  onStatusChange: (status: FilterStatus) => void;
  priority: FilterPriority;
  onPriorityChange: (priority: FilterPriority) => void;
  sortBy: SortField;
  onSortByChange: (sort: SortField) => void;
  onOpenCreateModal: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  status,
  onStatusChange,
  priority,
  onPriorityChange,
  sortBy,
  onSortByChange,
  onOpenCreateModal,
}) => {
  return (
    <div className="filters-group">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)' }}>
        <SlidersHorizontal size={16} />
        <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Filters:</span>
      </div>

      {/* Status Filter */}
      <select
        className="filter-select"
        value={status}
        onChange={(e) => onStatusChange(e.target.value as FilterStatus)}
        aria-label="Filter by status"
      >
        <option value="all">Status: All</option>
        <option value="pending">Status: Pending</option>
        <option value="completed">Status: Completed</option>
      </select>

      {/* Priority Filter */}
      <select
        className="filter-select"
        value={priority}
        onChange={(e) => onPriorityChange(e.target.value as FilterPriority)}
        aria-label="Filter by priority"
      >
        <option value="all">Priority: All</option>
        <option value="low">Priority: Low</option>
        <option value="medium">Priority: Medium</option>
        <option value="high">Priority: High</option>
      </select>

      {/* Sort By */}
      <select
        className="filter-select"
        value={sortBy}
        onChange={(e) => onSortByChange(e.target.value as SortField)}
        aria-label="Sort tasks by"
      >
        <option value="createdAt">Sort: Newest First</option>
        <option value="dueDate">Sort: Due Date</option>
        <option value="priority">Sort: Priority</option>
        <option value="title">Sort: Title (A-Z)</option>
      </select>

      {/* Add Task Button */}
      <button
        type="button"
        className="btn btn-primary"
        onClick={onOpenCreateModal}
        style={{ marginLeft: 'auto' }}
      >
        <Plus size={18} />
        <span>Add Task</span>
      </button>
    </div>
  );
};
