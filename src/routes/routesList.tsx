import React from 'react';
import { GeneratePage, GetSecretPage, StartPage, CollectionEditPage } from '@/pages';

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
    content: <GetSecretPage />,
  },
  {
    url: '/collections/edit/:id',
    content: <CollectionEditPage />,
  },
  {
    url: '/about',
    label: 'Feed us',
    content: <GeneratePage />,
  },
];
