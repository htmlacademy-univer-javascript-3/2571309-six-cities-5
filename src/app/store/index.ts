import { configureStore } from '@reduxjs/toolkit';
import { offersReducer } from '../../entities/offer';
import { $api } from '../../shared/api';

export const store = configureStore({reducer:{offer: offersReducer},middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    thunk: {
      extraArgument: $api,
    },
  }),});
