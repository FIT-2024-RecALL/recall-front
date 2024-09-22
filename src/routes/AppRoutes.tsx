import React from 'react';
import { Link, Redirect, Route, Router, Switch } from 'wouter';
import { HomePage } from '@/pages/HomePage';
import { Page } from '@/pages/Page';
import { animated } from '@react-spring/web';
import { GeneratePage } from '@/pages/GeneratePage';

export const AppRoutes: React.FC = () => (
  <Router>
    <ul className={'flex vertical-center'}>
      <li className={'text-blue border-1 m-2'}>
        <Link to="/">Counter</Link>
      </li>
      <li className={'text-red border-1 m-2'}>
        <Link to="/test">Test link</Link>
      </li>
      <li className={'text-red border-1 m-2'}>
        <Link to="/test/bla">Testing link</Link>
      </li>
      <li className={'text-red border-1 m-2'}>
        <Link to="/generate">Generate</Link>
      </li>
    </ul>
    <br />
    <Route path="/test">Additional test page</Route>
    <Route path="/test" nest>
      Additional test page 2
    </Route>
    <Switch>
      <Route path="/generate" nest>
        <GeneratePage />
      </Route>
      <Route path="/:id" nest>
        <Page />
      </Route>
      <Route path="/">
        <HomePage />
      </Route>
    </Switch>
  </Router>
);
