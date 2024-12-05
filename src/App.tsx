import React from 'react';
import { AppRoutes } from '@/routes';
import { Header, Footer } from '@/components/mainWrapper';
import { LoginWindow } from '@/components/LoginWindow';

export const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <LoginWindow />
      <Header />
      <main className="flex-grow">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
};