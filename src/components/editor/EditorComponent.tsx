import React, { HTMLAttributes, useState } from 'react';
import markdownit from 'markdown-it';
import markdownItMedia from '@gotfeedback/markdown-it-media';

interface EditorComponentProps extends HTMLAttributes<React.FC> {
  initialState: string;
  active?: boolean;
}

const extendedMdRenderer = markdownit({
  linkify: true,
  breaks: true,
  typographer: true,
}).use(markdownItMedia, {
  controls: true,
});

export const EditorComponent: React.FC<EditorComponentProps> = ({
  initialState,
  active
}) => {
  const [editorState, setEditorState] = useState(initialState);
  return (
    <>
      {active ? (
        <textarea
          className="bg-1-3 focus:bg-1-2 w-full h-full text-md p-1 md:p-2 resize-none"
          onChange={(e) => setEditorState(e.target.value)}
        >
          {editorState}
        </textarea>
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
