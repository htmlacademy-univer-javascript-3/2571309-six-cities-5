import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../shared/lib/types';


const selectAuthStatus = (state: RootState) => state.user.authorizationStatus;

export const authSelector = createSelector(
  [selectAuthStatus],
  (items) => items
);
