import React from 'react';
import { Link, Redirect, Route, Router, Switch } from 'wouter';
import { navigate, useLocationProperty } from 'wouter/use-location';
import { HomePage } from '@/pages/HomePage';
import { Page } from '@/pages/Page';

const hashLocation = () => window.location.hash.replace(/^#/, '') || '/';
const hashNavigate = (to: string) => navigate('#' + to);
const useHashLocation = () => {
  const location = useLocationProperty(hashLocation);
  return [location, hashNavigate];
};

export const AppRoutes: React.FC = () => (
  <Router>
    <ul className={'flexvertical-center'}>
      <li className={'bg-blue border-1 m-2'}>
        <Link to="/">Counter</Link>
      </li>
      <li className={'bg-red border-1 m-2'}>
        <Link to="/test">Test link</Link>
      </li>
      <li className={'bg-red border-1 m-2'}>
        <Link to="/testing">Testing link</Link>
      </li>
    </ul>
    <br />
    <Route path="/test" nest>
      <Route path="/test">Additional test page</Route>
      <Route path="/test">Additional test page 2</Route>
    </Route>
    <Switch>
      <Route path="/:id">{(a) => <Page pageId={a.id} />}</Route>
      <Route path="/">
        <HomePage />
      </Route>
      <Route>
        <Redirect to={'/'} />
      </Route>
    </Switch>
  </Router>
);
