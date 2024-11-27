import axios, { InternalAxiosRequestConfig } from 'axios';
import { API_URL, REQUEST_TIMEOUT } from '../../config';
import { getToken } from './token';


export const $api = axios.create({
  timeout: REQUEST_TIMEOUT,
  baseURL: API_URL,
});

$api.interceptors.request.use(
  (config: InternalAxiosRequestConfig):InternalAxiosRequestConfig => {
    const token = getToken();

    if (token && config.headers) {
      config.headers['x-token'] = token;
    }

    return config;
  },
);
