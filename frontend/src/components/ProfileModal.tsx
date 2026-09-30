import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { X, Mail, Calendar, LogOut, CheckCircle2 } from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  completedTasksCount?: number;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  completedTasksCount = 0,
}) => {
  const { user, logout } = useAuth();

  if (!isOpen || !user) return null;

  const joinDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString(undefined, {
        month: 'long',
        year: 'numeric',
      })
    : 'Recently';

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Student Profile</h2>
          <button
            type="button"
            className="btn-icon"
            onClick={onClose}
            aria-label="Close profile modal"
          >
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '1.5rem' }}>
            <div
              className="user-avatar"
              style={{ width: '64px', height: '64px', fontSize: '1.5rem', marginBottom: '0.75rem' }}
            >
              {user.name.charAt(0).toUpperCase()}
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{user.name}</h3>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Student Account</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem',
                backgroundColor: 'var(--bg-main)',
                borderRadius: 'var(--radius-md)',
              }}
            >
              <Mail size={18} color="var(--primary)" />
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Email Address</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{user.email}</div>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem',
                backgroundColor: 'var(--bg-main)',
                borderRadius: 'var(--radius-md)',
              }}
            >
              <Calendar size={18} color="var(--primary)" />
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Joined</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{joinDate}</div>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem',
                backgroundColor: 'var(--bg-main)',
                borderRadius: 'var(--radius-md)',
              }}
            >
              <CheckCircle2 size={18} color="var(--success)" />
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Tasks Accomplished</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{completedTasksCount} Completed</div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '1.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => {
                onClose();
                logout();
              }}
            >
              <LogOut size={16} />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
