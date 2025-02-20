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
        <h2 className="flex justify-start items-center text-lg md:text-2xl text-1-1 font-bold mx-2">
          <Link to="/">RecAll</Link>
        </h2>
        <Menu />
        <div className="flex justify-center md:justify-end w-full">
          {profile ? (
            <>
              <Link
                to={routes.profile.getUrl()}
                className="my-1 mx-2 p-0 center font-medium w-full md:w-fit"
              >
                <Button className="w-full md:w-fit" variant="bordered-trans">
                  Profile
                </Button>
              </Link>
              <div className="hidden md:block">
                <Button
                  variant="bordered-trans"
                  className="p-1 my-1 mx-2 font-medium md:text-md"
                  onClick={() => logout()}
                >
                  Log out
                </Button>
              </div>
            </>
          ) : (
            <>
              <Button
                variant="bordered-trans"
                className="p-1 my-1 mx-2 font-medium text-md w-full md:w-fit"
                onClick={showLoginWindow}
              >
                Log in
              </Button>
              <div className="hidden md:block">
                <Button
                  variant="bordered-trans"
                  className="p-1 my-1 mx-2 font-medium md:text-md"
                  onClick={showRegisterWindow}
                >
                  Register
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
