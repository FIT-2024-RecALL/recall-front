import React, { HTMLAttributes, useState } from 'react';
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
          onChange={(e) => setEditorState(e.target.value)}
          value={editorState}
          onKeyDown={(e) => {
            if (e.key === 'Tab') {
              e.preventDefault();
              // TODO: Добавить замену таба двумя пробелами
            };
          }}
          // onDragOver={(e) => {
          //   e.preventDefault();
          //   console.log(e);
          // }}
          onDrop={(e) => {
            e.preventDefault();
            const file = Array.from(e.dataTransfer.files)[0];
            console.log(file);
          }}
        />
      ) : (
        <div
          className="text-lg p-1 md:p-4 w-full markdown"
          dangerouslySetInnerHTML={{
            __html: extendedMdRenderer.render(editorState),
          }}
        ></div>
      )}
    </>
  );
};
