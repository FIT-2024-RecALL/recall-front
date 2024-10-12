import React from 'react';
import { Link } from 'wouter';
import { routesList } from './routesList';
import { Button } from '@/components/library/Button';

export const Menu: React.FC = () => {
  const links = routesList.map((data) => (
    <Button variant="green" className="p-2 m-2" key={data.url}>
      <Link to={data.url}>{data.label}</Link>
    </Button>
  ));

  return <header className="fixed flex">{links}</header>;
};
