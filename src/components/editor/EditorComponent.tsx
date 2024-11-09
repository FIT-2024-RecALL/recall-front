import React, { HTMLAttributes, useMemo, useState } from 'react';
import {
  simpleRenderer,
  extendedMdRenderer,
} from './markdown-it-plugged-parser';
import clsx from 'clsx';

interface EditorComponentProps extends HTMLAttributes<React.FC> {
  state: string;
  setState: (newState: string) => void;
  active?: boolean;
  extended?: boolean;
}

export const EditorComponent: React.FC<EditorComponentProps> = ({
  state,
  setState,
  active,
  extended,
}) => {
  const renderer = useMemo(
    () => (extended ? extendedMdRenderer : simpleRenderer),
    [extended]
  );
  return (
    <>
      {active ? (
        <textarea
          className={clsx(
            'bg-1-2 focus:bg-1-3',
            'p-1 md:p-2',
            'w-full h-full',
            'resize-none text-md',
            'rounded'
          )}
          onChange={(e) => setState(e.target.value)}
          value={state}
          onKeyDown={(e) => {
            if (e.key === 'Tab') {
              e.preventDefault();
              // TODO: Добавить замену таба двумя пробелами
            }
          }}
        />
      ) : (
        <div
          className="text-lg w-full markdown overflow-auto"
          dangerouslySetInnerHTML={{
            __html: renderer.render(state),
          }}
        ></div>
      )}
    </>
  );
};
