import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { useTranslation } from 'react-i18next';

import { menuRoutes } from '@/routes';
import { Button } from '@/components/library';
import { useProfile } from '@/query/queryHooks';
import { useLogout } from '@/query/mutationHooks';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuGroup,
} from '@/components/ui';

export const Menu: React.FC = () => {
  const { t } = useTranslation();
  const [, setLocation] = useLocation();
  const links = menuRoutes.map((data) => (
    <Button
      variant="inline"
      className="w-full md:w-fit md:my-1 md:mx-2 center font-medium md:font-bold text-sm md:text-lg"
      key={data.url}
      onClick={() => setLocation(data.url)}
    >
      {data.label ? t(data.label) : 'NOT TRANSLATED'}
    </Button>
  ));

  const [mobileMenuShown, setMobileMenuShown] = useState(false);

  const { profile } = useProfile();

  const { logout } = useLogout();

  return (
    <>
      <nav className="hidden md:flex justify-around">{links}</nav>
      <DropdownMenu>
        <DropdownMenuTrigger className="my-1 md:hidden w-full">
          <Button
            variant="bordered"
            className="rounded-md w-full font-medium"
            onClick={() => setMobileMenuShown(!mobileMenuShown)}
          >
            {t('menu.menu')}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-o-white ring-1">
          <DropdownMenuGroup>
            {links.map((link, i) => (
              <DropdownMenuItem className="p-0" key={i}>
                {link}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
          {profile && (
            <DropdownMenuItem className="p-0">
              <Button
                variant="inline"
                className="w-full p-0 center font-medium md:font-bold text-sm md:text-lg"
                onClick={() => logout()}
              >
                {t('common.logout')}
              </Button>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
