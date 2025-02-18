import React from 'react';
import { AppRoutes } from '@/routes';
import { Header, Footer } from '@/components/mainWrapper';
import { LoginWindow } from '@/components/auth/LoginWindow';
import { CreateCollectionWindow } from '@/components/collection/CreateCollectionWindow';
import { ZoomedCard } from '@/components/card';
import clsx from 'clsx';
import { useAppStore } from '@/state';

export const App: React.FC = () => {
  const scrollEnabled = useAppStore((state) => state.globalScrollEnabled);

  return (
    <div
      className={clsx(
        'flex flex-col min-h-screen',
        // !scrollEnabled && 'h-screen overflow-hidden'
      )}
    >
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
