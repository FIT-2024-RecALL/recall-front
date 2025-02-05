export type EditorElementState = {
  selectionStart: number;
  selectionEnd: number;
  prevPart: string;
  midPart: string;
  nextPart: string;
};

export type MutationsEnum = 'bold' | 'italic' | 'code' | 'quote';
export type Mutations = Record<MutationsEnum, EditorStateMutator>;
export const mutations: Mutations = {
  bold: ({ prevPart, midPart, nextPart }) =>
    `${prevPart}**${midPart}**${nextPart}`,
  italic: ({ prevPart, midPart, nextPart }) =>
    `${prevPart}*${midPart}*${nextPart}`,
  quote: ({ prevPart, midPart, nextPart }) =>
    `${prevPart}\n> ${midPart}\n${nextPart}`,
  code: ({ prevPart, midPart, nextPart }) =>
    `${prevPart}\n\`\`\`\n${midPart}\n\`\`\`\n${nextPart}`,
};

export type EditorStateMutator = (editorState: EditorElementState) => string;
export type EditorMutatorWrapper = (mutate: EditorStateMutator) => void;
