import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../shared/lib/types';


const selectReviews = (state: Pick<RootState,'review'>) => state.review.reviews;
const selectIsLoadingReviews = (state: Pick<RootState,'review'>) => state.review.isLoading;
const selectIsErrorReviews = (state: Pick<RootState,'review'>) => state.review.isError;

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
