import React, { useState, useEffect } from 'react';
import clsx from 'clsx';

import { CollectionCard } from '../components/collection/CollectionCard';
import { SearchBar, Button, LoadableComponent } from '@/components/library';
import {
  useProfile,
  useProfileCollections,
  useFilesList,
  getFileFullPath,
  getFilesListQueryOptions,
} from '@/query/queryHooks';
import { CollectionShort, deleteFileStorageFilenameDelete } from '@/api';
import { useAppStore } from '@/state';
import { ErrorPage } from './ErrorPage';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { dataExtractionWrapper } from '@/query';
import { FilesList } from '../components/profile/FilesList';
import { CollectionsSearchableList } from '@/components/collection/CollectionsSearchableList';

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
    </LoadableComponent>
  );
};
