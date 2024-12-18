import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AuthData, AuthEnum, UserType } from './types';
import { AppDispatch, RootState } from '../../../shared/lib/types';
import { AxiosInstance } from 'axios';
import { ApiRoutes } from './config';
import { dropToken, saveToken } from '../../../shared/api/typicode/token';
import { RoutesEnum } from '../../../shared/config';
import { fetchFavorites, fetchOffers } from '../../offer/model/action';

export const changeAuthStatus = createAction<AuthEnum>('user/changeAuthStatus');
export const setUser = createAction<UserType|null>('user/setUser');
export const redirectToRoute = createAction<RoutesEnum>('user/redirectToRoute');
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
      const {data: user} = await api.get<UserType>(ApiRoutes.LOGIN);
      dispatch(setUser(user));
      await dispatch(fetchFavorites());
    } catch {
      dispatch(setUser(null));
      dispatch(redirectToRoute(RoutesEnum.LOGIN));
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
      const {data: user} = await api.post<UserType>(ApiRoutes.LOGIN, {email, password});
      saveToken(user.token);
      dispatch(redirectToRoute(RoutesEnum.MAIN));
      dispatch(setUser(user));
      await dispatch(fetchFavorites());
      await dispatch(fetchOffers());
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
      await api.delete(ApiRoutes.LOGOUT);
      dropToken();
      dispatch(setUser(null));
      await dispatch(fetchOffers());
    },
  );
