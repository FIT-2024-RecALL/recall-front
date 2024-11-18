// src/pages/CollectionsPage.tsx

import React from 'react';
import { SearchBar } from '@/components/SearchBar';
import CollectionCard from '../components/collectionCard/CollectionCard';

const mockData = [
  { id: 1, title: 'CATS', description: 'Description for Collection 1' },
  { id: 2, title: 'Collection 2', description: 'Description for Collection 2' },
  { id: 3, title: 'Collection 3', description: 'Description for Collection 3' },
  { id: 4, title: 'Collection 4', description: 'Description for Collection 4' },
  { id: 5, title: 'Collection 5', description: 'Description for Collection 5' },
  { id: 6, title: 'Collection 6', description: 'Description for Collection 6' },
];

export const CollectionsPage: React.FC = () => {
  const handleSearch = (query: string) => {
    console.log('Search query:', query);
    // Implement search functionality here
  };

  const handleButtonClick1 = (id: number) => {
    console.log(`Button 1 clicked for Collection ID: ${id}`);
    // Implement action for Button 1
  };

  const handleButtonClick2 = (id: number) => {
    console.log(`Button 2 clicked for Collection ID: ${id}`);
    // Implement action for Button 2
  };

  return (
    <div className="flex flex-col items-center p-5 bg-2-2 rounded-lg shadow-md">
      <h1 className="text-center text-o-white text-2xl font-bold mb-4">
        Collections
      </h1>
      <SearchBar onSearch={handleSearch} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {mockData.map((item) => (
          <CollectionCard
            key={item.id}
            timeAgo="30 минут назад" // You can customize this based on your logic
            title={item.title}
            description={item.description}
            onButtonClick1={() => handleButtonClick1(item.id)}
            onButtonClick2={() => handleButtonClick2(item.id)}
            // Adjust the size of the card here if needed
          />
        ))}
      </div>
    </div>
  );
};
