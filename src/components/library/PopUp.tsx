import clsx from 'clsx';
import React, { PropsWithChildren, useEffect } from 'react';

interface PopUpProps extends PropsWithChildren<React.HTMLAttributes<React.FC>> {
  isShown: boolean;
  close: () => void;
}

/**
 * Pop-up window wrapper FC.
 * 
 * - `isShown` - should content be rendered
 * - `close` - callback for closing
 * - `className` - extenstion for pop-up css-classes
 *   - Pop-up wrapper doesn't have any visible styles for itself by default so you can add them manually
 *   - Css-parameters like "display: hidden" may cause animtation to be broken
 * - `children` - pop-up window's content
 * - other parameters will be forwarded to the wrapper div tag 
 */
export const PopUp: React.FC<PopUpProps> = (
  { isShown, close, className, children },
  ...props
) => {
  let render = isShown;

  return (
    <div
      className={clsx("fixed", isShown ? 'full animate-appear' : 'animate-disappear', className)}
      onClick={(e) => {
        if (e.target !== e.currentTarget) return;
        close();
        setTimeout(() => {
          render = isShown;
        }, 100);
      }}
      {...props}
    >
      {render && children}
    </div>
  );
};
