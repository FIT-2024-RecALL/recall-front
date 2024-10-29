import clsx from 'clsx';
import React, { HTMLAttributes, useMemo, useState } from 'react';
import { createEditor, BaseEditor, Descendant } from 'slate';
import { withReact, Slate, Editable, ReactEditor } from 'slate-react';

import { PopUp } from '@/components/library/PopUp';
import { Icon } from '@/components/library/Icon';
import { Button } from '@/components/library/Button';
import { CardType } from '@/state/slices/CollectionsState';

import { CardSide } from './CardSide';

interface FlippingCardProps extends HTMLAttributes<React.FC> {
  isShown: boolean;
  close: () => void;
  mode: 'train' | 'edit';
  cardData: CardType;
}

export const FlippingCard: React.FC<FlippingCardProps> = ({
  isShown,
  close,
  mode,
  cardData,
}) => {
  const [flipped, setFlipped] = useState(false);
  const [frontEditor] = useState(() => withReact(createEditor()));
  const [frontValue, setFrontValue] = useState(cardData.frontSide);
  const [backEditor] = useState(() => withReact(createEditor()));
  const [backValue, setBackValue] = useState(cardData.backSide);

  return (
    <PopUp
      isShown={isShown}
      close={close}
      className="vstack center bg-1-5/50 backdrop-blur-sm"
    >
      <div
        className={clsx(
          'm-2 w-11/12 lg:w-3/4 h-3/4 md:h-2/3',
          'bg-gradient-to-r from-1-3 to-1-2 rounded-3xl',
          'border border-2 border-black',
          'flex items-center',
          'text-white',
          'transition-all duration-500 flip-inner',
          flipped && 'animate-flip'
        )}
      >
        <CardSide side="front">
          <h2 className="mb-2 text-2xl font-bold">Side 1</h2>
          <div className="text-lg w-full">
            <Slate
              editor={frontEditor}
              initialValue={frontValue}
              onChange={(value) => {
                const isAstChange = frontEditor.operations.some(
                  (op) => 'set_selection' !== op.type
                );
                console.log(frontEditor.operations);
                if (isAstChange) {
                  console.log(value);
                  setFrontValue(value);
                }
              }}
            >
              <Editable className="p-1 md:p-2 bg-1-2 focus:bg-1-1" />
            </Slate>
          </div>
        </CardSide>
        <CardSide side="back">
          <h2 className="mb-2 text-2xl font-bold">Side 2</h2>
          <div className="text-lg w-full">
            <Slate
              editor={backEditor}
              initialValue={backValue}
              onChange={(value) => {
                const isAstChange = backEditor.operations.some(
                  (op) => 'set_selection' !== op.type
                );
                if (isAstChange) {
                  console.log(value);
                  setBackValue(value);
                }
              }}
            >
              <Editable className="p-1 md:p-2 bg-1-2 focus:bg-1-1" />
            </Slate>
          </div>
        </CardSide>
        <div
          className={clsx(
            'absolute bottom-0',
            'flex justify-end',
            'w-full p-2',
            'transition-all',
            'hover:cursor-pointer hover:bg-1-8/10'
          )}
          onClick={() => setFlipped((f) => !f)}
        >
          <Icon icon="arrowRight" className="w-7 h-7 md:w-10 md:h-10" />
        </div>
      </div>
      {mode == 'edit' && (
        <div className="m-2 center vstack">
          <Button className="text-xl" variant="bordered">
            Save
          </Button>
        </div>
      )}
      {mode == 'train' && (
        <div
          className={clsx(
            'm-6 center vstack w-1/2',
            'transition-all duration-500 flip-inner',
            flipped && 'animate-flip'
          )}
        >
          <Button
            className="flip-front"
            variant="bordered"
            onClick={() => setFlipped(!flipped)}
          >
            <span>Flip card</span>
            <Icon icon="arrowRight" className="ml-1 w-7 h-7" />
          </Button>
          <div className="around flip-back">
            <Button className="m-1" variant="bordered">
              1
            </Button>
            <Button className="m-1" variant="bordered">
              2
            </Button>
            <Button className="m-1" variant="bordered">
              3
            </Button>
            <Button className="m-1" variant="bordered">
              4
            </Button>
            <Button className="m-1" variant="bordered">
              5
            </Button>
          </div>
        </div>
      )}
    </PopUp>
  );
};
