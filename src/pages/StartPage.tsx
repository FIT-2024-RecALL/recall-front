import React from 'react';
import { Link } from 'wouter';

import { routes } from '@/routes';
import { useAppStore } from '@/state';
import { Button } from '@/components/library';

export const StartPage: React.FC = () => {
  const showLoginWindow = useAppStore((state) => state.showLoginWindow);

  return (
    <div className="vstack m-2 md:m-10 p-2 md:p-5 text-o-black rounded-md">
      <h1 className="text-4xl text-center my-6 font-bold">
        Here{"'"}s so simple to recall anything
      </h1>
      <h2 className="text-4xl text-center my-4 font-bold">
        Create collections by any topic, add cards with text, photos, audios or
        videos and train them
      </h2>
      <div className="w-full center vstack">
        <Button
          variant="plate"
          className="font-bold text-3xl p-8 m-2 rounded-3xl"
          onClick={showLoginWindow}
        >
          Join
        </Button>
      </div>
    </div>
  );
};
