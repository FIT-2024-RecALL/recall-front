import React, { HTMLAttributes, HTMLInputTypeAttribute } from 'react';
import clsx from 'clsx';

export const Input: React.FC<
  HTMLAttributes<HTMLInputElement> & { type?: HTMLInputTypeAttribute }
> = ({ className, ...props }) => {
  return (
    <input
      className={clsx(
        'p-1 md:p-2 w-full',
        'text-o-black font-medium rounded',
        'bg-transparent border-b border-o-black',
        'transition-all duration-200',
        'focus:outline-none focus:border-b-2',
        className
      )}
      {...props}
    />
  );
};
