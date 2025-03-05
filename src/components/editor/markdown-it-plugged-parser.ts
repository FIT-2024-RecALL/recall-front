import markdownit from 'markdown-it';

import highligher from 'highlight.js';

import markdownItMedia from '@gotfeedback/markdown-it-media';

import { katex } from '@mdit/plugin-katex';

export const simpleRenderer = markdownit({
  linkify: true,
  typographer: true,
  langPrefix: 'language-',
  highlight: (str, lang) => {
    if (highligher.getLanguage(lang)) {
      try {
        return highligher.highlight(str, { language: lang }).value;
      } catch (_) {
        /* empty */
      }
    }
    return '';
  },
})
  .use(katex)
  .disable('image');

export const extendedMdRenderer = markdownit({ ...simpleRenderer.options })
  .use(markdownItMedia, {
    controls: true,
  })
  .use(katex);
