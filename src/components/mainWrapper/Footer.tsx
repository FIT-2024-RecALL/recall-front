import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-2-1 text-2-5 flex vstack center p-1">
      <div className="flex justify-between w-full">
        <p>
          <code>2024</code>, NSU FIT
        </p>
        <a className="underline" href="https://github.com/FIT-2024-RecALL" target="_blank" rel="noopener noreferrer">
          Github
        </a>
      </div>
    </footer>
  );
};