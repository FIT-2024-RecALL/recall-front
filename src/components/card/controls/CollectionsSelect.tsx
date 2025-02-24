import React from 'react';
import { LoadableComponent } from '@/components/library';
import Select, { MultiValue } from 'react-select';

import { useProfileCollections } from '@/query/queryHooks';
import { CollectionShort } from '@/api';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  const { collections, isPending: collectionsPending } =
    useProfileCollections();

  return (
    <LoadableComponent isPending={collectionsPending}>
      <Select
        unstyled
        classNames={{
          placeholder: () => 'text-neutral-500/75',
          container: () => 'w-full',
          control: () => 'bg-o-white border border-black rounded px-1',
          multiValue: () => 'bg-blue-200/75 mx-1 px-1 rounded center',
          multiValueRemove: () => 'pl-1',
          menuList: () =>
            'bg-o-white border border-black my-1 p-1 divide-y-2 divide-neutral-300 rounded',
          option: () => 'px-2 py-1 rounded hover:bg-blue-200/50 active:',
          dropdownIndicator: () => 'mx-2',
        }}
        // components={animatedSelectComponents}
        isMulti
        isSearchable
        isClearable={false}
        defaultMenuIsOpen={false}
        closeMenuOnSelect={true}
        maxMenuHeight={100}
        placeholder={t('card.pairedWithPlaceholder')}
        options={collectionResponseToOptions(collections)}
        value={selectedOptions}
        onChange={setSelectedOptions}
      />
    </LoadableComponent>
  );
};
