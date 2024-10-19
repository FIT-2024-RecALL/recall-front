import clsx from 'clsx';
import React, { useState } from 'react';

interface SliderCheckboxProps extends React.HTMLAttributes<React.FC> {
  onSlide: () => void;
}

export const SliderCheckbox: React.FC<SliderCheckboxProps> = (
  { onSlide, className },
  ...props
) => {
  const [checked, setChecked] = useState(false);

  return (
    <>
      <div className="relative">
        <svg
          className={clsx(
            'transition-all absolute rounded-2xl bg-black top-1/4',
            !checked ? 'translate-x-4' : 'translate-x-48'
          )}
          width="20"
          height="20"
        >
          <circle cx="10" cy="10" r="90" fill="black" />
        </svg>
        <input
          type="checkbox"
          className={clsx(
            'appearance-none transition-all rounded-2xl border-2',
            checked ? 'bg-1-6 border-1-1' : 'bg-1-1 border-1-6',
            className
          )}
          onClick={() => {
            setChecked(!checked);
            onSlide();
          }}
          {...props}
        />
        </div>
    </>
  );
};
