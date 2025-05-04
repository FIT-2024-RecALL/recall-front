import React, { HTMLAttributes, useEffect, useMemo, useRef } from 'react';
import {
  simpleRenderer,
  extendedMdRenderer,
} from './markdown-it-plugged-parser';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

export interface MarkdownRendererProps extends HTMLAttributes<React.FC> {
  rawText: string;
  extended?: boolean;
}

export const MarkdownRenderComponent: React.FC<MarkdownRendererProps> = ({
  rawText,
  extended,
  className,
}) => {
  const renderer = useMemo(
    () => (extended ? extendedMdRenderer : simpleRenderer),
    [extended]
  );
  const ref = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (!ref.current) return;
    const sources = ref.current.querySelectorAll('source');
    sources.forEach((source) => {
      source.addEventListener(
        'error',
        function () {
          if (!this.parentElement?.parentElement) return;
          const pElem = this.parentElement?.parentElement;
          pElem.textContent = t('editor.mediaError');
          pElem.className = clsx('w-full text-lg font-medium text-red-600');
        },
        true
      );
    });
  }, [ref, t]);

  return (
    <div
      ref={ref}
      className={clsx('markdown full', className)}
      dangerouslySetInnerHTML={{
        __html: renderer.render(rawText),
      }}
    ></div>
  );
};
