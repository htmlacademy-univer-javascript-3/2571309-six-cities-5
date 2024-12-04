import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../shared/lib/types';


const selectAuthStatus = (state: RootState) => state.user.authorizationStatus;
const selectUser = (state: RootState) => state.user.user;

export const authSelector = createSelector(
  [selectAuthStatus],
  (items) => items
);

export const userSelector = createSelector(
  [selectUser],
  (user) => user
);
