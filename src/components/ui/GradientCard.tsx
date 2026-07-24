import React from 'react';
import './GradientCard.css';

export const GradientCard = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={`gradient-card-wrapper ${className}`}>
      <div className="gradient-card-content">
        {children}
      </div>
    </div>
  );
};
