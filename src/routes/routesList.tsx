import React from 'react';
import { GeneratePage, GetSecretPage } from '@/pages';

type RouteData = {
  url: string;
  label: string;
  content: JSX.Element;
};

export const routesList: Array<RouteData> = [
  {
    url: '/',
    label: 'Main page',
    content: <GetSecretPage />,
  },
  {
    url: '/collections',
    label: 'View collections',
    content: <GetSecretPage />,
  },
  {
    url: '/about',
    label: 'About us',
    content: <GeneratePage />,
  },
];
