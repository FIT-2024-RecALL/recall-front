import React from 'react';
import { StartPage, CollectionEditPage } from '@/pages';
import { CollectionsPage } from '../pages/CollectionsPage';

type RouteData = {
  url: string;
  label?: string;
  content: JSX.Element;
};

export const routesList: RouteData[] = [
  {
    url: '/',
    label: 'Main page',
    content: <StartPage />,
  },
  {
    url: '/collections',
    label: 'View collections',
    content: <CollectionsPage />,
  },
  {
    url: '/collections/edit/:id',
    content: <CollectionEditPage />,
  },
  {
    url: '/about',
    label: 'Feed us',
    content: <StartPage />,
  },
];
