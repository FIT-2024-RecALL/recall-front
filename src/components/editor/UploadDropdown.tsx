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
  const [responseMessage, setResponseMessage] = useState<string>();

  const { mutate: uploadFile, error } = useMutation({
    mutationFn: (data: UploadFormData) =>
      dataExtractionWrapper(
        addFileStoragePost({
          body: {
            file: data.file[0],
          },
        })
      ),
    onSuccess: (response) => {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(
          getMediaMdMarkup(serverUrl + response.url)
        );
        setResponseMessage('Paste text from your clipboard to editor window');
      } else {
        setResponseMessage(
          'Paste next text into editor: ' + serverUrl + response.url
        );
      }
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
        {!error && responseMessage && (
          <span className="p-1">{responseMessage}</span>
        )}
      </form>
    </DropDown>
  );
};
