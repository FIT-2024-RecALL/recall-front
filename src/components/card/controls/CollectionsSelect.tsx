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
          control: () => 'bg-1-2 rounded px-1',
          multiValue: () => 'bg-1-3 m-1 px-2 rounded center',
          multiValueRemove: () => 'pl-1',
          menuList: () => 'bg-1-2 my-1 py-1 divide-y-2 divide-black rounded',
          option: () => 'p-2 hover:bg-1-3',
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
