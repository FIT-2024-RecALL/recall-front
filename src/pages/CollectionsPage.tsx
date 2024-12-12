import React, { useState, useEffect } from 'react';
import { CollectionCard } from '../components/collection/CollectionCard';
import { SearchBar } from '@/components/library/SearchBar';
import { collections } from '../components/library/mockCollectionsData.js';
import { Link } from 'wouter';
import { Button } from '@/components/library/Button';

export const CollectionsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCollections, setActiveCollections] = useState(collections);

  useEffect(() => {
    const filteredCollections =
      searchTerm.trim() === ''
        ? collections
        : collections.filter((item) =>
            item.title.toLowerCase().includes(searchTerm.toLowerCase())
          );
    setActiveCollections(filteredCollections);
  }, [searchTerm]);

  return (
    <div className="flex flex-col items-center m-4 md:m-10 p-5 text-o-black">
      <h1 className="text-center text-2-1 text-2xl font-bold mb-6">
        Collections
      </h1>

      <div className="flex justify-center mb-4">
        <Button
          variant="plate"
          className="py-3 px-6 rounded-full text-lg shadow-md hover:shadow-lg transition duration-200"
        >
          Create collection
        </Button>
      </div>

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
            <CollectionCard
              key={item.id}
              collectionId={item.id}
              timeAgo={item.timeAgo}
              title={item.title}
              description={item.description}
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
