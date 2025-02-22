import React from 'react';
import { Link } from 'wouter';

import { Button } from '@/components/library';
import { useAppStore } from '@/state/state';
import { Menu } from './Menu';
import { useProfile } from '@/query/queryHooks';
import { routes } from '@/routes';
import { useLogout } from '@/query/mutationHooks';

export const Header: React.FC = () => {
  const showLoginWindow = useAppStore((state) => state.showLoginWindow);
  const showRegisterWindow = useAppStore((state) => state.showRegisterWindow);

  const { profile } = useProfile();

  const { logout } = useLogout();

  return (
    <header>
      <div className="grid grid-cols-3 m-0 p-2 w-full">
        <h2 className="flex justify-start items-center text-lg md:text-2xl font-bold mx-2">
          <Link to="/">RecAll</Link>
        </h2>
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
                  Profile
                </Button>
              </Link>
              <Button
                className="font-medium px-2 md:px-4 full"
                variant="plate-red"
                onClick={() => logout()}
                withShadow
                shadowBoxClassName="hidden md:block my-1 mx-2 w-full md:w-fit"
              >
                Log out
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
                Log in
              </Button>
              <Button
                className="font-medium px-2 md:px-4 full"
                variant="plate-blue"
                onClick={showRegisterWindow}
                withShadow
                shadowBoxClassName="hidden md:block my-1 mx-2 w-full md:w-fit"
              >
                Register
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
