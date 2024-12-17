import React from 'react';

import { LoadableComponent } from '@/components/library';
import { useProfile, useProfileCollections } from '@/query/queryHooks';
import { ErrorPage } from './ErrorPage';
import { FilesList } from '@/components/profile';
import { CollectionsSearchableList } from '@/components/collection';

export const ProfilePage: React.FC = () => {
  const { profile, isPending: isProfilePending } = useProfile();
  const { collections, isPending: isCollectionsPending } =
    useProfileCollections();

  if (!profile)
    return (
      <ErrorPage
        isPending={isProfilePending}
        message="Only authorized users can view their profiles"
      />
    );

  return (
    <LoadableComponent
      className="flex flex-col items-center m-4 md:m-10 p-5"
      isPending={isProfilePending || isCollectionsPending}
      animated
    >
      <h1 className="text-center text-2xl font-bold mb-6">
        {profile?.nickname}
        {"'"}s profile
      </h1>

      <hr className="border-2 border-1-1 rounded my-2 md:my-6 w-full" />

      <h2 className="text-center text-2xl font-bold mb-6">Your collections</h2>

      {collections && <CollectionsSearchableList collections={collections} />}

      <hr className="border-2 border-1-1 rounded my-2 md:my-6 w-full" />

      <h2 className="text-center text-2xl font-bold mb-6">Your files</h2>

      <FilesList />

      <hr className="border-2 border-1-1 rounded my-2 md:my-6 w-full" />

      <h2 className="text-center text-2xl font-bold mb-6">Delete account</h2>
    </LoadableComponent>
  );
};
