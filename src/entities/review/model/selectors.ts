import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../shared/lib/types';


const selectReviews = (state: RootState) => state.review.reviews;

export const reviewsSelector = createSelector(
  [selectReviews],
  (items) => items
);
