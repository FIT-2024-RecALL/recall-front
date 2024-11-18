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
      <h2 className="">{previewText}</h2>
    </div>
  );
};
