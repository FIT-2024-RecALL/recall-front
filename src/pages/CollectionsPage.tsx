import React, { useState, useEffect } from 'react';
import { CollectionCard } from '../components/collection/CollectionCard';
import { SearchBar } from '@/components/library/SearchBar';
import { Button } from '@/components/library/Button';
import { useCollections, useProfile } from '@/query/queryHooks';
import { CollectionShort } from '@/api';
import { useAppStore } from '@/state';
import clsx from 'clsx';

export const CollectionsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const setIsCreateCollectionOpened = useAppStore(
    (state) => state.setIsCreateCollectionWindowOpened
  );

  const { profile } = useProfile();
  const { collections } = useCollections();
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
    <div className="flex flex-col items-center m-4 md:m-10 p-5 text-o-black">
      <h1 className="text-center text-2-1 text-2xl font-bold mb-6">
        Collections
      </h1>

      {profile && (
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
      )}

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
          <p className="text-center text-o-white col-span-full">
            No collections found
          </p>
        )}
      </div>
    </div>
  );
};
