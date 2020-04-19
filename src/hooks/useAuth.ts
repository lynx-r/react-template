import { useCookies } from 'react-cookie';
import axios from 'axios';
import _ from 'lodash';
import { URLS } from 'config';
import { useErrorResponseHandler } from './useApi';

export const useAuth = () => {
  const [token, setToken, removeToken] = useCookies(['token']);
  const errorResponseHandler = useErrorResponseHandler();
  const authenticate = (cb: (failed?: boolean) => void, username?: string, password?: string) => {
    axios.post('/api/login', {login: username, password: password})
      .then((res) => {
        setToken('token', res.data.token, {path: URLS.BASE_URL});
        cb();
      })
      .catch((err) => {
        errorResponseHandler(err.response);
        cb(true);
      });
  };
  const signOut = (cb: Function) => {
    removeToken('token', {path: URLS.BASE_URL});
    cb();
  };
  const authenticated = !_.isEmpty(token);
  return {authenticated, token, authenticate, signOut};
};
