import clsx from 'clsx';
import React, { HTMLAttributes } from 'react';

import { ControlledModal } from '@/components/library';
import { FlippingCard } from './visuals';
import {
  CreateCardControls,
  EditCardControls,
  TrainCardControls,
} from './controls';
import { useAppStore } from '@/state';
import { useTranslation } from 'react-i18next';

type ZoomedCardProps = HTMLAttributes<React.FC>;

export const ZoomedCard: React.FC<ZoomedCardProps> = () => {
  const { t } = useTranslation();

  const zoomed = useAppStore((state) => state.activeCardUI.zoomed);
  const setCardUIFlag = useAppStore((state) => state.setActiveCardUIFlag);
  const mode = useAppStore((state) => state.activeCardUI.mode);
  const isNew = useAppStore((state) => state.isNewActiveCard);
  const isChanged = useAppStore((state) => state.isActiveCardChanged);

  return (
    <ControlledModal
      isShown={zoomed}
      close={() => {
        if (mode === 'edit' && isChanged) {
          if (confirm(t('card.confirmClose')))
            setCardUIFlag('zoomed', () => false);
        } else setCardUIFlag('zoomed', () => false);
      }}
      contentClassName={clsx('w-11/12', mode !== 'view' ? 'h-11/12' : 'h-5/6')}
    >
      <FlippingCard
        className={clsx(
          'mb-1 md:mb-2 w-full',
          mode !== 'view' ? 'h-5/6' : 'h-full',
          'bg-o-white text-o-black rounded-xl',
          'border-2 border-black'
        )}
      />
      {mode === 'edit' && isNew && <CreateCardControls />}
      {mode === 'edit' && !isNew && <EditCardControls />}
      {mode === 'train' && <TrainCardControls />}
    </ControlledModal>
  );
};
