import React from 'react';
import { AppRoutes, Menu } from '@/routes';

export const App: React.FC = () => (
  <>
    <header>
      <Menu />
    </header>
    <main className={'center-full'}>
      <AppRoutes />
    </main>
    <footer>
      
    </footer>
  </>
);
