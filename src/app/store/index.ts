import { configureStore } from '@reduxjs/toolkit';
import { offersReducer } from '../../entities/offer';
import { $api } from '../../shared/api';
import { userReducer } from '../../entities/user';
import { redirect } from './middlewares';
import { reviewsReducer } from '../../entities/review/model/reviews';

export const store = configureStore({reducer:{offer: offersReducer, user: userReducer, review: reviewsReducer},middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    thunk: {
      extraArgument: $api,
    },
  }).concat(redirect),});
