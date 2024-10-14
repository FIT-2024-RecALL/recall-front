import clsx from 'clsx';
import React, { PropsWithChildren } from 'react';

interface PopUpProps extends PropsWithChildren<React.HTMLAttributes<React.FC>> {
  isShown: boolean;
  toggle: () => void;
}

export const PopUp: React.FC<PopUpProps> = (
  { isShown, toggle, className, children },
  ...props
) => {
  return (
    <div
      className={clsx(isShown ? 'block fixed full' : 'hidden', className)}
      onClick={(e) => {
        if (e.target == e.currentTarget) toggle();
      }}
      {...props}
    >
      {children}
    </div>
  );
};
