import React from 'react';
import { LoadableComponent } from '@/components/library';
import Select, { MultiValue } from 'react-select';

import { useProfileCollections } from '@/query/queryHooks';
import { CollectionShort } from '@/api';

export type Option<V> = { value: V; label: string };

export const collectionResponseToOptions = (collections?: CollectionShort[]) =>
  collections?.map((collection) => ({
    value: collection.id,
    label: collection.title,
  })) ?? [];

export interface CollectionsSelectProps {
  selectedOptions: MultiValue<Option<number>>;
  setSelectedOptions: (options: MultiValue<Option<number>>) => void;
}

export const CollectionsSelect: React.FC<CollectionsSelectProps> = ({
  selectedOptions,
  setSelectedOptions,
}) => {
  const { collections, isPending: collectionsPending } =
    useProfileCollections();

  return (
    <LoadableComponent isPending={collectionsPending}>
      <Select
        unstyled
        classNames={{
          container: () => 'w-full',
          control: () => 'bg-o-white border border-black rounded px-1',
          multiValue: () => 'bg-o-blue-sm/25 mx-1 px-1 rounded center',
          multiValueRemove: () => 'pl-1',
          menuList: () =>
            'bg-o-white border border-black my-1 p-1 divide-y-2 divide-o-gray rounded',
          option: () => 'px-2 py-1 rounded hover:bg-o-blue-sm/50 active:',
          dropdownIndicator: () => 'mx-2',
        }}
        // components={animatedSelectComponents}
        isMulti
        isSearchable
        isClearable={false}
        defaultMenuIsOpen={false}
        closeMenuOnSelect={false}
        maxMenuHeight={100}
        options={collectionResponseToOptions(collections)}
        value={selectedOptions}
        onChange={(values) => {
          if (values.length == 0) return;
          setSelectedOptions(values);
        }}
      />
    </LoadableComponent>
  );
};
