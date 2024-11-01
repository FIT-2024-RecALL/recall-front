import React, { HTMLAttributes, useState } from 'react';
import { extendedMdRenderer } from './markdown-it-plugged-parser';

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
          className="bg-1-3 focus:bg-1-2 w-full h-full text-md p-1 md:p-2 resize-none"
          onChange={(e) => setEditorState(e.target.value)}
          value={editorState}
        />
      ) : (
        <div
          className="text-lg p-1 md:p-2"
          dangerouslySetInnerHTML={{
            __html: extendedMdRenderer.render(editorState),
          }}
        ></div>
      )}
    </>
  );
};
