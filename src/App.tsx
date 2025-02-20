import React from 'react';
import { AppRoutes } from '@/routes';
import { Header, Footer } from '@/components/mainWrapper';
import { LoginWindow } from '@/components/auth/LoginWindow';
import { CreateCollectionWindow } from '@/components/collection/CreateCollectionWindow';
import { ZoomedCard } from '@/components/card';
import clsx from 'clsx';

export const App: React.FC = () => {
  return (
    <div className={clsx('flex flex-col min-h-screen')}>
      <LoginWindow />
      <CreateCollectionWindow />
      <ZoomedCard />
      <Header />
      <main className="flex-grow">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
};
