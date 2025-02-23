import React from 'react';
import { Link } from 'wouter';

import { useAppStore } from '@/state';
import { Button } from '@/components/library';
import { useProfile } from '@/query/queryHooks';
import { routes } from '@/routes';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

export const StartPage: React.FC = () => {
  const { profile } = useProfile();
  const showLoginWindow = useAppStore((state) => state.showLoginWindow);
  const { t } = useTranslation();

  return (
    <div className="vstack m-2 md:m-10 p-2 md:p-5 text-o-black rounded-md">
      <div className="w-full center vstack">
        {!profile ? (
          <>
            <h1 className="text-2xl md:text-4xl text-center my-6 font-bold">
              {t('startPage.title')}
            </h1>
            <h2 className="text-md md:text-2xl text-center my-4 font-medium md:font-bold">
              {t('startPage.p1')}
            </h2>
            <Button
              variant="plate-green"
              className={clsx(
                'font-bold text-xl md:text-2xl',
                'w-full rounded-3xl',
                'px-1 py-1 md:py-2'
              )}
              onClick={showLoginWindow}
              withShadow
              shadowBoxClassName="my-2 md:my-4 w-fit"
            >
              {t('startPage.join')}
            </Button>
          </>
        ) : (
          <>
            <h1 className="text-2xl md:text-4xl text-center my-6 font-bold">
              {t('startPage.hello')}, {profile.nickname}!
            </h1>
            <div className="text-md md:text-2xl center my-4 font-medium">
              <Link to={routes.profile.getUrl()} className="w-fit mx-2 center">
                <Button
                  variant="plate-yellow"
                  className="p-2 md:p-4"
                  withShadow
                >
                  {t('common.profile')}
                </Button>
              </Link>
              <Link to={routes.collections.getUrl()} className="mx-2 center">
                <Button variant="plate-green" className="p-2 md:p-4" withShadow>
                  {t('common.collections')}
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
