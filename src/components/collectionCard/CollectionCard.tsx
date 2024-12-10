import React from 'react';
import { Link } from 'wouter';

import { routes } from '@/routes';
import { Button } from '@/components/library/Button';

interface CollectionCardProps {
  collectionId: number;
  timeAgo: string;
  title: string;
  description: string;
}

export const CollectionCard: React.FC<CollectionCardProps> = ({
  collectionId,
  timeAgo,
  title,
  description,
}) => {
  return (
    <div className="bg-1-4 text-o-black p-6 rounded-lg shadow-lg w-80 flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-1-12">{timeAgo}</span>
          <div className="w-4 h-4 bg-1-9 rounded-full"></div>
        </div>
        <h2 className="text-lg font-bold text-1-11 mb-2">{title}</h2>
        <p className="text-sm text-1-7 mb-2">{description}</p>
      </div>

      <div className="flex space-x-2 mt-4">
        <Link to={routes.collectionEdit.getUrl(collectionId)}>
          <Button
            variant="plate"
            type="submit"
            className="bg-1-8 text-1-2 py-1 px-4 rounded-full hover:bg-1-6 transition duration-200"
          >
            Edit
          </Button>
        </Link>

        <Link to={routes.train.getUrl(collectionId)}>
          <Button
            variant="bordered-trans"
            className="border-1-8 py-1 px-4 rounded-full hover:bg-1-6 transition duration-200"
          >
            <p className="text-1-8">Train</p>
          </Button>
        </Link>
      </div>
    </div>
  );
};
