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
        'mt-2 md:mt-6 center vstack',
        'transition-all duration-500 flip-inner',
        flipped && 'animate-flip'
      )}
    >
      <div className="flip-front w-full vstack">
        {flippedCount > 1 ? (
          <TrainContraolsBacksideContent aiFeedBack={aiFeedBack} />
        ) : (
          <>
            <div className="grid grid-cols-4 gap-x-2 mb-1">
              <textarea
                className={clsx(
                  'p-1 mb-1 col-span-4 md:col-span-3 bg-1-11',
                  'border border-1-1',
                  'focus:outline-none focus:border-2',
                  'rounded text-black'
                )}
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Type your answer"
              ></textarea>
              <div className="center col-span-4 md:col-span-1">
                <Button
                  className=""
                  variant="bordered"
                  onClick={() => compareAnswers(userAnswer)}
                >
                  {!isPending ? 'Check answer' : 'Checking answer...'}
                </Button>
              </div>
            </div>
            <div className="center">
              <Button
                className="w-1/2 md:w-1/4"
                variant="bordered"
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
