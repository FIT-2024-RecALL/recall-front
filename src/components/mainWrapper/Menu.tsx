import React from 'react';
import { Link } from 'wouter';
import { routesList } from '@/routes';
import { Button } from '@/components/library/Button';

export const Menu: React.FC = () => {
  const links = routesList.map((data) => (
    <Link to={data.url} className="my-1 mx-2" key={data.url}>
      <Button variant="inline">{data.label}</Button>
    </Link>
  ));

  return <nav className="flex justify-around">{links}</nav>;
};
