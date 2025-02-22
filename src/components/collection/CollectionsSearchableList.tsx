import React, { useEffect, useState } from 'react';
import { Button, SearchBar } from '../library';
import { useProfile } from '@/query/queryHooks';
import { useAppStore } from '@/state';
import { CollectionShort } from '@/api';
import clsx from 'clsx';
import { CollectionCard } from './CollectionCard';

export interface CollectionsSearchableListProps {
  collections: CollectionShort[];
}

export const CollectionsSearchableList: React.FC<
  CollectionsSearchableListProps
> = ({ collections }) => {
  const { profile } = useProfile();

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

  return (
    <div className="center flex-col w-full">
      {profile ? (
        <div className="flex justify-center mb-4">
          <Button
            variant="plate"
            className={clsx(
              'py-2 px-4 rounded-full',
              'text-lg font-medium',
              'shadow-md hover:shadow-lg',
              'transition duration-200'
            )}
            onClick={() => setIsCreateCollectionOpened(true)}
          >
            Create collection
          </Button>
        </div>
      ) : (
        <h3 className="text-center text-xl mb-4 font-medium col-span-full">
          Authorize to create new collection
        </h3>
      )}

      {collections.length == 0 && (
        <h3 className="text-center text-xl font-medium col-span-full">
          There{"'"}re no collections yet. Create the first!
        </h3>
      )}
      {collections.length > 0 && (
        <>
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            activeSearch={activeCollections.map((item) => item.title)}
          />

          <div
            className="grid align-center justify-center gap-4 pt-4"
            style={{
              gridTemplateColumns: 'repeat( auto-fit, minmax(300px, 1fr) )',
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
    </div>
  );
};
