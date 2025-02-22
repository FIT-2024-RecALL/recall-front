import React, { HTMLAttributes, useRef } from 'react';

import { Icon, Button } from '@/components/library';
import clsx from 'clsx';
import { getFileFullPath } from '@/query/queryHooks';
import { EditorMutatorWrapper, mutations } from './editorElementTypes';
import { useFileUpload } from '@/query/mutationHooks';

interface EditorControlsProps extends HTMLAttributes<React.FC> {
  isActive?: boolean;
  switchActive: () => void;
  isExtended?: boolean;
  editorActionWrapper: EditorMutatorWrapper;
  undo: false | (() => void);
}

export const getMediaMdMarkup = (url: string) => `\n![](${url})\n`;

export const EditorControls: React.FC<EditorControlsProps> = ({
  isActive,
  switchActive,
  isExtended,
  className,
  editorActionWrapper,
  undo,
}) => {
  const uploadRef = useRef<HTMLInputElement>(null);

  const { uploadFile, isPending: isFilePending } = useFileUpload((response) => {
    editorActionWrapper(mutations.media, getFileFullPath(response.url));
  });

  return (
    <div className={clsx('around w-full my-1 flex-wrap', className)}>
      {isActive && (
        <div className="w-full md:w-fit bg-1-7 border-2 border-1-1 rounded-md around font-medium">
          <Button
            className="rounded-none m-0 p-0 min-h-0 text-black"
            variant="inline"
            title="Bold"
            onClick={() => editorActionWrapper(mutations.bold)}
          >
            <Icon icon="type-bold" />
          </Button>
          <Button
            className="rounded-none m-0 p-0 min-h-0 text-black"
            variant="inline"
            title="Italic"
            onClick={() => editorActionWrapper(mutations.italic)}
          >
            <Icon icon="type-italic" />
          </Button>
          <Button
            className="rounded-none m-0 p-0 min-h-0 text-black"
            variant="inline"
            title="Italic"
            onClick={() => editorActionWrapper(mutations.h1)}
          >
            <Icon icon="h1" />
          </Button>
          <Button
            className="rounded-none m-0 p-0 min-h-0 text-black"
            variant="inline"
            title="Add link"
            onClick={() => editorActionWrapper(mutations.link)}
          >
            <Icon icon="link" />
          </Button>
          <Button
            className="rounded-none m-0 p-0 min-h-0 text-black"
            variant="inline"
            title="Quoting block"
            onClick={() => editorActionWrapper(mutations.quote)}
          >
            <Icon icon="blockquote" />
          </Button>
          <Button
            className="rounded-none m-0 p-0 min-h-0 text-black"
            variant="inline"
            title="Code block"
            onClick={() => editorActionWrapper(mutations.code)}
          >
            <Icon icon="codeblock" />
          </Button>
          <Button
            className="rounded-none m-0 p-0 min-h-0 text-black"
            variant="inline"
            title="Add LaTeX (math) block"
            onClick={() => editorActionWrapper(mutations.math)}
          >
            <Icon icon="sigma" />
          </Button>
          <Button
            className="rounded-none m-0 p-0 min-h-0 text-black"
            variant="inline"
            title="Unordered list"
            onClick={() => editorActionWrapper(mutations.ul)}
          >
            <Icon icon="list-ul" />
          </Button>
          <Button
            className="rounded-none m-0 p-0 min-h-0 text-black"
            variant="inline"
            title="Ordered list"
            onClick={() => editorActionWrapper(mutations.ol)}
          >
            <Icon icon="list-ol" />
          </Button>
        </div>
      )}

      {isActive && isExtended && (
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
            className=""
            variant="bordered"
            title="Upload file for card"
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
      {isActive && (
        <>
          <Button
            className="min-h-0 text-black"
            variant="bordered"
            title="Undo last change"
            disabled={undo ? false : true}
            onClick={undo ? undo : () => {}}
          >
            <Icon icon="revert" />
          </Button>
        </>
      )}
      <Button
        className="min-h-0 text-black"
        variant="bordered"
        title={isActive ? 'Toggle to preview' : 'Toggle to editing'}
        onClick={switchActive}
      >
        {isActive ? <Icon icon="eye" /> : <Icon icon="editor" />}
      </Button>
    </div>
  );
};
