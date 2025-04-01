import { getFileFullPath, useFileMeta } from '@/query/queryHooks';
import React, { HTMLAttributes } from 'react';
import { Button, IsPublicIcon, LoadableComponent } from '@/components/library';
import clsx from 'clsx';
import { useFileDelete } from '@/query/mutationHooks';

interface FileCardProps extends HTMLAttributes<React.FC> {
  fileId: number;
}

export const FileCard: React.FC<FileCardProps> = ({ fileId, className }) => {
  const { fileMeta, isPending, error } = useFileMeta(fileId);
  const { deleteFile } = useFileDelete();

  return (
    <LoadableComponent
      isPending={isPending}
      errorMessage={error?.message}
      className={clsx(
        'bg-neutral-300/25 px-2 py-4',
        'grid grid-cols-4',
        'gap-x-4 rounded-lg',
        className
      )}
      animated
    >
      {fileMeta && (
        <>
          <div className="col-span-4 md:col-span-3 around">
            <IsPublicIcon isPublic={fileMeta.isPublic} />
            <a className="w-fit truncate" href={getFileFullPath(fileMeta.id)}>
              <Button className="w-full" variant="inline">
                {getFileFullPath(fileMeta.id)}
              </Button>
            </a>
          </div>
          <div className="col-span-4 md:col-span-1">
            <Button
              className="w-full"
              variant="bordered"
              onClick={() => deleteFile(fileMeta.id)}
            >
              Delete file
            </Button>
          </div>
        </>
      )}
    </LoadableComponent>
  );
};
