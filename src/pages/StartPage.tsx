import React from 'react';
import { Link } from 'wouter';

import { useAppStore } from '@/state';
import { Button } from '@/components/library';
import { useProfile } from '@/query/queryHooks';
import { routes } from '@/routes';
import clsx from 'clsx';

export const StartPage: React.FC = () => {
  const { profile } = useProfile();
  const showLoginWindow = useAppStore((state) => state.showLoginWindow);

  return (
    <div className="vstack m-2 md:m-10 p-2 md:p-5 text-o-black rounded-md">
      <div className="w-full center vstack">
        {!profile ? (
          <>
            <h1 className="text-2xl md:text-4xl text-center my-6 font-bold">
              RecAll anything easy!
            </h1>
            <h2 className="text-md md:text-2xl text-center my-4 font-medium md:font-bold">
              Create collections by any topic, add cards with text, photos,
              audios or videos and train them
            </h2>
            <Button
              variant="plate"
              className={clsx(
                'font-bold text-xl md:text-2xl',
                'w-1/2 md:w-1/4 rounded-3xl',
                'py-2 md:py-3 my-2 md:my-4'
              )}
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
            <div className="text-md md:text-2xl center my-4 font-medium">
              <Link to={routes.profile.getUrl()} className="w-fit mx-2 center">
                <Button variant="plate" className="p-2 md:p-4">
                  My profile
                </Button>
              </Link>
              <Link
                to={routes.collections.getUrl()}
                className="w-fit mx-2 center"
              >
                <Button variant="plate" className="p-2 md:p-4">
                  Collections
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
