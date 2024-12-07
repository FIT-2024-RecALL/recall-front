import React, { HTMLAttributes, useMemo, useState } from 'react';
import {
  simpleRenderer,
  extendedMdRenderer,
} from './markdown-it-plugged-parser';
import clsx from 'clsx';

export interface MdRendererProps extends HTMLAttributes<React.FC> {
  rawText: string;
  extended?: boolean;
}

export const MdRenderComponent: React.FC<MdRendererProps> = ({
  rawText,
  extended,
  className,
}) => {
  const renderer = useMemo(
    () => (extended ? extendedMdRenderer : simpleRenderer),
    [extended]
  );

  return (
    <div
      className={clsx('markdown', className)}
      dangerouslySetInnerHTML={{
        __html: renderer.render(rawText),
      }}
    ></div>
  );
};