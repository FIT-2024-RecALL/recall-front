import React, { HTMLAttributes } from 'react';

import { UploadDropdown } from './UploadDropdown';
import { Icon } from '@/components/library/Icon';
import { Button } from '@/components/library/Button';
import clsx from 'clsx';

interface EditorControlsProps extends HTMLAttributes<React.FC> {
  isActive?: boolean;
  switchActive: () => void;
  isExtended?: boolean;
}

export const EditorControls: React.FC<EditorControlsProps> = ({
  isActive,
  switchActive,
  isExtended,
  className,
}) => {
  return (
    <div className={clsx('around w-full my-1', className)}>
      {isExtended && isActive && <UploadDropdown />}

      <Button className="" variant="bordered" onClick={switchActive}>
        {isActive ? <Icon icon="eye" /> : <Icon icon="editor" />}
      </Button>
    </div>
  );
};
