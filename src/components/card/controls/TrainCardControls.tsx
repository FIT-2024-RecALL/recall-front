import clsx from 'clsx';
import React, { useEffect, useState } from 'react';

import { Icon, Button } from '@/components/library';
import { useAppStore } from '@/state';
import { useAiCompare } from '@/query/mutationHooks';
import { TrainContraolsBacksideContent } from './TrainControlsBacksideContent';
import { AIFeedback } from '@/api';

export const TrainCardControls: React.FC = () => {
  const [flippedCount, setFlippedCount] = useState(0);
  const cardId = useAppStore((state) => state.activeCardId);
  const flipped = useAppStore((state) => state.activeCardUI.flipped);
  const setUIFlag = useAppStore((state) => state.setActiveCardUIFlag);

  useEffect(() => setFlippedCount((val) => val + 1), [flipped]);
  useEffect(() => setFlippedCount(0), []);

  const [userAnswer, setUserAnswer] = useState('');
  const [aiFeedBack, setAiFeedback] = useState<AIFeedback>();
  const { compareAnswers, isPending } = useAiCompare(cardId, (feedBack) => {
    setAiFeedback(feedBack);
    setUIFlag('flipped', () => true);
  });

  return (
    <div
      className={clsx(
        'transition-all duration-500 flip-inner',
        flipped && 'animate-flip'
      )}
    >
      <div
        className={clsx(
          'bg-o-white text-o-black rounded-xl',
          'w-full vstack',
          'border-2 border-black',
          'px-1 py-2',
          'flip-front w-full vstack'
        )}
      >
        {flippedCount > 1 ? (
          <TrainContraolsBacksideContent aiFeedBack={aiFeedBack} />
        ) : (
          <>
            <div className="grid grid-cols-4 gap-2 mb-2">
              <textarea
                className={clsx(
                  'p-1 mx-1 col-span-4 md:col-span-3',
                  'bg-transparent border-2 border-o-black',
                  'transition-all duration-200',
                  'rounded-lg text-o-black',
                  'hover:border-2 hover:border-o-green-lg',
                  'focus:outline-none',
                  'focus:border-2 focus:border-o-green-sm',
                  'resize-none'
                )}
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Type your answer"
              ></textarea>
              <div className="center col-span-4 md:col-span-1">
                <Button
                  variant="plate-green"
                  className="p-2"
                  onClick={() => compareAnswers(userAnswer)}
                >
                  {!isPending ? 'Check answer' : 'Checking answer...'}
                </Button>
              </div>
            </div>
            <div className="center">
              <Button
                className="w-1/2 md:w-1/4"
                variant="plate-yellow"
                onClick={() => setUIFlag('flipped', () => true)}
              >
                <span>Flip card</span>
                <Icon icon="arrowRight" className="ml-1 w-7 h-7" />
              </Button>
            </div>
          </>
        )}
      </div>
      <div className="flip-back w-full vstack">
        <TrainContraolsBacksideContent aiFeedBack={aiFeedBack} />
      </div>
    </div>
  );
};
