import React from 'react';
import { Link, useLocation } from 'wouter';
import { useTranslation } from 'react-i18next';

import { routes } from '@/routes';
import { LoadableComponent, Button, Icon } from '@/components/library';
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
  const [, setLocation] = useLocation();

  const { collection, isPending, error } = useCollection(collectionId);
  const { profile } = useProfile();
  const showAuthWindow = useAppStore((state) => state.showLoginWindow);

  return (
    <LoadableComponent isPending={isPending} errorMessage={error?.message}>
      <div
        className={clsx(
          'bg-o-white text-o-black',
          'hover:bg-o-white-max',
          'p-6 m-2 rounded-lg',
          'ring-1 ring-o-black hover:ring-green-600',
          'hover:shadow-lg hover:shadow-green-300',
          'transition-all duration-200'
        )}
        onClick={(e) => {
          if (e.target == e.currentTarget)
            setLocation(routes.collectionView.getUrl(collectionId));
        }}
      >
        {collection && (
          <>
            <div>
              <h2 className="text-lg font-bold mb-2">{collection.title}</h2>
              <p className="text-md mb-2">{collection.description}</p>
            </div>

            <div className="flex gap-x-2 mt-4">
              <Link to={routes.collectionView.getUrl(collectionId)}>
                <Button
                  variant="plate-blue"
                  className="p-2 md:p-3"
                  withShadow
                  title={t('common.view')}
                >
                  <Icon icon="eye" />
                </Button>
              </Link>
              {collection.ownerId === profile?.id && (
                <Link to={routes.collectionEdit.getUrl(collectionId)}>
                  <Button
                    variant="plate-yellow"
                    className="p-2 md:p-3"
                    withShadow
                    title={t('common.edit')}
                  >
                    <Icon icon="editor" />
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
