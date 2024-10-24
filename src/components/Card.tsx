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
          'transition-all',
          'm-2 p-2 w-auto h-48',
          'hover:cursor-pointer rounded-lg',
          'bg-gradient-to-r from-1-3 to-1-1',
          'hover:bg-gradient-to-r from-1-3 hover:to-1-2',
          'border border-1 border-1-1',
          'center',
          'hover:scale-105',
          'text-1-12',
          className
        )}
        onClick={() => setZoomed(true)}
      >
        <h2 className="text-2xl font-bold">Card preview</h2>
      </div>
      <PopUp
        isShown={zoomed}
        close={() => setZoomed(false)}
        className="vstack center bg-1-7/25 backdrop-blur-sm"
      >
        <div
          className={clsx(
            'm-2 p-2 pl-4 md:p-4 lg:p-6 w-11/12 lg:w-3/4 h-2/3',
            'bg-gradient-to-r from-1-3 to-1-2 rounded-3xl',
            'border border-2 border-black',
            'flex items-center',
            'overflow-auto',
            'text-white',
            className
          )}
        >
          <div
            className={clsx(
              'w-full h-5/6',
              'vstack items-center',
              'overflow-auto'
            )}
          >
            <h2 className="m-2 text-2xl font-bold">Card header</h2>
            <p className="text-lg">
              Card content. Card content. Card content. Card content. Card
              content. Card content. Card content. Card content. Card content.
              Card content. Card content. Card content. Card content. Card
              content. Card content. Card content. Card content. Card content.
              Card content. Card content. Card content. Card content. Card
              content. Card content. Card content. Card content. Card content.
              Card content. Card content. Card content. Card content. Card
              content. Card content. Card content. Card content. Card content.
              Card content. Card content. Card content. Card content. Card
              content. Card content. Card content. Card content. Card content.
              Card content. Card content. Card content. Card content. Card
              content.
            </p>
          </div>
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
