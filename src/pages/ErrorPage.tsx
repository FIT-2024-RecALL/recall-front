import { routes } from '@/routes';
import React from 'react';
import { Link } from 'wouter';
import { Button } from '../components/library/Button';

export interface ErrorPageProps {
  message: string;
}

export const ErrorPage: React.FC<ErrorPageProps> = ({ message }) => {
  return (
    <div className="vstack m-2 md:m-10 p-2 md:p-5 text-red-600 rounded-md">
      <h1 className="text-4xl text-center m-2 font-bold">Error!</h1>
      <h2 className="text-2xl text-center m-2 font-medium">{message}</h2>
      <div className="w-full center text-lg">
        <Link to={routes.main.getUrl()}>
          <Button className="m-2" variant="bordered-trans">
            Go back
          </Button>
        </Link>
        <Link to={routes.main.getUrl()}>
          <Button className="m-2" variant="plate">
            Go to main page
          </Button>
        </Link>
      </div>
    </div>
  );
};
