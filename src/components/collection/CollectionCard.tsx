import React from 'react';
import { Link } from 'wouter';

import { routes } from '@/routes';
import { LoadableComponent, Button } from '@/components/library';
import { useCollection, useProfile } from '@/query/queryHooks';

interface CollectionCardProps {
  collectionId: number;
}

export const CollectionCard: React.FC<CollectionCardProps> = ({
  collectionId,
}) => {
  const { collection, isPending, error } = useCollection(collectionId);
  const { profile } = useProfile();

  return (
    <LoadableComponent isPending={isPending} errorMessage={error?.message}>
      <div className="bg-1-3 text-o-black p-6 rounded-lg shadow-lg w-80 flex flex-col justify-between">
        {collection && (
          <>
            <div>
              <h2 className="text-lg font-bold text-1-12 mb-2">
                {collection.title}
              </h2>
              <p className="text-md text-1-11 mb-2">{collection.description}</p>
            </div>

            <div className="flex space-x-2 mt-4">
              {collection.ownerId === profile?.id && (
                <Link to={routes.collectionEdit.getUrl(collectionId)}>
                  <Button
                    variant="plate"
                    className="bg-1-8 text-1-2 py-1 px-4 rounded-full hover:bg-1-6 transition duration-200"
                  >
                    Edit
                  </Button>
                </Link>
              )}

              <Link to={routes.train.getUrl(collectionId)}>
                <Button
                  variant="bordered-trans"
                  className="border-1-8 py-1 px-4 rounded-full hover:bg-1-6 transition duration-200"
                >
                  <p className="text-1-8">Train</p>
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </LoadableComponent>
  );
};
