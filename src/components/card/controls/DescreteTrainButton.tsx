import React from 'react';

import { Button } from '@/components/library';
import { useAppStore } from '@/state';
import { useMutation } from '@tanstack/react-query';
import { dataExtractionWrapper } from '@/query';
import { createTrainRecordTrainRecordsCardIdPost } from '@/api';

export enum Mark {
  One = 1,
  Two,
  Three,
  Four,
  Five,
}
export const marks: Mark[] = Object.values(Mark).filter(
  (value) => typeof value === 'number'
) as Mark[];

export interface DescreteTrainButtonProps {
  mark: Mark;
}

export const DescreteTrainButton: React.FC<DescreteTrainButtonProps> = ({
  mark,
}) => {
  const cardId = useAppStore((state) => state.activeCardId);
  const executeTrainCard = useAppStore((state) => state.executeTrainCard);

  const setUIFlag = useAppStore((state) => state.setActiveCardUIFlag);

  const { mutate: trainCard } = useMutation({
    mutationFn: (data: { cardId: number; mark: number }) =>
      dataExtractionWrapper(
        createTrainRecordTrainRecordsCardIdPost({
          path: {
            card_id: data.cardId,
          },
          body: {
            mark: data.mark,
          },
        })
      ),
    onSuccess: () => {
      executeTrainCard(cardId);
      setUIFlag('zoomed', () => false);
    },
  });

  return (
    <Button
      className="m-1"
      variant="bordered"
      onClick={() => trainCard({ cardId, mark })}
    >
      {mark}
    </Button>
  );
};
