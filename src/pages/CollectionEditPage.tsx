import { Card } from '@/components/card/Card';
import React from 'react';
import { useParams } from 'wouter';

interface EditPageParams {
  id: number;
}

export const CollectionEditPage: React.FC = () => {
  const { id } = useParams<EditPageParams>();

  return (
    <div className="vstack m-2 md:m-10 p-2 md:p-5 bg-1-8 text-black rounded-md">
      <h1 className="text-4xl my-2 font-bold">Edit collection {id}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full">
        <Card mode="train" />
        <Card mode="edit" />
        <Card mode="edit" />
        <Card mode="edit" />
        <Card mode="edit" />
        <Card mode="edit" />
      </div>
    </div>
  );
};
