import React from 'react';
import { RenderElementProps } from 'slate-react';
import { EditorCode, EditorElementFC, EditorParagraph } from './types';

const ParagraphComponent: EditorElementFC<EditorParagraph> = (props) => {
  return <p {...props.attributes}>{props.children}</p>;
};

const CodeComponent: EditorElementFC<EditorCode> = (props) => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  );
};

export const renderElement = (props: RenderElementProps) => {
  switch (props.element.type) {
    case 'paragraph':
      return ParagraphComponent({
        ...props,
        element: props.element,
      });
    case 'code':
      return CodeComponent({ ...props, element: props.element });
  }
};
