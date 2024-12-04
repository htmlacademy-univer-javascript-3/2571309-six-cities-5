import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../shared/lib/types';


const selectReviews = (state: RootState) => state.review.reviews;
const selectIsLoadingReviews = (state: RootState) => state.review.isLoading;
const selectIsErrorReviews = (state: RootState) => state.review.isError;

export const reviewsSelector = createSelector(
  [selectReviews],
  (items) => items
);

export const isLoadingReviewsSelector = createSelector(
  [selectIsLoadingReviews],
  (flag) => flag
);

export const isErrorReviewsSelector = createSelector(
  [selectIsErrorReviews],
  (flag) => flag
);
