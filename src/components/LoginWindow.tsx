import React from 'react';
import { useShallow } from 'zustand/react/shallow';

import { PopUp } from '@/components/library/PopUp';
import { Button } from '@/components/library/Button';
import { useAppStore } from '@/state';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import clsx from 'clsx';

export const LoginWindow: React.FC = () => {
  const [loginWindowShown, closeLoginWindow] = useAppStore(
    useShallow((state) => [state.loginWindowShown, state.closeLoginWindow])
  );
  const [registerPartShown, toggleRegisterForm] = useAppStore(
    useShallow((state) => [state.registerFormShown, state.toggleRegisterForm])
  );

  return (
    <PopUp
      isShown={loginWindowShown}
      close={closeLoginWindow}
      className="bg-gradient-to-b from-1-6/50 to-1-1/50"
    >
      <div className="center">
        <div className="absolute top-1/4 w-3/4 m-2 md:w-1/3 h-fit p-3 border-2 border-1-1 rounded-lg bg-gradient-to-tr from-1-2 to-1-5">
          <h1 className="text-xl text-center text-2-1">Log in to RecAll</h1>
          <div className="vstack center">
            <div
              className={clsx(
                'transition-all w-full',
                registerPartShown ? 'h-0 opacity-0' : 'h-fit opacity-1'
              )}
            >
              {!registerPartShown && <LoginForm />}
            </div>
            <div
              className={clsx(
                'transition-all w-full',
                registerPartShown ? 'h-fit opacity-1' : 'h-0 opacity-0'
              )}
            >
              {registerPartShown && <RegisterForm />}
            </div>
            <Button
              className="p-2"
              variant="bordered"
              onClick={toggleRegisterForm}
            >
              {registerPartShown ? 'Sign in' : 'Sign out'}
            </Button>
          </div>
        </div>
      </div>
    </PopUp>
  );
};
