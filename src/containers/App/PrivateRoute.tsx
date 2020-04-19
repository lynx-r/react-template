import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from 'hooks';
import { URLS } from 'config';

const PrivateRoute = ({component: Component, ...rest}: any) => {
  const {authenticated} = useAuth();
  return (
    <Route {...rest} render={(props) => (
      authenticated
        ? <Component {...props} />
        : <Redirect to={{
          pathname: URLS.LOGIN_PAGE_URL,
          state: {from: props.location}
        }}/>
    )}/>
  );
};

export default PrivateRoute;
