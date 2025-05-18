import React, { HTMLAttributes, useMemo } from 'react';
import clsx from 'clsx';

export interface ShadowWrapperProps extends HTMLAttributes<React.FC> {
  shadowOffset?: number;
  bgClass?: string;
}

export const ShadowWrapper: React.FC<ShadowWrapperProps> = ({
  shadowOffset,
  className,
  bgClass,
  children,
}) => {
  const offset = useMemo(() => shadowOffset ?? 1, [shadowOffset]);
  const bgColorClass = useMemo(
    () => (bgClass ? `before:${bgClass}` : 'before:bg-black/50'),
    [bgClass]
  );

  return (
    <div
      className={clsx(
        'relative transition-all duration-200',
        'before:absolute before:full before:rounded-md',
        bgColorClass,
        'before:transition-all before:duration-200',
        `md:hover:-translate-x-${offset} md:hover:-translate-y-${offset}`,
        `md:hover:before:translate-x-${offset} md:hover:before:translate-y-${offset}`,
        className
      )}
    >
      {children}
    </div>
  );
};
