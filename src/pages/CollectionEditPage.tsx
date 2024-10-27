import { Card } from '@/components/card/Card';
import { useAppStore } from '@/state';
import React from 'react';
import { Redirect, useParams } from 'wouter';
import { useShallow } from 'zustand/shallow';

interface EditPageParams {
  id: number;
}

export const CollectionEditPage: React.FC = () => {
  const { id } = useParams<EditPageParams>();
  const collection = useAppStore((state) => state.getCollection)(Number(id));
  const cards = collection?.cards.map((card, i) => (
    <Card cardData={card} mode="train" key={i} />
  ));

  return (
    <>
      {!collection && <Redirect to="" />}
      <div className="vstack m-2 md:m-10 p-2 md:p-5 bg-1-8 text-black rounded-md">
        <h1 className="text-4xl my-2 font-bold">Edit collection {id}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full">
          {cards}
        </div>
      </div>
    </>
  );
};
