import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AuthData, AuthEnum, UserType } from './types';
import { AppDispatch, RootState } from '../../../shared/lib/types';
import { AxiosInstance } from 'axios';
import { API_ROUTES } from './config';
import { dropToken, saveToken } from '../../../shared/api/typicode/token';
import { routesEnum } from '../../../shared/config';
import { fetchFavorites, fetchOffers } from '../../offer/model/action';

export const changeAuthStatus = createAction<AuthEnum>('user/changeAuthStatus');
export const setUser = createAction<UserType>('user/setUser');
export const redirectToRoute = createAction<routesEnum>('user/redirectToRoute');
export const checkAuth = createAsyncThunk<void, undefined,
{
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
}>
(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data: user} = await api.get<UserType>(API_ROUTES.LOGIN);
      dispatch(changeAuthStatus(AuthEnum.AUTHENTICATED));
      dispatch(setUser(user));
      dispatch(fetchFavorites());
    } catch {
      dispatch(changeAuthStatus(AuthEnum.NO_AUTHENTICATED));
      dispatch(redirectToRoute(routesEnum.LOGIN));
    }
  },
);

export const login = createAsyncThunk<void, AuthData, {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
  >(
    'user/login',
    async ({email, password}, {dispatch, extra: api}) => {
      const {data: user} = await api.post<UserType>(API_ROUTES.LOGIN, {email, password});
      saveToken(user.token);
      dispatch(changeAuthStatus(AuthEnum.AUTHENTICATED));
      dispatch(redirectToRoute(routesEnum.MAIN));
      dispatch(setUser(user));
      dispatch(fetchFavorites());
      dispatch(fetchOffers());
    },
  );

export const logout = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
  >(
    'user/logout',
    async (_arg, {dispatch, extra: api}) => {
      await api.delete(API_ROUTES.LOGOUT);
      dropToken();
      dispatch(changeAuthStatus(AuthEnum.NO_AUTHENTICATED));
      dispatch(fetchOffers());
    },
  );
