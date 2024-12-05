import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer>
      <div className="bg-1-8 text-1-1 flex vstack center p-1">
        <p>
          <code>2024</code>, NSU FIT
        </p>
        <a
          className="underline"
          href="https://github.com/FIT-2024-RecALL"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </a>
      </div>
    </footer>
  );
};
