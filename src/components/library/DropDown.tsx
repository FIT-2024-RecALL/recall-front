import clsx from 'clsx';
import React, { PropsWithChildren, HTMLAttributes, useState, useRef } from 'react';

interface DropDownProps extends PropsWithChildren<HTMLAttributes<React.FC>> {
  buttonComponent: JSX.Element;
  isShownDefault?: boolean;
}

export const DropDown: React.FC<DropDownProps> = ({
  isShownDefault,
  className,
  buttonComponent,
  children,
}) => {
  const [isShown, setIsShown] = useState(isShownDefault ?? false);

  return (
    <div className={clsx(className)}>
      <div className="w-fit" onClick={() => setIsShown((s) => !s)}>{buttonComponent}</div>
      <div
        className={clsx(
          'absolute transition-all',
          isShown ? 'opacity-1 visible' : 'opacity-0 invisible'
        )}
      >
        {children}
      </div>
    </div>
  );
};
