import markdownit, { PluginSimple } from 'markdown-it';

import highligher from 'highlight.js';

import markdownItMedia from '@gotfeedback/markdown-it-media';

import katex from 'katex';
import { tex } from '@mdit/plugin-tex';

export const extendedMdRenderer = markdownit({
  linkify: true,
  typographer: true,
  highlight: (str, lang, attrs) => {
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
  .use(markdownItMedia, {
    controls: true,
  })
  .use(tex, {
    render: (content, mode) => {
      const texStr = katex.renderToString(content, {
        output: 'mathml',
        throwOnError: false,
      });
      return !mode ? texStr : `<p>${texStr}</p>`;
    },
  });
