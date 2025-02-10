import React, { HTMLAttributes, useState, useRef, useCallback } from 'react';
import clsx from 'clsx';
import { match } from 'ts-pattern';

import { EditorControls } from './EditorControls';
import { MarkdownRenderComponent } from './MarkdownRenderComponent';
import {
  EditorElementState,
  EditorMutatorWrapper,
  mutations,
} from './editorElementTypes';
import { Immutable, produce } from 'immer';

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

  const historyRef = useRef<Immutable<string[]>>([state]);
  const pushHistory = useCallback(
    (value: string) => {
      historyRef.current = produce(historyRef.current, (history) => {
        history.push(value);
      });
    },
    [historyRef]
  );
  const popHistory = useCallback(() => {
    if (historyRef.current.length === 1) return historyRef.current[0];
    historyRef.current = produce(historyRef.current, (history) => {
      history.pop();
    });
    return historyRef.current[historyRef.current.length - 1];
  }, [historyRef]);

  const editorRef = useRef<HTMLTextAreaElement>(null);
  const editorActionWrapper: EditorMutatorWrapper = (mutate, payload) => {
    if (!editorRef.current) return;
    const editorElementState: EditorElementState = {
      selectionStart: editorRef.current.selectionStart,
      selectionEnd: editorRef.current.selectionEnd,
      str: state,
    };

    const newStr = mutate(editorElementState, payload);
    setState(newStr);
    pushHistory(newStr);
    editorRef.current.focus();
  };

  return (
    <>
      <EditorControls
        isExtended={extended}
        isActive={active}
        switchActive={() => setActive((a) => !a)}
        editorActionWrapper={editorActionWrapper}
        undo={historyRef.current.length > 1 && (() => setState(popHistory()))}
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
              pushHistory(e.target.value);
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
                  .with('KeyZ', () => {
                    e.preventDefault();
                    setState(popHistory());
                  });
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
