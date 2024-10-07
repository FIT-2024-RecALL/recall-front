import React from 'react';
import { useParams } from 'wouter';
import { createSecretGeneratePost } from '@/api/services.gen';

interface PageProps {
  id: string;
}

export const Page: React.FC = () => {
  const { id } = useParams<PageProps>();

  return <div>{id}</div>;
};
