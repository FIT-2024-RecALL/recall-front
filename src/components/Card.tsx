import clsx from 'clsx';
import React, { useState } from 'react';
import { PopUp } from '@/components/library/PopUp';

interface CardProps extends React.HTMLAttributes<React.FC> {
  mode: 'train' | 'edit';
  disabled?: boolean | false;
}

export const Card: React.FC<CardProps> = ({ mode, disabled, className }) => {
  const [zoomed, setZoomed] = useState(false);

  return (
    <>
      <div
        className={clsx(
          'm-2 p-2 w-7/8 h-48',
          'hover:cursor-pointer bg-gradient-to-r from-2-4 to-2-3 rounded-lg',
          'border border-2 border-2-1',
          'center',
          'transition-all hover:scale-105',
          className
        )}
        onClick={() => setZoomed(true)}
      >
        <h2 className="text-2xl text-2-1 font-bold">Card preview</h2>
      </div>
      <PopUp
        isShown={zoomed}
        close={() => setZoomed(false)}
        className="vstack center backdrop-blur-md"
      >
        <div
          className={clsx(
            'm-2 p-6 w-3/4 h-2/3',
            'bg-gradient-to-r from-2-4 to-2-3 rounded-3xl',
            'border border-4 border-2-1',
            'center vstack',
            'transition-all',
            className
          )}
          onClick={() => setZoomed(true)}
        >
          <h2 className="m-2 text-2xl text-2-1 font-bold">Card header</h2>
          <p className="text-lg text-2-1">Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. Card content. </p>
        </div>
      </PopUp>
      {/* {!zoomed ? (
        <div
          className={clsx(
            'm-2 p-2 w-7/8 h-48',
            'hover:cursor-pointer bg-gradient-to-r from-2-4 to-2-3 rounded-lg',
            'center',
            'transition-all hover:scale-105',
            className
          )}
          onClick={() => setZoomed(true)}
        >
          <h2 className="text-2xl text-2-1 font-bold">Card preview</h2>
        </div>
      ) : (
        <div
          className={clsx(
            'm-2 p-2 w-7/8 h-48',
            'hover:cursor-pointer bg-gradient-to-r from-2-4 to-2-3 rounded-lg',
            'center',
            'transition-all hover:scale-105',
            className
          )}
          onClick={() => setZoomed(false)}
        >
          <h2 className="text-2xl text-2-1 font-bold">Full card</h2>
        </div>
      )} */}
    </>
  );
};
