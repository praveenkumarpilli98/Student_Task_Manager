import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { CheckSquare, LogOut, Menu } from 'lucide-react';

interface NavbarProps {
  onToggleSidebar?: () => void;
  onOpenProfile: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onToggleSidebar,
  onOpenProfile,
}) => {
  const { user, logout } = useAuth();

  return (
    <header className="navbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        {onToggleSidebar && (
          <button
            type="button"
            className="btn-icon"
            onClick={onToggleSidebar}
            aria-label="Toggle navigation menu"
            style={{ display: 'inline-flex' }}
          >
            <Menu size={20} />
          </button>
        )}

        <div className="navbar-brand">
          <CheckSquare size={24} strokeWidth={2.5} />
          <span>Student Task Manager</span>
        </div>
      </div>

      {user && (
        <div className="navbar-actions">
          <div
            className="user-profile-badge"
            onClick={onOpenProfile}
            title="View student profile"
            role="button"
            tabIndex={0}
          >
            <div className="user-avatar">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <span style={{ maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {user.name}
            </span>
          </div>

          <button
            type="button"
            className="btn-icon"
            onClick={logout}
            title="Log Out"
            aria-label="Log Out"
            style={{ color: 'var(--text-muted)' }}
          >
            <LogOut size={19} />
          </button>
        </div>
      )}
    </header>
  );
};
