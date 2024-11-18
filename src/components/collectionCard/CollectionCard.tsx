import React from 'react';

interface CollectionCardProps {
  timeAgo: string;
  title: string;
  description: string;
  onButtonClick1: () => void;
  onButtonClick2: () => void;
}

const CollectionCard: React.FC<CollectionCardProps> = ({
  timeAgo,
  title,
  description,
  onButtonClick1,
  onButtonClick2,
}) => {
  return (
    <div className="bg-2-1 text-o-white p-6 rounded-lg shadow-lg w-80">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-1-6">{timeAgo}</span>
        <div className="w-4 h-4 bg-1-3 rounded-full"></div>
      </div>
      <h2 className="text-lg font-bold text-1-4 mb-2">{title}</h2>
      <p className="text-sm mb-4">{description}</p>
      <div className="flex space-x-2">
        <button
          className="bg-transparent border border-1-3 text-1-3 py-1 px-4 rounded-full hover:bg-1-5 transition duration-200"
          onClick={onButtonClick1}
        >
          Edit
        </button>
        <button
          className="bg-1-3 text-o-black py-1 px-4 rounded-full hover:bg-1-4 transition duration-200"
          onClick={onButtonClick2}
        >
          Train
        </button>
      </div>
    </div>
  );
};

export default CollectionCard;
