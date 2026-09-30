import React from 'react';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'small' | 'medium' | 'large';
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = 'Loading tasks...',
  size = 'medium',
}) => {
  const dimension = size === 'small' ? '24px' : size === 'large' ? '48px' : '36px';

  return (
    <div className="spinner-wrapper">
      <div
        className="spinner"
        style={{ width: dimension, height: dimension }}
      />
      {message && <span>{message}</span>}
    </div>
  );
};
