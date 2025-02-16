import clsx from 'clsx';
import React, { HTMLAttributes } from 'react';

import { PopUp, Button, Icon } from '@/components/library';
import { FlippingCard } from './visuals';
import {
  CreateCardControls,
  EditCardControls,
  TrainCardControls,
} from './controls';
import { useAppStore } from '@/state';

type ZoomedCardProps = HTMLAttributes<React.FC>;

export const ZoomedCard: React.FC<ZoomedCardProps> = () => {
  const zoomed = useAppStore((state) => state.activeCardUI.zoomed);
  const setCardUIFlag = useAppStore((state) => state.setActiveCardUIFlag);
  const mode = useAppStore((state) => state.activeCardUI.mode);
  const isNew = useAppStore((state) => state.isNewActiveCard);

  return (
    <PopUp
      isShown={zoomed}
      close={() => setCardUIFlag('zoomed', () => false)}
      showCloseBtn
      className={clsx(
        'center py-2',
        'bg-o-white/50 backdrop-blur-md',
        'overflow-y-scroll md:overflow-y-hidden overflow-x-hidden'
      )}
    >
      <div className={clsx('w-11/12 lg:w-3/4 h-11/12 lg:h-5/6')}>
        <FlippingCard
          className={clsx(
            'mb-1 md:mb-2 w-full h-5/6',
            'bg-1-1 rounded-xl',
            'border border-2 border-black',
            'text-white'
          )}
        />
        {mode === 'edit' && isNew && <CreateCardControls />}
        {mode === 'edit' && !isNew && <EditCardControls />}
        {mode === 'train' && <TrainCardControls />}
      </div>
    </PopUp>
  );
};
