import React, { useState } from 'react';
import { Link } from 'wouter';
import { menuRoutes } from '@/routes';
import { Button } from '@/components/library/Button';
import { SliderCheckbox } from '../library/SliderCheckbox';
import clsx from 'clsx';
import { DropDown } from '../library/DropDown';
import { PopUp } from '../library/PopUp';
import { getProfileQueryOptions, useProfile } from '@/query/queryHooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logoutUserUserLogoutPost } from '@/api';
import { dataExtractionWrapper } from '@/query';

export const Menu: React.FC = () => {
  const links = menuRoutes.map((data) => (
    <Link
      to={data.url}
      className="w-fit my-1 mx-2 p-0 center font-bold"
      key={data.url}
    >
      <Button variant="inline">{data.label}</Button>
    </Link>
  ));

  const [mobileMenuShown, setMobileMenuShown] = useState(false);

  const { profile } = useProfile();

  const client = useQueryClient();
  const { mutate: logout, error: logoutError } = useMutation({
    mutationFn: () => dataExtractionWrapper(logoutUserUserLogoutPost()),
    onSuccess: () =>
      client.resetQueries({ queryKey: getProfileQueryOptions().queryKey }),
  });

  return (
    <>
      <nav className="hidden md:flex justify-around">{links}</nav>
      <nav className="md:hidden w-full">
        <Button
          variant="bordered-trans"
          className="my-1 rounded-md w-full font-medium"
          onClick={() => setMobileMenuShown(!mobileMenuShown)}
        >
          Menu
        </Button>
        <PopUp
          isShown={mobileMenuShown}
          close={() => setMobileMenuShown(false)}
          className="center"
        >
          <div
            className={clsx(
              'absolute top-16',
              'w-1/2 vstack center',
              'p-2 bg-o-white',
              'rounded-xl shadow'
            )}
          >
            {links}
            {profile && (
              <Button
                variant="inline"
                className="my-1 mx-2 p-0 center font-bold"
                onClick={() => logout()}
              >
                Log out
              </Button>
            )}
          </div>
        </PopUp>
      </nav>
    </>
  );
};
