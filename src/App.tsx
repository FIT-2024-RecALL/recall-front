import React from 'react';
import { AppRoutes } from '@/routes';
import { Header, Footer } from './components/mainWrapper';
import { PopUp } from './components/library/PopUp';
import { useAppStore } from './state/state';

export const App: React.FC = () => {
  const [loginWindowShown, toggleLoginWindow] = useAppStore((state) => [
    state.loginWindowShown,
    state.toggleLoginWindow,
  ]);

  return (
    <>
      <PopUp isShown={loginWindowShown} toggle={toggleLoginWindow}>
        <div className="center wrap-3 p-50 m-10 bg-1-3">
          <h1 className="color-1-6 m-3">Aboba</h1>
          <h1 className="color-1-6 m-3">Aboba</h1>
          <h1 className="color-1-6 m-3">Aboba</h1>
          <h1 className="color-1-6 m-3">Aboba</h1>
          <h1 className="color-1-6 m-3">Aboba</h1>
          <h1 className="color-1-6 m-3">Aboba</h1>
        </div>
      </PopUp>
      <Header />
      <main>
        <AppRoutes />
      </main>
      <Footer />
    </>
  );
};
