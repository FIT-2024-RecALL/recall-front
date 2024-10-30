import React, { HTMLAttributes, useMemo, useState } from 'react';
import { createEditor, Descendant } from 'slate';
import { Editable, Slate, withReact } from 'slate-react';

import { renderElement } from './elementRenderers';

interface EditorComponentProps extends HTMLAttributes<React.FC> {
  initialState: Descendant[];
}

export const EditorComponent: React.FC<EditorComponentProps> = ({
  initialState,
}) => {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [editorState, setEditorState] = useState(initialState);

  return (
    <Slate
      editor={editor}
      initialValue={initialState}
      onChange={(value) => {
        const isAstChange = editor.operations.some(
          (op) => 'set_selection' !== op.type
        );
        console.log(editor.operations);
        if (isAstChange) {
          console.log(value);
          setEditorState(value);
        }
      }}
    >
      <Editable
        renderElement={renderElement}
        className="p-1 md:p-2 bg-1-2 focus:bg-1-1"
      />
    </Slate>
  );
};
