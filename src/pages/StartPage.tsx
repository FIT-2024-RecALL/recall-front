import { Card } from '@/components/Card';
import React from 'react';
import { Link } from 'wouter';

export const StartPage: React.FC = () => {
  return (
    <div className="vstack m-2 md:m-10 p-2 md:p-5 bg-1-8 text-o-black rounded-md">
      <h1 className="text-4xl my-2 font-bold">
        Make engrams for everything you want
      </h1>
      <Link to="/collections/edit/1">Edit collection 1</Link>
    </div>
  );
};
