import React, { HTMLAttributes, useRef } from 'react';

import { Icon, Button } from '@/components/library';
import clsx from 'clsx';
import { addFileStoragePost } from '@/api';
import { dataExtractionWrapper } from '@/query';
import { useMutation } from '@tanstack/react-query';
import { getFileFullPath } from '@/query/queryHooks';
import { EditorMutatorWrapper, mutations } from './editorElementTypes';

interface EditorControlsProps extends HTMLAttributes<React.FC> {
  isActive?: boolean;
  switchActive: () => void;
  isExtended?: boolean;
  editorActionWrapper: EditorMutatorWrapper;
  editorState: string;
  setEditorState: (state: string) => void;
}

export const getMediaMdMarkup = (url: string) => `\n![](${url})\n`;

export const EditorControls: React.FC<EditorControlsProps> = ({
  isActive,
  switchActive,
  isExtended,
  className,
  editorActionWrapper,
  editorState,
  setEditorState,
}) => {
  const uploadRef = useRef<HTMLInputElement>(null);

  const { mutate: uploadFile, isPending: isFilePending } = useMutation({
    mutationFn: (data: File) =>
      dataExtractionWrapper(
        addFileStoragePost({
          body: {
            file: data,
          },
        })
      ),
    onSuccess: (response) => {
      setEditorState(
        editorState + getMediaMdMarkup(getFileFullPath(response.url))
      );
    },
  });

  return (
    <div className={clsx('around w-full my-1', className)}>
      <>
        {isActive && (
          <>
            <Button
              className=""
              variant="bordered"
              onClick={() => editorActionWrapper(mutations.bold)}
            >
              <b>B</b>
            </Button>
            <Button
              className=""
              variant="bordered"
              onClick={() => editorActionWrapper(mutations.italic)}
            >
              <i>I</i>
            </Button>
            <Button
              className=""
              variant="bordered"
              onClick={() => editorActionWrapper(mutations.quote)}
            >
              {'""'}
            </Button>
            <Button
              className=""
              variant="bordered"
              onClick={() => editorActionWrapper(mutations.code)}
            >
              {'</>'}
            </Button>
            <Button
              className=""
              variant="bordered"
              onClick={() => editorActionWrapper(mutations.ul)}
            >
              {'ul'}
            </Button>
            <Button
              className=""
              variant="bordered"
              onClick={() => editorActionWrapper(mutations.ol)}
            >
              {'ol'}
            </Button>
            {isExtended && (
              <>
                <input
                  ref={uploadRef}
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files) uploadFile(e.target.files[0]);
                  }}
                />
                <Button
                  title="Upload file for card"
                  variant="bordered"
                  onClick={() => uploadRef.current?.click()}
                >
                  {!isFilePending ? (
                    <Icon icon="upload" />
                  ) : (
                    <Icon className="animate-spin" icon="loading-3/4" />
                  )}
                </Button>
              </>
            )}
          </>
        )}

        <Button className="" variant="bordered" onClick={switchActive}>
          {isActive ? <Icon icon="eye" /> : <Icon icon="editor" />}
        </Button>
      </>
    </div>
  );
};
