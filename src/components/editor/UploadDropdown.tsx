import React, { useState } from 'react';
import { DropDown } from '../library/DropDown';
import { Button } from '../library/Button';
import { Icon } from '../library/Icon';
import { useForm } from 'react-hook-form';
import { addFileStoragePost } from '@/api';
import { serverUrl } from '@/main';
import clsx from 'clsx';
import { dataExtractionWrapper } from '@/query';
import { useMutation } from '@tanstack/react-query';

interface UploadFormData {
  file: FileList;
}

export const getMediaMdMarkup = (url: string) => `![](${url})`;

export const UploadDropdown: React.FC = () => {
  const { handleSubmit, register } = useForm<UploadFormData>();

  const {
    mutate: uploadFile,
    data: uploadResponse,
    error,
  } = useMutation({
    mutationFn: (data: UploadFormData) =>
      dataExtractionWrapper(
        addFileStoragePost({
          body: {
            file: data.file[0],
          },
        })
      ),
    onSuccess: (response) => {
      navigator.clipboard.writeText(getMediaMdMarkup(serverUrl + response.url));
    },
  });

  return (
    <DropDown
      buttonComponent={
        <Button title="Upload file for card" variant="bordered">
          <Icon icon="upload" />
        </Button>
      }
    >
      <form
        className={clsx(
          'w-full p-2 vstack',
          'bg-1-8 text-black',
          'border border-black rounded'
        )}
        onSubmit={handleSubmit((data) => uploadFile(data))}
      >
        <div className="around">
          <input type="file" {...register('file', { required: true })} />
          <Button variant="plate" type="submit">
            Upload
          </Button>
        </div>
        {error && <span className="text-red-500 p-1">{error.message}</span>}
        {uploadResponse && (
          <span className="p-1">
            Paste text from your clipboard to editor window
          </span>
        )}
      </form>
    </DropDown>
  );
};
