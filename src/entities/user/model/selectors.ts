import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../shared/lib/types';


const selectAuthStatus = (state: Pick<RootState,'user'>) => state.user.authorizationStatus;
const selectUser = (state: Pick<RootState,'user'>) => state.user.user;

export const authSelector = createSelector(
  [selectAuthStatus],
  (items) => items
);

export const userSelector = createSelector(
  [selectUser],
  (user) => user
);
