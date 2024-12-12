import React, { useState } from 'react';
import { DropDown } from '../library/DropDown';
import { Button } from '../library/Button';
import { Icon } from '../library/Icon';
import { useForm } from 'react-hook-form';
// import { addFileStorageUserIdPost } from '@/api';
import { serverUrl } from '@/main';
import clsx from 'clsx';

interface UploadFormData {
  file: FileList;
}

export const UploadDropdown: React.FC = () => {
  const { handleSubmit, register } = useForm<UploadFormData>();
  const [uploadedLink, setUploadedLink] = useState<string>();

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
        onSubmit={handleSubmit((data) => {
          // addFileStorageUserIdPost({
          //   path: {
          //     user_id: 1,
          //   },
          //   body: {
          //     file: data.file[0],
          //   },
          // })
          //   .then((response) => {
          //     if (response.response.ok)
          //       setUploadedLink(serverUrl + response.data?.url);
          //     else setUploadedLink(response.error?.detail?.toString());
          //   })
          //   .catch((error) => {
          //     console.log(error);
          //   });
        })}
      >
        <div className="around">
          <input type="file" {...register('file', { required: true })} />
          <Button variant="plate" type="submit">
            Upload
          </Button>
        </div>
        {uploadedLink && (
          <div
            className="mt-2 around hover:cursor-pointer text-sm"
            onClick={() => {
              console.log('Copying ' + uploadedLink);
              navigator.clipboard.writeText(uploadedLink);
            }}
          >
            <span className="mr-1">Link to file (click to copy):</span>
            <span>
              {/* TODO: Добавить другое отображение для ошибочного ответа от сервера */}
              <u>{uploadedLink}</u>
            </span>
          </div>
        )}
      </form>
    </DropDown>
  );
};
