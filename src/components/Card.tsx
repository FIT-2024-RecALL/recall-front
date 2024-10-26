import clsx from 'clsx';
import React, { useState } from 'react';
import { PopUp } from '@/components/library/PopUp';
import { Icon } from '@/components/library/Icon';

interface CardProps extends React.HTMLAttributes<React.FC> {
  mode: 'train' | 'edit';
  disabled?: boolean | false;
}

export const Card: React.FC<CardProps> = ({ mode, disabled, className }) => {
  const [zoomed, setZoomed] = useState(false);
  const [flipped, setFlipped] = useState(false);

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
            'm-2 w-11/12 lg:w-3/4 h-2/3',
            'bg-gradient-to-r from-1-3 to-1-2 rounded-3xl',
            'border border-2 border-black',
            'flex items-center',
            'text-white',
            'transition-all duration-500 flip-inner',
            flipped && 'animate-flip',
            className
          )}
        >
          <div
            className={clsx(
              'p-2 lg:p-4 w-full h-5/6',
              'vstack items-center',
              'overflow-auto',
              'flip-front'
            )}
          >
            <h2 className="m-2 text-2xl font-bold">Side 1</h2>
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
          <div
            className={clsx(
              'p-2 lg:p-4 w-full h-5/6',
              'vstack items-center',
              'overflow-auto',
              'flip-back'
            )}
          >
            <h2 className="m-2 text-2xl font-bold">Side 2</h2>
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
          <div
            className="absolute right-0 bottom-0 p-2 hover:cursor-pointer"
            onClick={() => setFlipped(!flipped)}
          >
            <Icon icon="arrowRight" className="w-10 h-10" />
          </div>
        </div>
      </PopUp>
    </>
  );
};
