import React from 'react';

import { LoadableComponent } from '@/components/library';
import { useProfileFiles } from '@/query/queryHooks';
import { FileCard } from './FileCard';

export const FilesList: React.FC = () => {
  const { files, isPending: isFilesPending, error } = useProfileFiles();

  return (
    <LoadableComponent
      isPending={isFilesPending}
      errorMessage={error?.message}
      className="grid grid-cols-1 align-center justify-center w-full gap-4"
      animated
    >
      {files && files.length === 0 && (
        <h3 className="text-center text-xl font-medium col-span-full">
          You haven{"'"}t upload any file yes. Feel free to add them using card
          {"'"}s edit form
        </h3>
      )}
      {files &&
        files.length > 0 &&
        files?.map((id) => <FileCard key={id} fileId={id} />)}
    </LoadableComponent>
  );
};
