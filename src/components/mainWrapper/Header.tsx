import React from 'react';
import { Link } from 'wouter';

import { Button } from '@/components/library';
import { useAppStore } from '@/state/state';
import { Menu } from './Menu';
import { useProfile } from '@/query/queryHooks';
import { routes } from '@/routes';
import { useLogout } from '@/query/mutationHooks';
import { useTranslation } from 'react-i18next';

import icon from '@public/favicon.ico';

export const Header: React.FC = () => {
  const { t } = useTranslation();

  const showLoginWindow = useAppStore((state) => state.showLoginWindow);
  const showRegisterWindow = useAppStore((state) => state.showRegisterWindow);

  const { profile } = useProfile();

  const { logout } = useLogout();

  return (
    <header>
      <div className="grid grid-cols-3 m-0 p-2 w-full">
        <Link
          to="/"
          className="flex justify-start items-center text-lg md:text-2xl font-bold mx-2 gap-x-1"
        >
          <img className="h-4 w-4 md:h-8 md:w-8" src={icon} alt="Icon" />
          <h2>RecAll</h2>
        </Link>
        <Menu />
        <div className="flex justify-center md:justify-end w-full">
          {profile ? (
            <>
              <Link
                to={routes.profile.getUrl()}
                className="my-1 mx-2 w-full md:w-fit"
              >
                <Button
                  className="font-medium px-2 md:px-4 full"
                  variant="plate-yellow"
                  withShadow
                  shadowBoxClassName="full"
                >
                  {t('common.profile')}
                </Button>
              </Link>
              <Button
                className="font-medium px-2 md:px-4 full"
                variant="plate-red"
                onClick={() => logout()}
                withShadow
                shadowBoxClassName="hidden md:block my-1 mx-2 w-full md:w-fit"
              >
                {t('common.logout')}
              </Button>
            </>
          ) : (
            <>
              <Button
                className="font-medium px-2 md:px-4 full"
                variant="plate-green"
                onClick={showLoginWindow}
                withShadow
                shadowBoxClassName="my-1 mx-2 w-full md:w-fit"
              >
                {t('common.login')}
              </Button>
              <Button
                className="font-medium px-2 md:px-4 full"
                variant="plate-blue"
                onClick={showRegisterWindow}
                withShadow
                shadowBoxClassName="hidden md:block my-1 mx-2 w-full md:w-fit"
              >
                {t('common.register')}
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
