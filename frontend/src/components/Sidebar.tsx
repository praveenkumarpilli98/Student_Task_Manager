import React from 'react';
import { FilterStatus, TaskStats } from '../types';
import { useAuth } from '../hooks/useAuth';
import {
  ListTodo,
  Clock,
  CheckCircle,
  User as UserIcon,
  LogOut,
  Sparkles,
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentFilter: FilterStatus;
  onSelectFilter: (status: FilterStatus) => void;
  onOpenProfile: () => void;
  stats: TaskStats;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  currentFilter,
  onSelectFilter,
  onOpenProfile,
  stats,
}) => {
  const { logout } = useAuth();

  const handleFilterClick = (status: FilterStatus) => {
    onSelectFilter(status);
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div
          className="sidebar-backdrop"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-nav">
          <div
            style={{
              padding: '0.25rem 0.5rem 1rem',
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: 'var(--text-light)',
            }}
          >
            Workspaces & Views
          </div>

          <button
            type="button"
            className={`sidebar-link ${currentFilter === 'all' ? 'active' : ''}`}
            onClick={() => handleFilterClick('all')}
          >
            <ListTodo size={18} />
            <span style={{ flex: 1 }}>All Tasks</span>
            <span
              style={{
                fontSize: '0.75rem',
                padding: '0.15rem 0.5rem',
                borderRadius: 'var(--radius-full)',
                backgroundColor: currentFilter === 'all' ? 'rgba(255,255,255,0.2)' : 'var(--bg-main)',
              }}
            >
              {stats.total}
            </span>
          </button>

          <button
            type="button"
            className={`sidebar-link ${currentFilter === 'pending' ? 'active' : ''}`}
            onClick={() => handleFilterClick('pending')}
          >
            <Clock size={18} />
            <span style={{ flex: 1 }}>Pending</span>
            <span
              style={{
                fontSize: '0.75rem',
                padding: '0.15rem 0.5rem',
                borderRadius: 'var(--radius-full)',
                backgroundColor: currentFilter === 'pending' ? 'rgba(255,255,255,0.2)' : 'var(--bg-main)',
              }}
            >
              {stats.pending}
            </span>
          </button>

          <button
            type="button"
            className={`sidebar-link ${currentFilter === 'completed' ? 'active' : ''}`}
            onClick={() => handleFilterClick('completed')}
          >
            <CheckCircle size={18} />
            <span style={{ flex: 1 }}>Completed</span>
            <span
              style={{
                fontSize: '0.75rem',
                padding: '0.15rem 0.5rem',
                borderRadius: 'var(--radius-full)',
                backgroundColor: currentFilter === 'completed' ? 'rgba(255,255,255,0.2)' : 'var(--bg-main)',
              }}
            >
              {stats.completed}
            </span>
          </button>
        </div>

        <div className="sidebar-footer">
          {/* Quick Motivational Tip Box */}
          <div
            style={{
              padding: '0.85rem',
              backgroundColor: 'var(--primary-light)',
              borderRadius: 'var(--radius-md)',
              marginBottom: '1rem',
              fontSize: '0.8rem',
              color: 'var(--primary)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, marginBottom: '0.25rem' }}>
              <Sparkles size={14} />
              <span>Study Tip</span>
            </div>
            Break large assignments into smaller actionable steps!
          </div>

          <button
            type="button"
            className="sidebar-link"
            onClick={() => {
              onOpenProfile();
              onClose();
            }}
          >
            <UserIcon size={18} />
            <span>Profile Settings</span>
          </button>

          <button
            type="button"
            className="sidebar-link"
            style={{ color: 'var(--danger-text)' }}
            onClick={logout}
          >
            <LogOut size={18} />
            <span>Log Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};
