export type EditorElementState = {
  selectionStart: number;
  selectionEnd: number;
  prevPart: string;
  midPart: string;
  nextPart: string;
};

export type MutationsEnum = 'bold' | 'italic' | 'code' | 'quote' | 'ul' | 'ol';
export type Mutations = Record<MutationsEnum, EditorStateMutator>;
export const mutations: Mutations = {
  bold: ({ prevPart, midPart, nextPart }) =>
    `${prevPart}**${midPart}**${nextPart}`,
  italic: ({ prevPart, midPart, nextPart }) =>
    `${prevPart}*${midPart}*${nextPart}`,
  quote: ({ prevPart, midPart, nextPart }) => {
    const lastPrevPartNewline = prevPart.lastIndexOf('\n');
    return (
      (lastPrevPartNewline < 0
        ? '> ' + prevPart
        : prevPart.slice(0, lastPrevPartNewline) +
          '\n> ' +
          prevPart.slice(lastPrevPartNewline + 1)) +
      midPart.replaceAll('\n', '\n> ') +
      nextPart
    );
  },
  code: ({ prevPart, midPart, nextPart }) => {
    const lastPrevPartNewline = prevPart.lastIndexOf('\n');
    return (
      (lastPrevPartNewline < 0
        ? '```\n' + prevPart
        : prevPart.slice(0, lastPrevPartNewline) +
          '\n```\n' +
          prevPart.slice(lastPrevPartNewline + 1)) +
      midPart +
      (nextPart.includes('\n')
        ? nextPart.replace('\n', '\n```\n')
        : nextPart + '\n```')
    );
  },
  ul: ({ prevPart, midPart, nextPart }) => {
    const lastPrevPartNewline = prevPart.lastIndexOf('\n');
    return (
      (lastPrevPartNewline < 0
        ? '- ' + prevPart
        : prevPart.slice(0, lastPrevPartNewline) +
          '\n- ' +
          prevPart.slice(lastPrevPartNewline + 1)) +
      midPart.replaceAll('\n', '\n- ') +
      nextPart
    );
  },
  ol: ({ prevPart, midPart, nextPart }) => {
    const lastPrevPartNewline = prevPart.lastIndexOf('\n');
    return (
      (lastPrevPartNewline < 0
        ? '1. ' + prevPart
        : prevPart.slice(0, lastPrevPartNewline) +
          '\n1. ' +
          prevPart.slice(lastPrevPartNewline + 1)) +
      midPart.replaceAll('\n', '\n1. ') +
      nextPart
    );
  },
};

export type EditorStateMutator = (editorState: EditorElementState) => string;
export type EditorMutatorWrapper = (mutate: EditorStateMutator) => void;
