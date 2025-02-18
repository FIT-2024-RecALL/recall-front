import clsx from 'clsx';
import React, { PropsWithChildren } from 'react';

import { Button, Icon } from '@/components/library';
import { useAppStore } from '@/state';

interface PopUpProps extends PropsWithChildren<React.HTMLAttributes<React.FC>> {
  isShown: boolean;
  close: () => void;
  showCloseBtn?: boolean;
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
  { isShown, close, showCloseBtn, className, children },
  ...props
) => {
  const enableScroll = useAppStore((state) => state.enableGlobalScroll);
  const scrollOnClose = () => {
    enableScroll();
    close();
  };

  return (
    <div
      className={clsx(
        'transition-all fixed z-50 inset-0 full',
        isShown ? 'opacity-1' : 'opacity-0 invisible',
        className
      )}
      onClick={(e) => {
        if (e.target === e.currentTarget) scrollOnClose();
      }}
      {...props}
    >
      {showCloseBtn && (
        <div className="absolute top-0 w-full center" onClick={scrollOnClose}>
          <Button className="p-0 m-0" variant="inline">
            <Icon icon="close" /> <span>Close</span>
          </Button>
        </div>
      )}
      {isShown && children}
    </div>
  );
};
