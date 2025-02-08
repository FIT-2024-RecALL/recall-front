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
        'px-4 py-2 w-full h-48 center',
        'hover:cursor-pointer rounded-lg',
        'bg-1-3 hover:bg-1-3/80',
        'hover:scale-105 hover:shadow',
        'text-1-12',
        className
      )}
      onClick={() => onClick?.()}
    >
      {children}
    </div>
  );
};
