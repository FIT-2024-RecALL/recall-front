import React from 'react';
import { AppRoutes } from '@/routes';
import { Header, Footer } from '@/components/mainWrapper';
import { LoginWindow } from '@/components/auth/LoginWindow';
import { CreateCollectionWindow } from '@/components/collection/CreateCollectionWindow';
import { ZoomedCard } from '@/components/card';

export const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
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
