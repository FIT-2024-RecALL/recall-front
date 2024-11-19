import React, { useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import { collections } from './words.js'; // Import your collections
import CollectionCard from '../components/collectionCard/CollectionCard'; // Import CollectionCard

export const SearchBar = () => {
  const [activeSearch, setActiveSearch] = useState<
    { id: number; title: string; description: string; timeAgo: string }[]
  >([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase(); // Convert to lowercase for case-insensitive search
    if (searchTerm === '') {
      setActiveSearch([]);
      return;
    }
    setActiveSearch(
      collections
        .filter((collection) =>
          collection.title.toLowerCase().includes(searchTerm)
        ) // Search in titles
        .slice(0, 8)
    );
  };

  const handleEditClick = (id: number) => {
    console.log(`Edit collection with ID: ${id}`);
    // Add your edit logic here
  };

  const handleTrainClick = (id: number) => {
    console.log(`Train collection with ID: ${id}`);
    // Add your train logic here
  };

  return (
    <form className="w-[500px] relative">
      <div className="relative">
        <input
          type="search"
          placeholder="Search collections..."
          className="w-full h-12 p-4 rounded-full bg-1-10"
          onChange={handleSearch}
        />
        <button className="absolute p-0 right-1 h-10 w-10 top-1/2 -translate-y-1/2 bg-1-5 rounded-full flex justify-center items-center">
          <IoSearch />
        </button>
      </div>

      {activeSearch.length > 0 && (
        <div className="absolute top-20 p-4 bg-1-5 text-white w-full rounded-xl left-1/2 -translate-x-1/2 flex flex-col gap-2">
          {activeSearch.map((collection) => (
            <CollectionCard
              key={collection.id}
              timeAgo={collection.timeAgo}
              title={collection.title}
              description={collection.description}
              onButtonClick1={() => handleEditClick(collection.id)} // Pass the ID to the edit handler
              onButtonClick2={() => handleTrainClick(collection.id)} // Pass the ID to the train handler
            />
          ))}
        </div>
      )}
    </form>
  );
};

export default SearchBar;
