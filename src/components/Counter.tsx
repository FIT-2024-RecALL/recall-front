import React from 'react';
import { useAppStore } from '@/state/state';
import { Button } from './library/Button';
import { clsx } from 'clsx';

export const Counter: React.FC = () => {
  const counter = useAppStore((s) => s.counter);
  const [inc, dec] = useAppStore((s) => [s.inc, s.dec]);

  return (
    <div className={clsx('flex w-full items-center justify-between')}>
      <Button onClick={dec} variant={`red`}>
        -
      </Button>
      <div className={'center px-2 min-w-[100px] max-w-[100px]'}>
        <div>{counter}</div>
      </div>
      <Button onClick={inc} variant={`green`}>
        +
      </Button>
    </div>
  );
};
