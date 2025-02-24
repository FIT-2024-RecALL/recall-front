import React from 'react';
import { useTranslation } from 'react-i18next';

import { PopUp } from '@/components/library/PopUp';
import { Button } from '@/components/library/Button';
import { useAppStore } from '@/state';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import clsx from 'clsx';

export const LoginWindow: React.FC = () => {
  const { t } = useTranslation();
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
      className="bg-neutral-300/25 backdrop-blur-sm"
    >
      <div className="center">
        <div
          className={clsx(
            'absolute top-1/4 w-5/6',
            'bg-o-white',
            'px-4 py-6 md:w-1/2 lg:w-1/3 h-fit',
            'border-2 border-o-black rounded-lg',
            'transition-all duration-300'
          )}
        >
          <h1 className="text-lg md:text-xl text-center text-black font-bold mb-2">
            {isLogin ? t('auth.loginTitle') : t('auth.registerTitle')}
          </h1>
          <div className="vstack center transition-all duration-300 relative">
            <div
              className={clsx(
                'transition-all duration-300 w-full',
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
            <div className="center w-full mt-2">
              <Button
                className="p-2 rounded-lg"
                variant="bordered"
                onClick={toggleActiveAuthWindow}
              >
                {isRegister ? t('auth.goToLogin') : t('auth.goToRegister')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PopUp>
  );
};
