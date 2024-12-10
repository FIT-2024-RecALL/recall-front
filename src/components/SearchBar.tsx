import { IoSearch } from 'react-icons/io5';
import React, { useRef, useEffect, useState } from 'react';
import clsx from 'clsx';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  activeSearch: string[];
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  setSearchTerm,
  activeSearch,
}) => {
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const resultsContainerRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      setHighlightedIndex((prevIndex) =>
        Math.min(prevIndex + 1, activeSearch.length - 1)
      );
    } else if (e.key === 'ArrowUp') {
      setHighlightedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else if (e.key === 'Enter' && highlightedIndex >= 0) {
      const selected = activeSearch[highlightedIndex];
      setSearchTerm(selected);
    } else if (e.key === 'Escape') {
      setHighlightedIndex(-1);
    }
  };

  const handleItemClick = (item: string) => {
    setSearchTerm(item);
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (
      resultsContainerRef.current &&
      !resultsContainerRef.current.contains(e.target as Node)
    ) {
      setHighlightedIndex(-1);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <div className="relative w-[500px] min-w-[250px] max-w-full">
      <div className="relative">
        <input
          type="search"
          placeholder="Search collections..."
          className="w-full h-12 p-4 rounded-full bg-1-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="absolute p-0 right-1 h-10 w-10 top-1/2 -translate-y-1/2 bg-1-5 rounded-full flex justify-center items-center">
          <IoSearch />
        </button>
      </div>

      {highlightedIndex >= 0 && searchTerm && activeSearch.length > 0 && (
        <div
          ref={resultsContainerRef}
          className="absolute top-20 bg-1-5 text-white w-full rounded-xl p-4 overflow-auto max-h-[300px] grid grid-cols-1 gap-2"
        >
          {activeSearch.map((item, index) => (
            <div
              key={index}
              className={clsx(
                'flex justify-between items-center p-2 cursor-pointer',
                highlightedIndex === index && 'bg-1-4 rounded-[5px]'
              )}
              onMouseEnter={() => setHighlightedIndex(index)}
              onClick={() => handleItemClick(item)}
            >
              <span>{item}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
