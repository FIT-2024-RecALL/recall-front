import React, { HTMLAttributes, useRef, useState } from 'react';

import { Icon, Button } from '@/components/library';
import clsx from 'clsx';
import { addFileStoragePost } from '@/api';
import { dataExtractionWrapper } from '@/query';
import { useMutation } from '@tanstack/react-query';
import { serverUrl } from '@/main';

interface EditorControlsProps extends HTMLAttributes<React.FC> {
  isActive?: boolean;
  switchActive: () => void;
  isExtended?: boolean;
  editorState: string;
  setEditorState: (state: string) => void;
}

export const getMediaMdMarkup = (url: string) => `![](${url})`;

export const EditorControls: React.FC<EditorControlsProps> = ({
  isActive,
  switchActive,
  isExtended,
  className,
  editorState,
  setEditorState,
}) => {
  const [responseMessage, setResponseMessage] = useState<string>();
  const ref = useRef<HTMLInputElement>(null);

  const { mutate: uploadFile, error } = useMutation({
    mutationFn: (data: File) =>
      dataExtractionWrapper(
        addFileStoragePost({
          body: {
            file: data,
          },
        })
      ),
    onSuccess: (response) => {
      setEditorState(editorState + getMediaMdMarkup(serverUrl + response.url));
    },
  });

  return (
    <div className={clsx('around w-full my-1', className)}>
      <input
        ref={ref}
        type="file"
        className="hidden"
        onChange={(e) => {
          if (e.target.files) uploadFile(e.target.files[0]);
        }}
      />
      {isExtended && isActive && (
        <Button
          title="Upload file for card"
          variant="bordered"
          onClick={() => ref.current?.click()}
        >
          <Icon icon="upload" />
        </Button>
      )}

      <Button className="" variant="bordered" onClick={switchActive}>
        {isActive ? <Icon icon="eye" /> : <Icon icon="editor" />}
      </Button>
    </div>
  );
};
