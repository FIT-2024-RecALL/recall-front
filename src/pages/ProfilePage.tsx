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

export const ProfilePage: React.FC = () => {
  const { profile, isPending: isProfilePending } = useProfile();
  const { collections, isPending: isCollectionsPending } =
    useProfileCollections();
  const { files, isPending: isFilesPending } = useFilesList();

  const client = useQueryClient();
  const { mutate: deleteFile } = useMutation({
    mutationFn: (filename: string) =>
      dataExtractionWrapper(
        deleteFileStorageFilenameDelete({ path: { filename } })
      ),
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: getFilesListQueryOptions().queryKey,
      });
    },
  });

  const setIsCreateCollectionOpened = useAppStore(
    (state) => state.setIsCreateCollectionWindowOpened
  );

  const [searchTerm, setSearchTerm] = useState('');
  const [activeCollections, setAcitveCollections] = useState<CollectionShort[]>(
    []
  );

  useEffect(() => {
    if (!collections) return;
    const filteredCollections =
      searchTerm.trim() === ''
        ? collections
        : collections.filter((item) =>
            item.title.toLowerCase().includes(searchTerm.toLowerCase())
          );
    setAcitveCollections(filteredCollections);
  }, [searchTerm, collections]);

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
      isPending={isProfilePending || isCollectionsPending || isFilesPending}
      animated
    >
      <h1 className="text-center text-2xl font-bold mb-6">
        {profile?.nickname}
        {"'"}s profile
      </h1>

      <hr className="border-2 border-1-1 rounded my-2 md:my-6 w-full" />

      <h2 className="text-center text-2xl font-bold mb-6">Your collections</h2>

      <div className="flex justify-center mb-4">
        <Button
          variant="plate"
          className={clsx(
            'py-3 px-6 rounded-full',
            'text-lg font-medium',
            'shadow-md hover:shadow-lg',
            'transition duration-200'
          )}
          onClick={() => setIsCreateCollectionOpened(true)}
        >
          Create collection
        </Button>
      </div>

      {collections && collections.length == 0 && (
        <h3 className="text-center text-xl font-medium col-span-full">
          There{"'"}re no collections yet. Create the first!
        </h3>
      )}
      {collections && collections.length > 0 && (
        <>
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            activeSearch={activeCollections.map((item) => item.title)}
          />

          <div
            className="grid align-center justify-center w-full gap-4 pt-4"
            style={{
              gridTemplateColumns: 'repeat( auto-fit, 320px )',
            }}
          >
            {activeCollections.length > 0 ? (
              activeCollections.map((item) => (
                <CollectionCard key={item.id} collectionId={item.id} />
              ))
            ) : (
              <h3 className="text-center text-xl font-medium col-span-full">
                No collections found. Maybe create new one?
              </h3>
            )}
          </div>
        </>
      )}

      <hr className="border-2 border-1-1 rounded my-2 md:my-6 w-full" />

      <h2 className="text-center text-2xl font-bold mb-6">Your files</h2>

      <div className="grid grid-cols-1 align-center justify-center w-full gap-4">
        {files && files.length === 0 && (
          <h3 className="text-center text-xl font-medium col-span-full">
            You haven{"'"}t upload any file yes. Feel free to add them using
            card{"'"}s edit form
          </h3>
        )}
        {files &&
          files.length > 0 &&
          files?.map((file) => (
            <div
              className={clsx(
                'bg-1-8 px-2 py-4',
                'grid grid-cols-4',
                'gap-x-4 rounded-lg'
              )}
              key={file.url}
            >
              <div className="col-span-4 md:col-span-3 truncate">
                <a className="w-fit" href={getFileFullPath(file.url)}>
                  <Button className="w-full" variant="inline">
                    {getFileFullPath(file.url)}
                  </Button>
                </a>
              </div>
              <div className="col-span-4 md:col-span-1">
                <Button
                  className="w-full"
                  variant="bordered-trans"
                  onClick={() => deleteFile(file.filename)}
                >
                  Delete file
                </Button>
              </div>
            </div>
          ))}
      </div>
    </LoadableComponent>
  );
};
