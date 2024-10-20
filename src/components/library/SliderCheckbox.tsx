import clsx from 'clsx';
import React from 'react';

interface SliderCheckboxProps {
  checked: boolean;
  variant?: 'default' | 'inverted' | 'dark' | 'light';
  onClick: (checked?: boolean) => void;
}

export const SliderCheckbox: React.FC<SliderCheckboxProps> = ({
  checked,
  variant,
  onClick,
}) => {
  let checkedForStyle = checked;
  switch (variant) {
    case 'inverted':
      checkedForStyle = !checkedForStyle;
      break;
    case 'dark':
      checkedForStyle = false;
      break;
    case 'light':
      checkedForStyle = true;
      break;
    default:
  }
  return (
    <>
      <div
        className={clsx(
          'flex h-9 w-16 items-center rounded-full px-1',
          'shadow-inner transition-all hover:cursor-pointer',
          checkedForStyle ? 'bg-1-6 border-1-1' : 'bg-1-1 border-1-6'
        )}
        onClick={() => onClick()}
      >
        <div
          className={clsx(
            'h-7 w-7 rounded-full transition-all',
            checked && 'translate-x-7',
            checkedForStyle ? 'bg-1-1' : 'bg-1-6'
          )}
        />
      </div>
    </>
  );
};
