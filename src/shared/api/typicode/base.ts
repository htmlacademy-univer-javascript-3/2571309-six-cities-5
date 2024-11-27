import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { API_URL, REQUEST_TIMEOUT } from '../../config';
import {StatusCodes} from 'http-status-codes';
import {toast} from 'react-toastify';
import { getToken } from './token';
import { ErrorMessageType } from '../../types';

const BadStatusCodesArray: StatusCodes[] = [StatusCodes.BAD_REQUEST,StatusCodes.UNAUTHORIZED,StatusCodes.NOT_FOUND
];

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

$api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ErrorMessageType>) => {
    if (error.response && BadStatusCodesArray.includes(error.response.status)) {
      const detailMessage = (error.response.data);
      toast.warn(detailMessage.message);
    }


    throw error;
  }
);
