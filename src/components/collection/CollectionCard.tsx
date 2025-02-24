import React from 'react';
import { Link } from 'wouter';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  const { collection, isPending, error } = useCollection(collectionId);
  const { profile } = useProfile();
  const showAuthWindow = useAppStore((state) => state.showLoginWindow);

  return (
    <LoadableComponent isPending={isPending} errorMessage={error?.message}>
      <div
        className={clsx(
          'bg-o-white text-o-black',
          'hover:bg-neutral-300/20',
          'p-6 m-2 rounded-lg',
          'ring-2 ring-o-black hover:ring-green-600',
          'hover:shadow-lg hover:shadow-green-300',
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
                    title={t('common.edit')}
                  >
                    {t('common.edit')}
                  </Button>
                </Link>
              )}
              {profile ? (
                <Link to={routes.train.getUrl(collectionId)}>
                  <Button
                    variant="plate-green"
                    className="py-1 px-4"
                    withShadow
                    title={t('collection.trainButton')}
                  >
                    {t('collection.trainButton')}
                  </Button>
                </Link>
              ) : (
                <Button
                  variant="plate-green"
                  className="py-1 px-4"
                  onClick={showAuthWindow}
                  withShadow
                  title={t('collection.trainButton')}
                >
                  {t('collection.trainButton')}
                </Button>
              )}
            </div>
          </>
        )}
      </div>
    </LoadableComponent>
  );
};
