import { BaseEditor } from 'slate';
import { ReactEditor, RenderElementProps } from 'slate-react';

export type EditorText = { text: string };

export type EditorParagraph = { type: 'paragraph'; children: EditorText[] };
export interface EditorCode {
  type: 'code';
  lang: 'js';
  children: EditorText[];
}

export type EditorElements = EditorParagraph | EditorCode;
export type EditorTypes = EditorElements['type'];

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: EditorElements;
    Text: EditorText;
  }
}

export interface GenericRenderElementProps<T extends EditorElements>
  extends RenderElementProps {
  element: T;
}

export type EditorElementFC<T extends EditorElements> = (
  props: GenericRenderElementProps<T>
) => JSX.Element;
