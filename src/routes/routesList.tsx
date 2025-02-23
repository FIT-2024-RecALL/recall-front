import React from 'react';
import {
  StartPage,
  CollectionsPage,
  CollectionEditPage,
  TrainPage,
  ProfilePage,
} from '@/pages';
import { CustomTKeys } from '@/i18n';

type RouteData = {
  url: string;
  getUrl: (kwargs?: any) => string;
  label?: CustomTKeys;
  content: JSX.Element;
};
type RoutesEnum =
  | 'main'
  | 'collections'
  | 'collectionEdit'
  | 'train'
  | 'profile';

export const routes: Record<RoutesEnum, RouteData> = {
  main: {
    url: '/',
    getUrl: () => '/',
    label: 'menu.main',
    content: <StartPage />,
  },
  collections: {
    url: '/collections',
    getUrl: () => '/collections',
    label: 'common.collections',
    content: <CollectionsPage />,
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
  profile: {
    url: '/profile',
    getUrl: () => '/profile',
    content: <ProfilePage />,
  },
};

const menuRoutesKeys: RoutesEnum[] = ['main', 'collections'];
export const menuRoutes = menuRoutesKeys.map((menuKey) => routes[menuKey]);
