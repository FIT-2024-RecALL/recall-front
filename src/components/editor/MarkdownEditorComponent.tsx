import React, { HTMLAttributes, useState } from 'react';
import clsx from 'clsx';
import { EditorControls } from './EditorControls';
import { MarkdownRenderComponent } from './MarkdownRenderComponent';

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

  return (
    <>
      <EditorControls
        isExtended={extended}
        isActive={active}
        switchActive={() => setActive((a) => !a)}
        editorState={state}
        setEditorState={setState}
      />
      {active ? (
        <div className="w-full h-full">
          <textarea
            className={clsx(
              'bg-1-2 focus:bg-1-3',
              'p-2 w-full h-full',
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
        <MarkdownRenderComponent
          rawText={state}
          extended={extended}
          className={clsx('text-lg w-full', previewClassName)}
        />
      )}
    </>
  );
};
