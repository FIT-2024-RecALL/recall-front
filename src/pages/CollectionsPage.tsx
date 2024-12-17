import React, { useState, useEffect } from 'react';
import { CollectionCard } from '../components/collection/CollectionCard';
import { SearchBar } from '@/components/library/SearchBar';
import { Button } from '@/components/library/Button';
import { useCollections, useProfile } from '@/query/queryHooks';
import { CollectionShort } from '@/api';
import { useAppStore } from '@/state';
import clsx from 'clsx';
import { CollectionsSearchableList } from '@/components/collection/CollectionsSearchableList';
import { LoadableComponent } from '../components/library/LoadableComponent';

export const CollectionsPage: React.FC = () => {
  const { collections, isPending, error } = useCollections();

  return (
    <div className="flex flex-col items-center m-4 md:m-10 p-5 text-o-black">
      <h1 className="text-center text-2-1 text-2xl font-bold mb-6">
        Collections
      </h1>

      <LoadableComponent isPending={isPending} errorMessage={error?.message}>
        {collections && <CollectionsSearchableList collections={collections} />}
      </LoadableComponent>
    </div>
  );
};
