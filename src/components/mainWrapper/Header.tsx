import React, { useEffect, useState } from 'react';
import { Link } from 'wouter';

import { Button } from '@/components/library/Button';
import { useAppStore } from '@/state/state';
import { Menu } from './Menu';
import { logoutUserUserLogoutPost } from '@/api';
import { useProfile, dataExtractionWrapper } from '@/query';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const Header: React.FC = () => {
  const showLoginWindow = useAppStore((state) => state.showLoginWindow);
  const showRegisterWindow = useAppStore((state) => state.showRegisterWindow);

  const { profile } = useProfile();

  const client = useQueryClient();
  const { mutate: logout, error: logoutError } = useMutation({
    mutationFn: () => dataExtractionWrapper(logoutUserUserLogoutPost()),
    onSuccess: () => client.resetQueries({ queryKey: ['profile'] }),
  });

  return (
    <header>
      <div className="flex justify-between m-0 p-2 bg-transparent w-full transition-all">
        <h2 className="text-lg md:text-2xl text-1-1 font-bold mx-2 center">
          <Link to="/">RecAll</Link>
        </h2>
        <Menu />
        <div className="center">
          {profile ? (
            <>
              <Link to="/profile" className="my-1 mx-2 p-0 center font-bold">
                <Button variant="inline">{profile.nickname}</Button>
              </Link>
              <Button
                variant="bordered-trans"
                className="p-1 my-1 mx-2"
                onClick={() => logout()}
              >
                Log out
              </Button>
              {logoutError && (
                <span>Failed to logout: {logoutError.message}</span>
              )}
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
