import React, { HTMLAttributes } from 'react';
import clsx from 'clsx';

// export interface ShadowWrapperProps extends HTMLAttributes<React.FC> {}

export const ShadowWrapper: React.FC<HTMLAttributes<React.FC>> = ({
  className,
  children,
}) => {
  return (
    <div
      className={clsx(
        'relative transition-all duration-200',
        'before:absolute before:full before:bg-black/50 before:rounded-md',
        'before:transition-all before:duration-200',
        'md:hover:-translate-x-1 md:hover:-translate-y-1',
        'md:hover:before:translate-x-1 md:hover:before:translate-y-1',
        className
      )}
    >
      {children}
    </div>
  );
};
