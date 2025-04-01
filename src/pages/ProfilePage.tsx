import React from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Icon, LoadableComponent } from '@/components/library';
import { useProfile, useProfileCollections } from '@/query/queryHooks';
import { ErrorPage } from './ErrorPage';
import { FilesList } from '@/components/files';
import { CollectionsSearchableList } from '@/components/collection';
import { useProfileDelete } from '@/query/mutationHooks';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@/components/ui';

export const ProfilePage: React.FC = () => {
  const { t } = useTranslation();
  const { profile, isPending: isProfilePending } = useProfile();
  const { collections, isPending: isCollectionsPending } =
    useProfileCollections();

  const { deleteProfile, isPending: isDeletePending } = useProfileDelete();

  if (!profile)
    return (
      <ErrorPage
        isPending={isProfilePending}
        message={t('profile.onlyAuthorized')}
      />
    );

  return (
    <LoadableComponent
      className="flex flex-col items-center"
      isPending={isProfilePending || isCollectionsPending}
      animated
    >
      <h1 className="text-center text-2xl font-bold mb-4">
        {t('startPage.hello')}, {profile?.nickname}!
      </h1>

      <h2 className="text-center text-2xl font-bold mt-8 mb-4">
        {t('profile.myCollections')}
      </h2>

      {collections && <CollectionsSearchableList collections={collections} />}

      <h2 className="text-center text-2xl font-bold mt-8 mb-4">
        {t('profile.myFiles')}
      </h2>

      <FilesList />

      <hr className="border-2 border-o-black 'my-2 md:my-6 w-full" />

      <h2 className="text-center text-2xl font-bold mb-6">
        {t('profile.deleteAccount')}
      </h2>

      <DropdownMenu>
        <DropdownMenuTrigger className="mx-3" disabled={isDeletePending}>
          <Button variant="bordered" title={t('profile.deleteAccount')}>
            {!isDeletePending ? (
              t('profile.deleteAccount')
            ) : (
              <Icon className="animate-spin" icon="loading-3/4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <Button
              variant="plate-red"
              onClick={() => deleteProfile()}
              title={t('common.confirmDeletion')}
            >
              {t('common.confirmDeletion')}
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </LoadableComponent>
  );
};
