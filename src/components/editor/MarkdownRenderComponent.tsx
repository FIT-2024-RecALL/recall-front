import React, { HTMLAttributes, useEffect, useMemo, useRef } from 'react';
import {
  simpleRenderer,
  extendedMdRenderer,
} from './markdown-it-plugged-parser';
import clsx from 'clsx';

export interface MarkdownRendererProps extends HTMLAttributes<React.FC> {
  rawText: string;
  checkMedia?: boolean;
  extended?: boolean;
}

export const MarkdownRenderComponent: React.FC<MarkdownRendererProps> = ({
  rawText,
  checkMedia,
  extended,
  className,
}) => {
  const renderer = useMemo(
    () => (extended ? extendedMdRenderer : simpleRenderer),
    [extended]
  );
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log('checkMedia', checkMedia);
    if (!ref.current) return;
    const sources = ref.current.querySelectorAll('source');
    sources.forEach((source) => {
      source.addEventListener('error', function (e) {
        console.log(this.parentElement);
        if (!this.parentElement) return;
        this.parentElement.classList.add('error');
      });
    });
    // return () => {
    //   sources.forEach((source) => {
    //     source.removeEventListener('error');
    //   });
    // };
  }, [checkMedia, ref]);

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
