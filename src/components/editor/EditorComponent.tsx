import React, { HTMLAttributes, useMemo, useState } from 'react';
import { extendedMdRenderer } from './markdown-it-plugged-parser';
import clsx from 'clsx';

interface EditorComponentProps extends HTMLAttributes<React.FC> {
  initialState: string;
  active?: boolean;
}

export const EditorComponent: React.FC<EditorComponentProps> = ({
  initialState,
  active,
}) => {
  const [editorState, setEditorState] = useState(initialState);
  const [focusDownFlag, setFocusDownFlag] = useState(false);
  const renderedContent = useMemo(
    () => extendedMdRenderer.render(editorState),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [focusDownFlag]
  );
  return (
    <>
      {active ? (
        <textarea
          className={clsx(
            'bg-1-3 focus:bg-1-2',
            'p-1 md:p-2',
            'w-full h-full',
            'resize-none text-md'
          )}
          onBlur={() => setFocusDownFlag((f) => !f)}
          onChange={(e) => setEditorState(e.target.value)}
          value={editorState}
          onKeyDown={(e) => {
            if (e.key === 'Tab') {
              e.preventDefault();
              // TODO: Добавить замену таба двумя пробелами
            }
          }}
        />
      ) : (
        <div
          className="text-lg p-1 md:p-4 w-full markdown"
          dangerouslySetInnerHTML={{
            __html: renderedContent,
          }}
        ></div>
      )}
    </>
  );
};
