import React from 'react';
import { AppRoutes, Menu } from '@/routes';

export const App: React.FC = () => (
  <>
    <Menu />
    <main className={'center-full'}>
      <AppRoutes />
    </main>
  </>
);
