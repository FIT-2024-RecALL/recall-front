import clsx from 'clsx';
import React, { HTMLAttributes } from 'react';

interface FormItemProps extends HTMLAttributes<React.FC> {
  labelComponent?: JSX.Element;
  errorMessage?: string;
}

export const FormItem: React.FC<FormItemProps> = ({
  labelComponent,
  errorMessage,
  className,
  children,
}) => {
  return (
    <div className={clsx(className)}>
      {labelComponent}
      {children}
      {errorMessage && (
        <span className="text-red-500 font-bold text-center m-1 p-2 rounded-md">
          {errorMessage}
        </span>
      )}
    </div>
  );
};
