import React from 'react';
import { AppRoutes } from '@/routes';
import { Header, Footer } from './components/mainWrapper';

export const App: React.FC = () => (
  <>
    <Header />
    <main className="">
      <AppRoutes />
    </main>
    <Footer />
  </>
);
