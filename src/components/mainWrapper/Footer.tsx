import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer>
      <div className="bg-2-1 color-2-5 flex vstack center p-1">
        <p>
          <code>2024</code>, NSU FIT
        </p>
        <a className="underline" href="https://github.com/FIT-2024-RecALL">
          Github
        </a>
      </div>
    </footer>
  );
};
