import React from 'react';

import { PopUp } from '@/components/library/PopUp';
import { Button } from '@/components/library/Button';
import { useAppStore } from '@/state';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import clsx from 'clsx';

export const LoginWindow: React.FC = () => {
  const authWindowState = useAppStore((state) => state.authWindow);
  const closeAuthWindow = useAppStore((state) => state.closeAuthWindow);
  const toggleActiveAuthWindow = useAppStore(
    (state) => state.toggleActiveAuthWindow
  );

  const isLogin = authWindowState === 'login';
  const isRegister = authWindowState === 'register';

  return (
    <PopUp
      isShown={authWindowState !== 'hidden'}
      close={closeAuthWindow}
      className="bg-gradient-to-b from-1-6/50 to-1-1/50"
    >
      <div className="center">
        <div className="absolute top-1/4 w-3/4 m-2 md:w-1/3 h-fit p-3 border-2 border-1-1 rounded-lg bg-gradient-to-tr from-1-2 to-1-5">
          <h1 className="text-xl text-center text-2-1">
            {isLogin ? 'Log in to RecAll' : 'Register in RecAll'}
          </h1>
          <div className="vstack center transition-all relative">
            <div
              className={clsx(
                'transition-all duration-300 w-full relative',
                isLogin ? 'h-fit opacity-1' : 'h-0 opacity-0 -translate-x-12'
              )}
            >
              {isLogin && <LoginForm />}
            </div>
            <div
              className={clsx(
                'transition-all duration-300 w-full',
                isRegister ? 'h-fit opacity-1' : 'h-0 opacity-0 translate-x-12'
              )}
            >
              {isRegister && <RegisterForm />}
            </div>
            <div className="center">
              <Button
                className="p-2"
                variant="bordered"
                onClick={toggleActiveAuthWindow}
              >
                {isLogin ? 'Go to Register >' : '< Go to Log in'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PopUp>
  );
};
