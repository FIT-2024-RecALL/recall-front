import clsx from 'clsx';
import React, { PropsWithChildren } from 'react';

interface PopUpProps extends PropsWithChildren<React.HTMLAttributes<React.FC>> {
  isShown: boolean;
  close: () => void;
}

export const PopUp: React.FC<PopUpProps> = (
  { isShown, close, className, children },
  ...props
) => {
  return (
    <div
      className={clsx("transition-all fixed", isShown ? 'full' : 'w-0 h-0', className)}
      onClick={(e) => {
        if (e.target == e.currentTarget) close();
      }}
      {...props}
    >
      {isShown && children}
    </div>
  );
};
