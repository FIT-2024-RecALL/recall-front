import React, { HTMLAttributes, useState, useRef, useCallback } from 'react';
import clsx from 'clsx';
import { match } from 'ts-pattern';

import { EditorControls } from './EditorControls';
import { MarkdownRenderComponent } from './MarkdownRenderComponent';
import {
  EditorElementState,
  EditorMutatorWrapper,
  EditorStateMutator,
  mutations,
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
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const editorActionWrapper: EditorMutatorWrapper = useCallback(
    (mutate: EditorStateMutator) => {
      if (!editorRef.current) return;
      const selectionStart = editorRef.current.selectionStart;
      const selectionEnd = editorRef.current.selectionEnd;
      const editorElementState: EditorElementState = {
        selectionStart,
        selectionEnd,
        prevPart: state.slice(0, selectionStart),
        midPart: state.slice(selectionStart, selectionEnd),
        nextPart: state.slice(selectionEnd),
      };
      // ... Ещё что-то

      const newStr = mutate(editorElementState);
      setState(newStr);

      // editorRef.current.focus();
      // .. Ещё что-то
    },
    [editorRef, state, setState]
  );

  return (
    <>
      <EditorControls
        isExtended={extended}
        isActive={active}
        switchActive={() => setActive((a) => !a)}
        editorActionWrapper={editorActionWrapper}
        editorState={state}
        setEditorState={setState}
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
            onChange={(e) => {
              setState(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Tab') {
                e.preventDefault();
                // TODO: Добавить замену таба двумя пробелами
              }
              if (e.ctrlKey) {
                match(e.key)
                  .with('b', () => editorActionWrapper(mutations.bold))
                  .with('i', () => editorActionWrapper(mutations.italic));
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
