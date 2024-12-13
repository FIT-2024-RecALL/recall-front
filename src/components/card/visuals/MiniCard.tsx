import clsx from 'clsx';
import React, { HTMLAttributes } from 'react';

interface MiniCardProps extends HTMLAttributes<React.FC> {
  onClick?: () => void;
}

export const MiniCard: React.FC<MiniCardProps> = ({
  onClick,
  className,
  children,
}) => {
  return (
    <div
      className={clsx(
        'transition-all',
        'm-2 p-2 w-full h-48',
        'hover:cursor-pointer rounded-lg',
        'bg-1-3',
        'hover:bg-1-3/80',
        'border border-1 border-1-1',
        'center',
        'hover:scale-105',
        'text-1-12 text-2xl font-bold',
        className
      )}
      onClick={() => onClick?.()}
    >
      {children}
    </div>
  );
};
