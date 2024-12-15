import React, { useState } from 'react';
import { Link } from 'wouter';
import { menuRoutes } from '@/routes';
import { Button } from '@/components/library/Button';
import { SliderCheckbox } from '../library/SliderCheckbox';
import clsx from 'clsx';

export const Menu: React.FC = () => {
  const links = menuRoutes.map((data) => (
    <Link
      to={data.url}
      className="my-1 mx-2 p-0 center font-bold"
      key={data.url}
    >
      <Button variant="inline">{data.label}</Button>
    </Link>
  ));

  const [mobileMenuShown, setMobileMenuShown] = useState(false);

  return (
    <nav className="flex justify-around">
      <div className="hidden md:flex justify-around">{links}</div>
      <div className="md:hidden text-center">
        <Button
          variant="plate"
          className="my-1 rounded:md w-full transition-all duration-500"
          onClick={() => setMobileMenuShown(!mobileMenuShown)}
        >
          <span className="font-medium">Menu</span>
          <span
            className={clsx(
              'font-bold mx-2 trainsition-all duration-500',
              mobileMenuShown ? '-rotate-90' : 'rotate-90'
            )}
          >
            {'>'}
          </span>
        </Button>
        <div
          className={clsx(
            'grid grid-cols-1 transition-all',
            mobileMenuShown ? 'opacity-1' : 'opacity-0'
          )}
        >
          {mobileMenuShown && links}
        </div>
      </div>
    </nav>
  );
};
