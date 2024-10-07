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
    label: 'Generate secret message',
    content: <GeneratePage />,
  },
  {
    url: '/secret',
    label: 'Get secret message',
    content: <GetSecretPage />,
  },
];
