import { configureStore } from '@reduxjs/toolkit';
import { offersReducer } from '../../entities/offer';
import { $api } from '../../shared/api';
import { userReducer } from '../../entities/user';
import { redirect } from './middlewares';

export const store = configureStore({reducer:{offer: offersReducer, user: userReducer},middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    thunk: {
      extraArgument: $api,
    },
  }).concat(redirect),});
