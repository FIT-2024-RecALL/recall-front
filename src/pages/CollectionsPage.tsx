import React, { useState } from 'react';
import CollectionCard from '../components/collectionCard/CollectionCard';
import SearchBar from '@/components/SearchBar';
import { collections } from '../components/words.js';

export const CollectionsPage: React.FC = () => {
  const [, setSearchTerm] = useState('');
  const [activeSearch, setActiveSearch] = useState(collections);

  const handleButtonClick1 = (id: number) => {
    console.log(`Button 1 clicked for Collection ID: ${id}`);
    // Implement action for Button 1
  };

  const handleButtonClick2 = (id: number) => {
    console.log(`Button 2 clicked for Collection ID: ${id}`);
    // Implement action for Button 2
  };

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    if (term === '') {
      setActiveSearch(collections);
    } else {
      setActiveSearch(
        collections.filter((item) =>
          item.title.toLowerCase().includes(term.toLowerCase())
        )
      );
    }
  };

  return (
    <div className="flex flex-col items-center vstack m-2 md:m-10 p-2 md:p-5 bg-1-8 text-o-black rounded-md ">
      <h1 className="text-center text-o-white text-2xl font-bold mb-4">
        Collections
      </h1>
      <SearchBar onSearchChange={handleSearchChange} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {activeSearch.map((item) => (
          <CollectionCard
            key={item.id}
            timeAgo="30 минут назад"
            title={item.title}
            description={item.description}
            onButtonClick1={() => handleButtonClick1(item.id)}
            onButtonClick2={() => handleButtonClick2(item.id)}
          />
        ))}
      </div>
    </div>
  );
};
