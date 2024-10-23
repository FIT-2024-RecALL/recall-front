import React from 'react';

import { PopUp } from '@/components/library/PopUp';
import { Button } from '@/components/library/Button';
import { useAppStore } from '@/state';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import clsx from 'clsx';
import { SliderCheckbox } from './library/SliderCheckbox';

export const LoginWindow: React.FC = () => {
  const authWindowState = useAppStore((state) => state.authWindow);
  const closeAuthWindow = useAppStore((state) => state.closeAuthWindow);
  const showLoginWindow = useAppStore((state) => state.showLoginWindow);
  const showRegisterWindow = useAppStore((state) => state.showRegisterWindow);
  const toggleActiveAuthWindow = useAppStore(
    (state) => state.toggleActiveAuthWindow
  );

  const isLogin = authWindowState === 'login';
  const isRegister = authWindowState === 'register';

  return (
    <PopUp
      isShown={authWindowState !== 'hidden'}
      close={closeAuthWindow}
      className="bg-gradient-to-b from-1-6/50 to-1-1/50 backdrop-blur-sm"
    >
      <div className="center">
        <div className="absolute top-1/4 w-3/4 m-2 md:w-1/3 h-fit p-3 border border-1-1 rounded-lg bg-gradient-to-tr from-1-2 to-1-5">
          <h1 className="text-lg md:text-xl text-center text-2-1">
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
            <div className="around w-full text-2-2">
              <Button
                className={clsx('m-1 p-2 rounded-lg', isLogin && 'border-4')}
                variant="bordered"
                onClick={showLoginWindow}
              >
                Log in
              </Button>
              <SliderCheckbox
                variant="light"
                checked={isRegister}
                onClick={toggleActiveAuthWindow}
              />
              <Button
                className={clsx('m-1 p-2 rounded-lg', isRegister && 'border-4')}
                variant="bordered"
                onClick={showRegisterWindow}
              >
                Register
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PopUp>
  );
};
