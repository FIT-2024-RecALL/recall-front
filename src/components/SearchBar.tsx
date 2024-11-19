import React, { useEffect, useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import { collections } from './words.js';

interface SearchBarProps {
  onSearchChange: (term: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearchChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSearch, setActiveSearch] = useState<
    { id: number; title: string; description: string; timeAgo: string }[]
  >([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearchChange(term);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      setHighlightedIndex((prevIndex) =>
        Math.min(prevIndex + 1, activeSearch.length - 1)
      );
    } else if (e.key === 'ArrowUp') {
      setHighlightedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else if (e.key === 'Enter') {
      if (highlightedIndex >= 0) {
        onSearchChange(activeSearch[highlightedIndex].title);
      }
    }
  };

  useEffect(() => {
    if (searchTerm === '') {
      setActiveSearch([]);
      setHighlightedIndex(-1);
      return;
    }
    const filteredResults = collections
      .filter((collection) =>
        collection.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .slice(0, 8);
    setActiveSearch(filteredResults);
  }, [searchTerm]);

  return (
    <form className="w-[500px] relative">
      <div className="relative">
        <input
          type="search"
          placeholder="Search collections..."
          className="w-full h-12 p-4 rounded-full bg-1-10"
          value={searchTerm}
          onChange={handleSearch}
          onKeyDown={handleKeyDown}
        />
        <button className="absolute p-0 right-1 h-10 w-10 top-1/2 -translate-y-1/2 bg-1-5 rounded-full flex justify-center items-center">
          <IoSearch />
        </button>
      </div>

      {activeSearch.length > 0 && (
        <div className="absolute top-20 p-4 bg-1-5 text-white w-full rounded-xl left-1/2 -translate-x-1/2 flex flex-col gap-2">
          {activeSearch.map((collection, index) => (
            <div
              key={collection.id}
              className={`flex justify-between items-center p-2 cursor-pointer ${
                highlightedIndex === index ? 'bg-1-4' : ''
              }`}
              onMouseEnter={() => setHighlightedIndex(index)}
              onClick={() => onSearchChange(collection.title)}
            >
              <span>{collection.title}</span>
            </div>
          ))}
        </div>
      )}
    </form>
  );
};

export default SearchBar;
