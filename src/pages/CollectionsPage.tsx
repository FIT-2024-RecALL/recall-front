import React, { useState } from 'react';
import { CollectionCard } from '../components/collectionCard/CollectionCard';
import { SearchBar } from '@/components/SearchBar';
import { collections } from '../components/mockCollectionsData.js';
import clsx from 'clsx';

export const CollectionsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [, setConfirmedSearchTerm] = useState('');
  const [activeCollections, setActiveCollections] = useState(collections);

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  const handleSearchConfirm = () => {
    setConfirmedSearchTerm(searchTerm);
    const filteredCollections =
      searchTerm.trim() === ''
        ? collections
        : collections.filter((item) =>
            item.title.toLowerCase().includes(searchTerm.toLowerCase())
          );
    setActiveCollections(filteredCollections);
  };

  return (
    <div className="flex flex-col items-center m-4 md:m-10 p-5 bg-1-8 text-o-black rounded-lg">
      <h1 className="text-center text-2-1 text-2xl font-bold mb-6">
        Collections
      </h1>
      <SearchBar
        onSearchChange={handleSearchChange}
        onSearchConfirm={handleSearchConfirm}
        activeSearch={collections
          .filter((item) =>
            item.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((item) => item.title)}
      />
      <div
        className="grid align-center justify-center w-full gap-4 pt-4"
        style={{
          gridTemplateColumns: 'repeat( auto-fit, 320px )',
        }}
      >
        {activeCollections.length > 0 ? (
          activeCollections.map((item) => (
            <CollectionCard
              key={item.id}
              timeAgo={item.timeAgo}
              title={item.title}
              description={item.description}
              collectionId={item.id.toString()}
            />
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
