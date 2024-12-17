import React from 'react';

import { useCollections } from '@/query/queryHooks';
import { CollectionsSearchableList } from '@/components/collection';
import { LoadableComponent } from '@/components/library';

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
