import React from 'react';
import { Route, Switch } from 'wouter';
import { routes } from './routesList';

export const AppRoutes: React.FC = () => {
  return (
    <Switch>
      {Object.values(routes).map((data) => (
        <Route path={data.url} key={data.url}>
          {data.content}
        </Route>
      ))}
      <Route>
        <h1>Page not found</h1>
      </Route>
    </Switch>
  );
};
