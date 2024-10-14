import React from 'react';
import { Link } from 'wouter';

import { Button } from '@/components/library/Button';
import { useAppStore } from '@/state/state';
import { Menu } from './Menu';

export const Header: React.FC = () => {
  const toggleLoginWindow = useAppStore((state) => state.toggleLoginWindow);

  return (
    <header>
      <div className="flex justify-around m-0 p-1 bg-1-2 w-full">
        <h2 className="text-2-2 font-bold mx-2 center">
          <Link to="/">RecAll</Link>
        </h2>
        <Menu />
        <Button
          variant="bordered"
          className="my-1 mx-2"
          onClick={toggleLoginWindow}
        >
          Sign in / Sign up
        </Button>
      </div>
    </header>
  );
};
