import React from 'react';
import { Link } from 'wouter';
import { routesList } from './routesList';
import { Button } from '@/components/library/Button';

export const Menu: React.FC = () => {
  const links = routesList.map((data) => (
    <Link to={data.url} className="my-1 mx-2" key={data.url}>
      <Button variant="inline">{data.label}</Button>
    </Link>
  ));

  return (
    <div className="fixed flex justify-around m-0 p-1 bg-1-2 w-full">
      <h2 className="color-2-2 font-bold mx-2 center">
        <Link to="/">RecAll</Link>
      </h2>
      <nav className="flex justify-around">{links}</nav>
      <Button variant="bordered" className="my-1 mx-2">
        Sign in / Sign up
      </Button>
    </div>
  );
};
