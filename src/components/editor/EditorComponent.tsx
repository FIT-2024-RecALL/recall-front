import React, { HTMLAttributes, useMemo, useState } from 'react';
import {
  simpleRenderer,
  extendedMdRenderer,
} from './markdown-it-plugged-parser';
import clsx from 'clsx';
import { UploadDropdown } from './UploadDropdown';
import { Button } from '../library/Button';
import { Icon } from '../library/Icon';
import { EditorControls } from './EditorControls';

interface EditorComponentProps extends HTMLAttributes<React.FC> {
  state: string;
  setState: (newState: string) => void;
  extended?: boolean;
  placeholder?: string;
}

export const EditorComponent: React.FC<EditorComponentProps> = ({
  state,
  setState,
  extended,
  placeholder,
}) => {
  const [active, setActive] = useState(true);
  const renderer = useMemo(
    () => (extended ? extendedMdRenderer : simpleRenderer),
    [extended]
  );

  return (
    <>
      <EditorControls
        isExtended={extended}
        isActive={active}
        switchActive={() => setActive((a) => !a)}
      />
      {active ? (
        <div className="w-full h-full">
          <textarea
            className={clsx(
              'bg-1-2 focus:bg-1-3',
              'p-1 md:p-2',
              'w-full h-full',
              'resize-none text-md',
              'rounded'
            )}
            placeholder={placeholder}
            value={state}
            onChange={(e) => setState(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Tab') {
                e.preventDefault();
                // TODO: Добавить замену таба двумя пробелами
              }
            }}
          />
        </div>
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
