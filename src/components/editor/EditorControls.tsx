import React, { HTMLAttributes, useRef } from 'react';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  const uploadRef = useRef<HTMLInputElement>(null);

  const { uploadFile, isPending: isFilePending } = useFileUpload((response) => {
    editorActionWrapper(mutations.media, getFileFullPath(response.url));
  });

  return (
    <div className={clsx('around w-full my-1 gap-y-1 flex-wrap', className)}>
      {isActive && (
        <div className="w-full md:w-fit bg-1-7 ring-2 ring-o-black rounded-md around font-medium overflow-hidden">
          <Button
            className="rounded-none m-0 p-0 min-h-0 text-black"
            variant="inline"
            title={t('editor.bold')}
            onClick={() => editorActionWrapper(mutations.bold)}
          >
            <Icon icon="type-bold" />
          </Button>
          <Button
            className="rounded-none m-0 p-0 min-h-0 text-black"
            variant="inline"
            title={t('editor.italic')}
            onClick={() => editorActionWrapper(mutations.italic)}
          >
            <Icon icon="type-italic" />
          </Button>
          <Button
            className="rounded-none m-0 p-0 min-h-0 text-black"
            variant="inline"
            title={t('editor.h1')}
            onClick={() => editorActionWrapper(mutations.h1)}
          >
            <Icon icon="h1" />
          </Button>
          <Button
            className="rounded-none m-0 p-0 min-h-0 text-black"
            variant="inline"
            title={t('editor.link')}
            onClick={() => editorActionWrapper(mutations.link)}
          >
            <Icon icon="link" />
          </Button>
          <Button
            className="rounded-none m-0 p-0 min-h-0 text-black"
            variant="inline"
            title={t('editor.quote')}
            onClick={() => editorActionWrapper(mutations.quote)}
          >
            <Icon icon="blockquote" />
          </Button>
          <Button
            className="rounded-none m-0 p-0 min-h-0 text-black"
            variant="inline"
            title={t('editor.code')}
            onClick={() => editorActionWrapper(mutations.code)}
          >
            <Icon icon="codeblock" />
          </Button>
          <Button
            className="rounded-none m-0 p-0 min-h-0 text-black"
            variant="inline"
            title={t('editor.math')}
            onClick={() => editorActionWrapper(mutations.math)}
          >
            <Icon icon="sigma" />
          </Button>
          <Button
            className="rounded-none m-0 p-0 min-h-0 text-black"
            variant="inline"
            title={t('editor.ul')}
            onClick={() => editorActionWrapper(mutations.ul)}
          >
            <Icon icon="list-ul" />
          </Button>
          <Button
            className="rounded-none m-0 p-0 min-h-0 text-black"
            variant="inline"
            title={t('editor.ol')}
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
            className="min-h-0 text-o-black"
            variant="bordered"
            title={t('editor.uploadFile')}
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
            className="min-h-0 text-o-black"
            variant="bordered"
            title={t('editor.undo')}
            disabled={undo ? false : true}
            onClick={undo ? undo : () => {}}
          >
            <Icon icon="revert" />
          </Button>
        </>
      )}
      <Button
        className="min-h-0 text-o-black"
        variant="bordered"
        title={isActive ? t('editor.togglePreview') : t('editor.toggleEdit')}
        onClick={switchActive}
      >
        {isActive ? <Icon icon="eye" /> : <Icon icon="editor" />}
      </Button>
    </div>
  );
};
