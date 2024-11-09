import clsx from 'clsx';
import React, { HTMLAttributes } from 'react';

interface MiniCardProps extends HTMLAttributes<React.FC> {
  previewText: string;
  onClick?: () => void;
}

export const MiniCard: React.FC<MiniCardProps> = ({
  previewText,
  onClick,
  className,
}) => {
  return (
    <div
      className={clsx(
        'transition-all',
        'm-2 p-2 w-auto h-48',
        'hover:cursor-pointer rounded-lg',
        'bg-gradient-to-r from-1-3 to-1-1',
        'hover:bg-gradient-to-r hover:to-1-2',
        'border border-1 border-1-1',
        'center',
        'hover:scale-105',
        'text-1-12',
        className
      )}
      onClick={() => onClick?.()}
    >
      <h2 className="text-2xl font-bold">{previewText}</h2>
    </div>
  );
};
