import React from 'react';
import { Link } from 'wouter';

import { routes } from '@/routes';
import { LoadableComponent, Button } from '@/components/library';
import { useCollection, useProfile } from '@/query/queryHooks';
import { useAppStore } from '@/state';
import clsx from 'clsx';

interface CollectionCardProps {
  collectionId: number;
}

export const CollectionCard: React.FC<CollectionCardProps> = ({
  collectionId,
}) => {
  const { collection, isPending, error } = useCollection(collectionId);
  const { profile } = useProfile();
  const showAuthWindow = useAppStore((state) => state.showLoginWindow);

  return (
    <LoadableComponent isPending={isPending} errorMessage={error?.message}>
      <div
        className={clsx(
          'bg-o-white text-o-black',
          'hover:bg-o-gray/20',
          'p-6 m-2 rounded-lg',
          'ring-2 ring-o-black hover:ring-o-green-lg',
          'hover:shadow-lg hover:shadow-o-green-sm',
          'transition-all duration-200'
        )}
      >
        {collection && (
          <>
            <div>
              <h2 className="text-lg font-bold mb-2">{collection.title}</h2>
              <p className="text-md mb-2">{collection.description}</p>
            </div>

            <div className="flex space-x-2 mt-4">
              {collection.ownerId === profile?.id && (
                <Link to={routes.collectionEdit.getUrl(collectionId)}>
                  <Button
                    variant="plate-yellow"
                    className="py-1 px-4"
                    withShadow
                  >
                    Edit
                  </Button>
                </Link>
              )}
              {profile ? (
                <Link to={routes.train.getUrl(collectionId)}>
                  <Button
                    variant="plate-green"
                    className="py-1 px-4"
                    withShadow
                  >
                    Train
                  </Button>
                </Link>
              ) : (
                <Button
                  variant="plate-green"
                  className="py-1 px-4"
                  onClick={showAuthWindow}
                  withShadow
                >
                  Train
                </Button>
              )}
            </div>
          </>
        )}
      </div>
    </LoadableComponent>
  );
};
