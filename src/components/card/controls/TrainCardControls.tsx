import clsx from 'clsx';
import React, { useEffect, useState } from 'react';

import { Icon, Button } from '@/components/library';
import { useAppStore } from '@/state';

export const TrainCardControls: React.FC = () => {
  const cardId = useAppStore((state) => state.activeCardId);
  const executeTrainCard = useAppStore((state) => state.executeTrainCard);

  const [flippedOnce, setFlippedOnce] = useState(false);
  const flipped = useAppStore((state) => state.activeCardUI.flipped);
  const setUIFlag = useAppStore((state) => state.setActiveCardUIFlag);

  useEffect(() => setFlippedOnce(true), [flipped]);
  useEffect(() => setFlippedOnce(false), []);

  const onClikcTrainButton = () => {
    console.log('Train request to back');
    executeTrainCard(cardId);
    setUIFlag('zoomed', () => false);
  };

  return (
    <div
      className={clsx(
        'm-6 center vstack w-1/2',
        'transition-all duration-500 flip-inner',
        flipped && 'animate-flip'
      )}
    >
      {flippedOnce ? (
        <div className="around flip-front">
          <Button
            className="m-1"
            variant="bordered"
            onClick={onClikcTrainButton}
          >
            1
          </Button>
          <Button
            className="m-1"
            variant="bordered"
            onClick={onClikcTrainButton}
          >
            2
          </Button>
          <Button
            className="m-1"
            variant="bordered"
            onClick={onClikcTrainButton}
          >
            3
          </Button>
          <Button
            className="m-1"
            variant="bordered"
            onClick={onClikcTrainButton}
          >
            4
          </Button>
          <Button
            className="m-1"
            variant="bordered"
            onClick={onClikcTrainButton}
          >
            5
          </Button>
        </div>
      ) : (
        <Button
          className="flip-front"
          variant="bordered"
          onClick={() => setUIFlag('flipped', () => true)}
        >
          <span>Flip card</span>
          <Icon icon="arrowRight" className="ml-1 w-7 h-7" />
        </Button>
      )}
      <div className="around flip-back">
        <Button className="m-1" variant="bordered" onClick={onClikcTrainButton}>
          1
        </Button>
        <Button className="m-1" variant="bordered" onClick={onClikcTrainButton}>
          2
        </Button>
        <Button className="m-1" variant="bordered" onClick={onClikcTrainButton}>
          3
        </Button>
        <Button className="m-1" variant="bordered" onClick={onClikcTrainButton}>
          4
        </Button>
        <Button className="m-1" variant="bordered" onClick={onClikcTrainButton}>
          5
        </Button>
      </div>
    </div>
  );
};
