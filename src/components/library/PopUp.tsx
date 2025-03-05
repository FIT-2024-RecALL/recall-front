import clsx from 'clsx';
import React, { PropsWithChildren, useEffect } from 'react';

import { Button, Icon } from '@/components/library';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  useEffect(() => {
    if (isShown) {
      document.body.classList.add('overflow-y-hidden');
    } else {
      document.body.classList.remove('overflow-y-hidden');
    }
  }, [isShown]);

  return (
    <div
      className={clsx(
        'transition-all fixed z-50 inset-0 full overflow-auto',
        isShown ? 'opacity-100' : 'opacity-0 invisible',
        className
      )}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
      {...props}
    >
      {showCloseBtn && (
        <div
          className="absolute top-[1px] md:top-1 w-full center"
          onClick={close}
        >
          <Button className="p-0 m-0 font-medium" variant="inline">
            <Icon icon="close" /> <span>{t('common.close')}</span>
          </Button>
        </div>
      )}
      {isShown && children}
    </div>
  );
};
