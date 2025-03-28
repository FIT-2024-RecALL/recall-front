import React, { HTMLAttributes, useState, useRef, useCallback } from 'react';
import clsx from 'clsx';
import { match } from 'ts-pattern';

import { EditorControls } from './EditorControls';
import { MarkdownRenderComponent } from './MarkdownRenderComponent';
import {
  EditorElementState,
  EditorMutatorWrapper,
  LINK_REGEX,
  mutations,
  SelectionType,
} from './editorElementTypes';
import { useFileUpload } from '@/query/mutationHooks';
import { getFileFullPath } from '@/query/queryHooks';

interface MarkdownEditorComponentProps extends HTMLAttributes<React.FC> {
  state: string;
  setState: (newState: string) => void;
  extended?: boolean;
  placeholder?: string;
  previewClassName?: string;
}

export const MarkdownEditorComponent: React.FC<
  MarkdownEditorComponentProps
> = ({ state, setState, extended, placeholder, previewClassName }) => {
  const [active, setActive] = useState(true);

  const historyRef = useRef<EditorElementState[]>([]);
  const pushHistory = useCallback(
    (value: EditorElementState) => {
      historyRef.current.push(value);
    },
    [historyRef]
  );
  const popHistory = useCallback(() => {
    return historyRef.current.pop();
  }, [historyRef]);

  const editorRef = useRef<HTMLTextAreaElement>(null);
  const editorActionWrapper: EditorMutatorWrapper = (mutate, payload) => {
    const selection = getEditorSelection();
    if (!selection) return;
    const editorElementState: EditorElementState = {
      ...selection,
      str: state,
    };
    pushHistory(editorElementState);

    const newEditorElementState = mutate(editorElementState, payload);
    setEditorSelection(newEditorElementState);
    setState(newEditorElementState.str);
  };

  const undo = () => {
    const prevEditorState = popHistory();
    if (!prevEditorState) return;
    setState(prevEditorState.str);
    setEditorSelection(prevEditorState);
  };

  const getEditorSelection = useCallback(() => {
    if (!editorRef.current) return;
    const { selectionStart, selectionEnd } = editorRef.current;
    return { selectionStart, selectionEnd } satisfies SelectionType;
  }, [editorRef]);
  const setEditorSelection = useCallback(
    ({ selectionStart, selectionEnd }: SelectionType) => {
      requestAnimationFrame(() => {
        if (!editorRef.current) return;
        editorRef.current.focus();
        editorRef.current.setSelectionRange(selectionStart, selectionEnd);
      });
    },
    [editorRef]
  );

  const { uploadFile } = useFileUpload((response) => {
    editorActionWrapper(mutations.media, getFileFullPath(response.url));
  });

  return (
    <>
      <EditorControls
        isExtended={extended}
        isActive={active}
        switchActive={() => setActive((a) => !a)}
        editorActionWrapper={editorActionWrapper}
        undo={historyRef.current.length > 0 && undo}
      />
      {active ? (
        <textarea
          ref={editorRef}
          className={clsx(
            'p-1 md:p-2 full',
            'bg-transparent resize-none',
            'transition-all duration-200',
            'rounded-lg text-o-black font-mono',
            'hover:shadow-inner hover:shadow-neutral-400',
            'focus:shadow-inner hover:shadow-neutral-400',
            'focus:apperance-none focus:outline-none'
          )}
          placeholder={placeholder}
          value={state}
          onBeforeInput={() => {
            const selection = getEditorSelection();
            if (!selection) return;
            pushHistory({
              ...selection,
              str: state,
            });
          }}
          onChange={(e) => {
            setState(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Tab') {
              e.preventDefault();
              editorActionWrapper(mutations.tab);
            }
            if (e.ctrlKey) {
              match(e.code)
                .with('KeyB', () => editorActionWrapper(mutations.bold))
                .with('KeyI', () => editorActionWrapper(mutations.italic))
                .with('KeyZ', () => undo());
            }
          }}
          onPaste={(e) => {
            if (e.clipboardData.types.length == 0) return;
            match(e.clipboardData.items[0].kind)
              .with('string', () => {
                const text = e.clipboardData.getData('text/plain');
                if (LINK_REGEX.test(text)) {
                  e.preventDefault();
                  editorActionWrapper(mutations.link, text);
                }
              })
              .with('file', () => {
                e.preventDefault();
                uploadFile(e.clipboardData.files[0]);
              });
          }}
          onDragEnter={(e) => {
            e.preventDefault();
            e.currentTarget.classList.remove('bg-transparent');
            e.currentTarget.classList.add(
              'bg-black/10',
              'shadow-inner',
              'shadow-neutral-400'
            );
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            e.currentTarget.classList.add('bg-transparent');
            e.currentTarget.classList.remove(
              'bg-black/10',
              'shadow-inner',
              'shadow-neutral-400'
            );
          }}
          onDrop={(e) => {
            e.preventDefault();
            if (e.dataTransfer.files.length > 0) {
              uploadFile(e.dataTransfer.files[0]);
            }
            e.currentTarget.classList.add('bg-transparent');
            e.currentTarget.classList.remove(
              'bg-black/10',
              'shadow-inner',
              'shadow-neutral-400'
            );
          }}
        />
      ) : (
        <MarkdownRenderComponent
          rawText={state}
          extended={extended}
          className={clsx(
            'p-2 md:p-4 font-sans',
            'overflow-y-auto overflow-x-hidden',
            previewClassName
          )}
        />
      )}
    </>
  );
};
