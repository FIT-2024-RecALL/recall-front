import React from 'react';

import {
  Button,
  DropDown,
  Icon,
  LoadableComponent,
} from '@/components/library';
import { useProfile, useProfileCollections } from '@/query/queryHooks';
import { ErrorPage } from './ErrorPage';
import { FilesList } from '@/components/profile';
import { CollectionsSearchableList } from '@/components/collection';
import { useProfileDelete } from '@/query/mutationHooks';

export const ProfilePage: React.FC = () => {
  const { profile, isPending: isProfilePending } = useProfile();
  const { collections, isPending: isCollectionsPending } =
    useProfileCollections();

  const { deleteProfile, isPending: isDeletePending } = useProfileDelete();

  if (!profile)
    return (
      <ErrorPage
        isPending={isProfilePending}
        message="Only authorized users can view their profiles"
      />
    );

  return (
    <LoadableComponent
      className="flex flex-col items-center p-4 md:p-8"
      isPending={isProfilePending || isCollectionsPending}
      animated
    >
      <h1 className="text-center text-2xl font-bold mb-6">
        {profile?.nickname}
        {"'"}s profile
      </h1>

      <hr className="border-2 border-o-black rounded my-2 md:my-6 w-full" />

      <h2 className="text-center text-2xl font-bold mb-6">Your collections</h2>

      {collections && <CollectionsSearchableList collections={collections} />}

      <hr className="border-2 border-o-black rounded my-2 md:my-6 w-full" />

      <h2 className="text-center text-2xl font-bold mb-6">Your files</h2>

      <FilesList />

      <hr className="border-2 border-o-black rounded my-2 md:my-6 w-full" />

      <h2 className="text-center text-2xl font-bold mb-6">Delete account</h2>

      <DropDown
        buttonComponent={
          <Button className="mx-3" variant="bordered">
            Delete account
          </Button>
        }
      >
        <Button
          className="m-3"
          variant="plate-red"
          onClick={() => deleteProfile()}
        >
          Confirm deletion
        </Button>
        {isDeletePending && (
          <div className="mx-2">
            <Icon className="animate-spin" icon="loading-3/4" />
          </div>
        )}
      </DropDown>
    </LoadableComponent>
  );
};
