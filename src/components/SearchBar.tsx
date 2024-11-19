// src/components/SearchBar.tsx

import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form submission
    onSearch(query);
    setQuery('');
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center max-w-md mx-auto"
    >
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <div className="input-wrapper bg-white w-full rounded-[15px] h-[2.5rem] px-[15px] shadow-[0px_0px_8px_#ddd] flex items-center">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            id="search-icon"
            className="w-5 h-5 text-royalblue"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M11 4a7 7 0 100 14 7 7 0 000-14zm0 0l6 6"
            />
          </svg>
        </div>
        <input
          type="text"
          id="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          className="input bg-transparent border-none h-full text-[1.25rem] w-full ml-1"
          required
          onFocus={() => {
            // Optional: Add focus effect here if needed
          }}
        />
        <button
          type="submit"
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-blue-600 hover:text-blue-800 transition duration-200"
        >
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 12h3m-3 0h-3m3 0v3m0-3V9m-6 3h-3m3 0h3m-3 0v3m0-3V9"
            />
          </svg>
        </button>
      </div>
    </form>
  );
};