import { IoSearch } from 'react-icons/io5';
import React, { useRef, useEffect, useState } from 'react';
import clsx from 'clsx';

interface SearchBarProps {
  onSearchChange: (term: string) => void;
  onSearchConfirm: () => void;
  activeSearch: string[];
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearchChange,
  onSearchConfirm,
  activeSearch,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [isSearchCompleted, setIsSearchCompleted] = useState(false);
  const resultsContainerRef = useRef<HTMLDivElement>(null);
  const resultRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    setIsSearchCompleted(false);
    onSearchChange(term);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      setHighlightedIndex((prevIndex) => {
        const newIndex = Math.min(prevIndex + 1, activeSearch.length - 1);
        return newIndex;
      });
    } else if (e.key === 'ArrowUp') {
      setHighlightedIndex((prevIndex) => {
        const newIndex = Math.max(prevIndex - 1, 0);
        return newIndex;
      });
    } else if (e.key === 'Enter') {
      if (isSearchCompleted) {
        return;
      }
      if (highlightedIndex >= 0) {
        const selected = activeSearch[highlightedIndex];
        onSearchChange(selected);
        setSearchTerm(selected);
      }

      onSearchChange(searchTerm);
      onSearchConfirm();
      setIsSearchCompleted(true);
    }
  };

  const handleSearchButtonClick = () => {
    onSearchChange(searchTerm);
    onSearchConfirm();
    setIsSearchCompleted(true);
  };

  const handleItemClick = (item: string) => {
    onSearchChange(item);
    setSearchTerm(item);
    onSearchConfirm();
    setIsSearchCompleted(true);
  };

  const scrollToHighlighted = (index: number) => {
    resultRefs.current[index]?.scrollIntoView({
      block: 'nearest',
    });
  };

  useEffect(() => {
    scrollToHighlighted(highlightedIndex);
  }, [highlightedIndex]);

  return (
    <div className="relative w-[500px] min-w-[250px] max-w-full">
      <div className="relative">
        <input
          type="search"
          placeholder="Search collections..."
          className="w-full h-12 p-4 rounded-full bg-1-10"
          value={searchTerm}
          onChange={handleSearch}
          onKeyDown={handleKeyDown}
        />
        <button
          className="absolute p-0 right-1 h-10 w-10 top-1/2 -translate-y-1/2 bg-1-5 rounded-full flex justify-center items-center"
          onClick={handleSearchButtonClick}
        >
          <IoSearch />
        </button>
      </div>

      {!isSearchCompleted && searchTerm && activeSearch.length > 0 && (
        <div
          ref={resultsContainerRef}
          className="absolute top-20 bg-1-5 text-white w-full rounded-xl p-4 overflow-auto max-h-[300px] grid grid-cols-1 gap-2"
        >
          {activeSearch.map((item, index) => (
            <div
              ref={(el) => (resultRefs.current[index] = el)}
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
