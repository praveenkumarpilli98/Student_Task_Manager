import React, { ReactNode } from 'react';

interface StatsCardProps {
  title: string;
  value: number;
  icon: ReactNode;
  variant?: 'primary' | 'success' | 'warning';
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  variant = 'primary',
}) => {
  return (
    <div className="stat-card">
      <div className={`stat-icon-wrapper stat-icon-${variant}`}>{icon}</div>
      <div className="stat-info">
        <span className="stat-title">{title}</span>
        <span className="stat-value">{value}</span>
      </div>
    </div>
  );
};
