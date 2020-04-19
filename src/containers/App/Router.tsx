import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { URLS } from 'config';
import PrivateRoute from './PrivateRoute';
import ExamplePage from '../ExamplePage';
import LogInPage from '../LogInPage';

const Pages = () => (
  <Switch>
    <PrivateRoute path={URLS.USERS_PAGE_URL} component={ExamplePage}/>
    <Route path={URLS.PUBLIC_USERS_PAGE_URL} component={ExamplePage}/>
  </Switch>
);

const wrappedRoutes = () => (
  <div>
    <div className="container">
      <Route path={URLS.PAGES_URL} component={Pages}/>
    </div>
  </div>
);

const Router = () => (
  <main>
    <Switch>
      <Route exact path={URLS.BASE_URL} component={LogInPage}/>
      <Route exact path={URLS.LOGIN_PAGE_URL} component={LogInPage}/>
      <Route path={URLS.BASE_URL} component={wrappedRoutes}/>
    </Switch>
  </main>
);

export default Router;
