import { configureStore } from '@reduxjs/toolkit';
import { $api } from '../../shared/api';
import { redirect } from './middlewares';
import { appReducer } from './reducer';

export const store = configureStore({reducer: appReducer,middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    thunk: {
      extraArgument: $api,
    },
  }).concat(redirect),});
