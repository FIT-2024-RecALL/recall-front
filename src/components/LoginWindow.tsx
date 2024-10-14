import React from 'react';
import { PopUp } from '@/components/library/PopUp';
import { Button } from '@/components/library/Button';
import { useAppStore } from '@/state';

export const LoginWindow: React.FC = () => {
  const [loginWindowShown, toggleLoginWindow] = useAppStore((state) => [
    state.loginWindowShown,
    state.toggleLoginWindow,
  ]);

  return (
    <PopUp
      isShown={loginWindowShown}
      toggle={toggleLoginWindow}
      className="bg-gradient-to-b from-1-6/50 to-1-1/50"
    >
      <div className="absolute inset-1/3 vstack w-1/3 h-fit p-3 border-2 border-1-1 rounded-lg bg-gradient-to-tr from-1-2 to-1-5">
        <h1 className="text-xl text-center text-2-1">Log in to RecAll</h1>
        <form className="vstack p-2">
          <input type="text" placeholder="Email" className="m-2 p-1 bg-1-2 focus:bg-1-3" />
          <input type="text" placeholder="Password" className="m-2 p-1 bg-1-2 focus:bg-1-3" />
          <div className="around m-2">
            <Button variant="plate" type="submit">Sign in</Button>
            <Button variant="bordered">Sign up</Button>
          </div>
        </form>
      </div>
    </PopUp>
  );
};
