import React from 'react';
import { PopUp } from '@/components/library/PopUp';
import { useAppStore } from '@/state';

export const LoginWindow: React.FC = () => {
  const [loginWindowShown, toggleLoginWindow] = useAppStore((state) => [
    state.loginWindowShown,
    state.toggleLoginWindow,
  ]);

  return (
    <PopUp isShown={loginWindowShown} toggle={toggleLoginWindow}>
      <div className="center">
        <h1 className="text-1-6 m-3">Aboba</h1>
        <h1 className="text-1-6 m-3">Aboba</h1>
        <h1 className="text-1-6 m-3">Aboba</h1>
        <h1 className="text-1-6 m-3">Aboba</h1>
        <h1 className="text-1-6 m-3">Aboba</h1>
        <h1 className="text-1-6 m-3">Aboba</h1>
      </div>
    </PopUp>
  );
};
