import axios, { AxiosResponse } from 'axios';
import { useAuth } from './useAuth';
import { useHistory } from 'react-router-dom';
import { URLS } from 'config';
import { User, UserPosition } from 'model';
import { useToasts } from 'react-toast-notifications';
import { useEffect } from 'react';

const axiosInstance = axios.create({
  baseURL: '/api/',
  responseType: 'json'
});

const getUsers = (params?: any) => axiosInstance.get<User[]>('/users', {params: params})
  .then((res) => res.data.map(u => new User(u)));
const getPositions = () => axiosInstance.get<UserPosition[]>('/user-positions')
  .then(res => res.data.map(p => new UserPosition(p)));
const createUser = (u: User) => axiosInstance.post('/user', u);
const saveUser = (u: User) => axiosInstance.put(`/user/${u.id}`, u);

export const useErrorResponseHandler = () => {
  const history = useHistory();
  const {addToast} = useToasts();
  return (res: AxiosResponse) => {
    if (!res) {
      addToast('Ошибка сети', {appearance: 'error'});
      return;
    }
    switch (res.status) {
      case 400:
        addToast(res.data.msg, {appearance: 'error'});
        break;
      case 401:
      case 403:
        addToast('Доступ закрыт', {appearance: 'error'});
        history.push(URLS.LOGIN_PAGE_URL);
        break;
      case 404:
        addToast('Ресурс не найден', {appearance: 'error'});
        break;
      case 500:
        addToast('500 Internal server error', {appearance: 'error'});
        break;
    }
  };
};

export const useApi = () => {
  const {authenticated, token} = useAuth();
  const errorResponseHandler = useErrorResponseHandler();

  useEffect(() => {
    const reqId = axiosInstance.interceptors.request.use((config) => {
      if (authenticated) {
        config.headers.token = token.token;
      }
      return config;
    });

    const resId = axiosInstance.interceptors.response.use((res) => res,
      (err) => {
        errorResponseHandler(err.response);
        return Promise.reject(err);
      });
    return () => {
      axiosInstance.interceptors.request.eject(reqId);
      axiosInstance.interceptors.response.eject(resId);
    };
  });

  return {
    getUsers,
    getPositions,
    createUser,
    saveUser
  };
};
