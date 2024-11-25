import React from 'react';
import { StartPage, CollectionEditPage, TrainPage } from '@/pages';

type RouteData = {
  url: string;
  getUrl: (kwargs?: any) => string;
  label?: string;
  content: JSX.Element;
};
type RoutesEnum = 'main' | 'collections' | 'collectionEdit' | 'train' | 'about';

export const routes: Record<RoutesEnum, RouteData> = {
  main: {
    url: '/',
    getUrl: () => '/',
    label: 'Main page',
    content: <StartPage />,
  },
  collections: {
    url: '/collections',
    getUrl: () => '/collections',
    label: 'View collections',
    content: <StartPage />,
  },
  collectionEdit: {
    url: '/collections/:id/edit',
    getUrl: (id: number) => `/collections/${id}/edit`,
    content: <CollectionEditPage />,
  },
  train: {
    url: '/collections/:id/train',
    getUrl: (id: number) => `/collections/${id}/train`,
    content: <TrainPage />,
  },
  about: {
    url: '/about',
    getUrl: () => '/about',
    label: 'Feed us',
    content: <StartPage />,
  },
};

const menuRoutesKeys: RoutesEnum[] = ['main', 'collections', 'about'];
export const menuRoutes = menuRoutesKeys.map((menuKey) => routes[menuKey]);
