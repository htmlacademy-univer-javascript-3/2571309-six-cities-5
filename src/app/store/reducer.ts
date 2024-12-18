import { combineReducers } from '@reduxjs/toolkit';
import { offersReducer } from '../../entities/offer';
import { userReducer } from '../../entities/user';
import { reviewsReducer } from '../../entities/review/model/reviews';

export const appReducer = combineReducers({offer: offersReducer, user: userReducer, review: reviewsReducer});
