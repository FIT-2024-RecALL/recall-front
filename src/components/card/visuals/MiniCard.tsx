import clsx from 'clsx';
import React, { HTMLAttributes } from 'react';

interface MiniCardProps extends HTMLAttributes<React.FC> {
  onClick?: () => void;
  shadowOff?: boolean;
}

export const MiniCard: React.FC<MiniCardProps> = ({
  onClick,
  className,
  children,
  shadowOff,
}) => {
  const card = (
    <div
      className={clsx(
        'transition-all duration-200',
        'overflow-hidden relative',
        'px-4 py-2 w-full h-48 center rounded-lg',
        'ring-1 ring-o-black',
        'hover:cursor-pointer',
        className
      )}
      onClick={() => onClick?.()}
    >
      {children}
    </div>
  );

  if (shadowOff) return card;

  return (
    <div
      className={clsx(
        'relative transition-all duration-200',
        'before:absolute before:full before:bg-black/50 before:rounded-lg',
        'before:transition-all before:duration-200',
        'hover:-translate-x-2 hover:-translate-y-2',
        'hover:before:translate-x-2 hover:before:translate-y-2'
      )}
    >
      {card}
    </div>
  );
};
