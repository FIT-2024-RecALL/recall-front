import React from 'react';
import clsx from 'clsx';

import { LoadableComponent, Button } from '@/components/library';
import { getFileFullPath, useProfileFiles } from '@/query/queryHooks';
import { useFileDelete } from '@/query/mutationHooks';

export const FilesList: React.FC = () => {
  const { files, isPending: isFilesPending } = useProfileFiles();

  const { deleteFile } = useFileDelete();

  return (
    <LoadableComponent
      isPending={isFilesPending}
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
        files?.map((file) => (
          <div
            className={clsx(
              'bg-neutral-300/25 px-2 py-4',
              'grid grid-cols-4',
              'gap-x-4 rounded-lg'
            )}
            key={file.url}
          >
            <div className="col-span-4 md:col-span-3 truncate">
              <a className="w-fit" href={getFileFullPath(file.url)}>
                <Button className="w-full" variant="inline">
                  {getFileFullPath(file.url)}
                </Button>
              </a>
            </div>
            <div className="col-span-4 md:col-span-1">
              <Button
                className="w-full"
                variant="bordered"
                onClick={() => deleteFile(file.filename)}
              >
                Delete file
              </Button>
            </div>
          </div>
        ))}
    </LoadableComponent>
  );
};
