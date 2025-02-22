import React from 'react';
import { DescreteTrainButton, marks } from './DescreteTrainButton';
import clsx from 'clsx';
import { AIFeedback } from '@/api';

export type TrainContraolsBacksideProps = {
  aiFeedBack?: AIFeedback;
};

export const TrainContraolsBacksideContent: React.FC<
  TrainContraolsBacksideProps
> = ({ aiFeedBack }) => {
  return (
    <>
      {aiFeedBack && (
        <span
          className={clsx(
            'p-2 mb-1',
            'bg-1-2 text-white',
            'rounded-xl border-2 border-black'
          )}
        >
          {aiFeedBack.comment}
        </span>
      )}
      <div className="center">
        {marks.map((mark) => (
          <DescreteTrainButton
            key={mark}
            mark={mark}
            recommended={mark === aiFeedBack?.mark}
          />
        ))}
      </div>
    </>
  );
};
