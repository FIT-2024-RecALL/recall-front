import React, { PropsWithChildren, useEffect } from 'react';

import { Dialog, DialogContent } from '@/components/ui';

interface ControlledModalProps
  extends PropsWithChildren<React.HTMLAttributes<React.FC>> {
  isShown: boolean;
  close: () => void;
}

export const ControlledModal: React.FC<ControlledModalProps> = (
  { isShown, close, className, children },
  ...props
) => {
  useEffect(() => {
    if (isShown) {
      document.body.classList.add('overflow-y-hidden');
    } else {
      document.body.classList.remove('overflow-y-hidden');
    }
  }, [isShown]);

  return (
    <Dialog
      open={isShown}
      onOpenChange={() => {
        close();
      }}
      {...props}
    >
      <DialogContent className={className}>{children}</DialogContent>
    </Dialog>
  );
};
