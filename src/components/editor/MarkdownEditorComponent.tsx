import React, { HTMLAttributes, useState, useRef, useCallback } from 'react';
import clsx from 'clsx';
import { match } from 'ts-pattern';

import { EditorControls } from './EditorControls';
import { MarkdownRenderComponent } from './MarkdownRenderComponent';
import {
  EditorElementState,
  EditorMutatorWrapper,
  mutations,
  SelectionType,
} from './editorElementTypes';

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
        <div className="w-full h-full">
          <textarea
            ref={editorRef}
            className={clsx(
              'bg-1-2 focus:bg-1-1',
              'p-2 w-full h-full',
              'resize-none text-md',
              'rounded font-medium font-mono'
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
          />
        </div>
      ) : (
        <MarkdownRenderComponent
          rawText={state}
          extended={extended}
          className={clsx('text-lg w-full', previewClassName)}
        />
      )}
    </>
  );
};
