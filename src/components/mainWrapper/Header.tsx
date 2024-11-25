import React, { useEffect, useState } from 'react';
import { Link } from 'wouter';

import { Button } from '@/components/library/Button';
import { useAppStore } from '@/state/state';
import { Menu } from './Menu';
import { logoutUserUsersLogoutPost, readCurrentUserUsersProfileGet } from '@/api';

export const Header: React.FC = () => {
  const showLoginWindow = useAppStore((state) => state.showLoginWindow);
  const showRegisterWindow = useAppStore((state) => state.showRegisterWindow);
  const [user, setUser] = useState<string>();

  useEffect(() => {
    readCurrentUserUsersProfileGet().then((data) => {
      if (data.response.ok) setUser(data.data?.nickname);
    }); // TODO: Разумеется, это надо будет переделать
  }, []);

  return (
    <header>
      <div className="flex justify-between m-0 p-2 bg-transparent w-full transition-all">
        <h2 className="text-lg md:text-2xl text-1-1 font-bold mx-2 center">
          <Link to="/">RecAll</Link>
        </h2>
        <Menu />
        <div className="center">
          {user ? (
            <>
              <Link to="/profile" className="my-1 mx-2 p-0 center font-bold">
                <Button variant="inline">{user}</Button>
              </Link>
              <Button
                variant="bordered-trans"
                className="p-1 my-1 mx-2"
                onClick={() => {
                  logoutUserUsersLogoutPost().then((data) => {
                    console.log(data);
                  });
                }}
              >
                Log out
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="bordered-trans"
                className="p-1 my-1 mx-2"
                onClick={showLoginWindow}
              >
                Log in
              </Button>
              <div className="hidden md:block">
                <Button
                  variant="plate"
                  className="p-1 my-1 mx-2"
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
