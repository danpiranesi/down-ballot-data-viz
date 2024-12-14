'use client'
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;  // new prop for no padding in container...?
}

export const Card = ({ 
  children, 
  className = '', 
  noPadding = false 
}: CardProps) => {
  return (
    <div className={`
      bg-white 
      rounded-lg 
      shadow-md 
      flex 
      flex-col 
      ${noPadding ? '' : 'p-4'} 
      ${className}
    `}>
      {children}
    </div>
  );
};