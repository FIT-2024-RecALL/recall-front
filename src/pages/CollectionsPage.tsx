import React, { useState, useEffect } from 'react';
import { CollectionCard } from '../components/collectionCard/CollectionCard';
import { SearchBar } from '@/components/SearchBar';
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
    <div className="flex flex-col items-center m-4 md:m-10 p-5 bg-1-8 text-o-black rounded-lg">
      <h1 className="text-center text-2-1 text-2xl font-bold mb-6">
        Collections
      </h1>

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

      <div className="fixed inset-x-0 bottom-0 mb-8 flex justify-center">
        <Link to={`/collections/edit/undefined`}>
          <Button
            className="bg-gradient-to-r from-1-1 to-1-3 text-1-9 py-3 px-6 rounded-full text-lg shadow-md hover:shadow-lg hover:from-1-3 hover:to-1-5 transition duration-200"
            style={{
              minWidth: '500px',
              width: 'calc(100% - 100px)',
              marginLeft: '50px',
              marginRight: '50px',
            }}
          >
            <p>Edit Collection</p>
          </Button>
        </Link>
      </div>
    </div>
  );
};
