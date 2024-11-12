import React, { HTMLAttributes, useMemo, useState } from 'react';
import {
  simpleRenderer,
  extendedMdRenderer,
} from './markdown-it-plugged-parser';
import clsx from 'clsx';
import { DropDown } from '../library/DropDown';
import { Button } from '../library/Button';
import { Icon } from '../library/Icon';
import { useForm } from 'react-hook-form';
import { addFileStorageUserIdPost } from '@/api';
import { serverUrl } from '@/main';

interface EditorComponentProps extends HTMLAttributes<React.FC> {
  state: string;
  setState: (newState: string) => void;
  active?: boolean;
  extended?: boolean;
  placeholder?: string;
}

interface UploadFormData {
  file: FileList;
}

export const EditorComponent: React.FC<EditorComponentProps> = ({
  state,
  setState,
  active,
  extended,
  placeholder,
}) => {
  const renderer = useMemo(
    () => (extended ? extendedMdRenderer : simpleRenderer),
    [extended]
  );
  const { handleSubmit, register } = useForm<UploadFormData>();
  const [uploadedLink, setUploadedLink] = useState<string | undefined>(
    undefined
  );

  return (
    <>
      {active ? (
        <div className="w-full h-full">
          <DropDown
            buttonComponent={
              <Button variant="bordered">
                <Icon icon="editor" />
              </Button>
            }
          >
            <form
              className={clsx(
                'w-full p-2 around',
                'bg-1-8 text-black',
                'border border-black rounded'
              )}
              onSubmit={handleSubmit((data) => {
                addFileStorageUserIdPost({
                  path: {
                    user_id: 1,
                  },
                  body: {
                    file: data.file[0],
                  },
                })
                  .then((response) => {
                    if (response.response.ok)
                      setUploadedLink(serverUrl + response.data?.url);
                    else setUploadedLink(response.error?.detail?.toString());
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              })}
            >
              <input type="file" {...register('file', { required: true })} />
              <Button variant="plate" type="submit">
                Upload
              </Button>
              {uploadedLink && <input className="m-2 p-1 border border-black" disabled value={uploadedLink} />}
            </form>
          </DropDown>
          <textarea
            className={clsx(
              'bg-1-2 focus:bg-1-3',
              'p-1 md:p-2',
              'w-full h-full',
              'resize-none text-md',
              'rounded'
            )}
            placeholder={placeholder}
            value={state}
            onChange={(e) => setState(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Tab') {
                e.preventDefault();
                // TODO: Добавить замену таба двумя пробелами
              }
            }}
          />
        </div>
      ) : (
        <div
          className="text-lg w-full markdown overflow-auto"
          dangerouslySetInnerHTML={{
            __html: renderer.render(state),
          }}
        ></div>
      )}
    </>
  );
};
