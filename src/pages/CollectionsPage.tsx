import React from 'react';
import { Link } from 'wouter';
import { routesList } from '@/routes';
import { Button } from '@/components/library/Button';

const collections = [
  { id: 1, label: 'Коллекция 1', url: '/collections/1' },
  { id: 2, label: 'Коллекция 2', url: '/collections/2' },
  { id: 3, label: 'Коллекция 3', url: '/collections/3' },
];

export const CollectionsPage: React.FC = () => {
  const collectionLinks = collections.map((collection) => (
    <Link to={collection.url} className="my-1 mx-2" key={collection.id}>
      <Button variant="inline">{collection.label}</Button>
    </Link>
  ));

  return (
    <div>
      <h1>Коллекции</h1>
      <nav className="flex justify-around">
        {collectionLinks}
      </nav>
    </div>
  );
};
