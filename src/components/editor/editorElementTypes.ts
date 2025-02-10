export type EditorElementState = {
  selectionStart: number;
  selectionEnd: number;
  str: string;
};

const getSelectionSplittedStr = (state: EditorElementState) => ({
  prevPart: state.str.slice(0, state.selectionStart),
  midPart: state.str.slice(state.selectionStart, state.selectionEnd),
  nextPart: state.str.slice(state.selectionEnd),
});
const getCursorSplittedStr = (state: EditorElementState) => ({
  prevPart: state.str.slice(0, state.selectionEnd),
  nextPart: state.str.slice(state.selectionEnd),
});

export type EditorStateMutator = (
  editorState: EditorElementState,
  payload?: string
) => string;

const getCursorPositionFillerMutation = (fillStr: string) => {
  return (state: EditorElementState) => {
    const { prevPart, nextPart } = getCursorSplittedStr(state);
    return `${prevPart}${fillStr}${nextPart}`;
  };
};
const getSelectionBordersFillerMutation = (
  fillStr1: string,
  fillStr2?: string
) => {
  return (state: EditorElementState) => {
    const { prevPart, midPart, nextPart } = getSelectionSplittedStr(state);
    return `${prevPart}${fillStr1}${midPart}${
      fillStr2 ? fillStr2 : fillStr1
    }${nextPart}`;
  };
};
const getEverySelectedLineStartMutation = (prefixStr: string) => {
  return (state: EditorElementState) => {
    const { prevPart, midPart, nextPart } = getSelectionSplittedStr(state);
    const lastPrevPartNewline = prevPart.lastIndexOf('\n');
    return (
      (lastPrevPartNewline < 0
        ? prefixStr + prevPart
        : prevPart.slice(0, lastPrevPartNewline) +
          '\n' +
          prefixStr +
          prevPart.slice(lastPrevPartNewline + 1)) +
      midPart.replaceAll('\n', '\n' + prefixStr) +
      nextPart
    );
  };
};
const getSelectedBorderLinesMutation = (borderLine: string) => {
  return (state: EditorElementState) => {
    const { prevPart, midPart, nextPart } = getSelectionSplittedStr(state);
    const lastPrevPartNewline = prevPart.lastIndexOf('\n');
    return (
      (lastPrevPartNewline < 0
        ? borderLine + '\n' + prevPart
        : prevPart.slice(0, lastPrevPartNewline) +
          '\n' +
          borderLine +
          '\n' +
          prevPart.slice(lastPrevPartNewline + 1)) +
      midPart +
      (nextPart.includes('\n')
        ? nextPart.replace('\n', '\n' + borderLine + '\n')
        : nextPart + '\n' + borderLine)
    );
  };
};

export type MutationsEnum =
  | 'bold'
  | 'italic'
  | 'code'
  | 'quote'
  | 'ul'
  | 'ol'
  | 'link'
  | 'math'
  | 'media'
  | 'h1'
  | 'tab';
export type Mutations = Record<MutationsEnum, EditorStateMutator>;
export const mutations: Mutations = {
  bold: getSelectionBordersFillerMutation('**'),
  italic: getSelectionBordersFillerMutation('*'),
  quote: getEverySelectedLineStartMutation('> '),
  code: getSelectedBorderLinesMutation('```'),
  ul: getEverySelectedLineStartMutation('- '),
  ol: getEverySelectedLineStartMutation('1. '),
  link: (state, payload) => {
    const url = payload ? payload : 'url';
    return state.selectionStart !== state.selectionEnd
      ? getSelectionBordersFillerMutation('[', `](${url})`)(state)
      : getCursorPositionFillerMutation(`\n[Link label](${url})\n`)(state);
  },
  math: getSelectedBorderLinesMutation('$$'),
  media: (state, payload) => {
    const url = payload ? payload : 'media_url';
    return state.selectionStart !== state.selectionEnd
      ? getSelectionBordersFillerMutation('![', `](${url})`)(state)
      : getCursorPositionFillerMutation(`\n![Media label](${url})\n`)(state);
  },
  h1: getEverySelectedLineStartMutation('# '),
  tab: getEverySelectedLineStartMutation('  '),
};

export type EditorMutatorWrapper = (
  mutate: EditorStateMutator,
  payload?: string
) => void;
