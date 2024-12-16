import React from 'react';

import { useAppStore } from '@/state';
import { Button } from '@/components/library';
import { useProfile } from '@/query/queryHooks';
import { Link } from 'wouter';
import { routes } from '@/routes';

export const StartPage: React.FC = () => {
  const { profile } = useProfile();
  const showLoginWindow = useAppStore((state) => state.showLoginWindow);

  return (
    <div className="vstack m-2 md:m-10 p-2 md:p-5 text-o-black rounded-md">
      <div className="w-full center vstack">
        {!profile ? (
          <>
            <h1 className="text-4xl text-center my-6 font-bold">
              Here{"'"}s so simple to recall anything
            </h1>
            <h2 className="text-2xl text-center my-4 font-bold">
              Create collections by any topic, add cards with text, photos,
              audios or videos and train them
            </h2>
            <Button
              variant="plate"
              className="font-bold text-3xl p-8 m-2 rounded-3xl"
              onClick={showLoginWindow}
            >
              Join
            </Button>
          </>
        ) : (
          <>
            <h1 className="text-2xl md:text-4xl text-center my-6 font-bold">
              Hello, {profile.nickname}!
            </h1>
            <div className="text-lg md:text-2xl center my-4 font-bold">
              <Link
                to={routes.collections.getUrl()}
                className="w-fit mx-2 center"
              >
                <Button variant="plate" className="p-4 md:p-8">
                  Go to collections
                </Button>
              </Link>
              <Link to="/profile" className="w-fit mx-2 center">
                <Button variant="plate" className="p-4 md:p-8">
                  Go to profile
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
