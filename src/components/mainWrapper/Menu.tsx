import React, { useMemo, useState } from 'react';
import { Link } from 'wouter';
import clsx from 'clsx';

import { menuRoutes } from '@/routes';
import { Button, PopUp } from '@/components/library';
import { useProfile } from '@/query/queryHooks';
import { useLogout } from '@/query/mutationHooks';
import { useTranslation } from 'react-i18next';

export const Menu: React.FC = () => {
  const { t } = useTranslation();
  const links = menuRoutes.map((data) => (
    <Link
      to={data.url}
      className="w-fit my-1 mx-2 p-0 center font-medium md:font-bold text-sm md:text-lg"
      key={data.url}
    >
      <Button variant="inline">
        {data.label ? t(data.label) : 'NOT TRANSLATED'}
      </Button>
    </Link>
  ));

  const [mobileMenuShown, setMobileMenuShown] = useState(false);

  const { profile } = useProfile();

  const { logout } = useLogout();

  return (
    <>
      <nav className="hidden md:flex justify-around">{links}</nav>
      <nav className="md:hidden w-full">
        <Button
          variant="bordered"
          className="my-1 rounded-md w-full font-medium"
          onClick={() => setMobileMenuShown(!mobileMenuShown)}
        >
          {t('menu.menu')}
        </Button>
        <PopUp
          isShown={mobileMenuShown}
          close={() => setMobileMenuShown(false)}
          className="center backdrop-blur-[2px]"
        >
          <div
            className={clsx(
              'absolute top-16',
              'w-1/2 vstack center',
              'p-2 bg-o-white',
              'border-2 border-o-black',
              'rounded-xl shadow-md'
            )}
            onClick={(e) => {
              if (e.target !== e.currentTarget) setMobileMenuShown(false);
            }}
          >
            {links}
            {profile && (
              <Button
                variant="inline"
                className="my-1 mx-2 p-0 center font-medium md:font-bold text-sm md:text-lg"
                onClick={() => logout()}
              >
                {t('common.logout')}
              </Button>
            )}
          </div>
        </PopUp>
      </nav>
    </>
  );
};
