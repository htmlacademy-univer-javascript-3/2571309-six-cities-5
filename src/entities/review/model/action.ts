import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../../../shared/lib/types';
import { AxiosInstance } from 'axios';
import { AddReviewData, ReviewType } from './types';
import { ApiRoutes } from './config';

export const setReviewsOnPage = createAction<ReviewType[]>('review/setReviewsOnPage');
export const setIsLoadingReview = createAction<boolean>('review/setIsLoadingReview');
export const setIsErrorReview = createAction<boolean>('review/setIsErrorReview');
export const fetchReviews = createAsyncThunk<void, string,
{
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
}>
(
  'review/fetchReviews',
  async (offerId, {dispatch, extra: api}) => {
    const {data} = await api.get<ReviewType[]>(`${ApiRoutes.GET_REVIEWS}/${offerId}`);
    dispatch(setReviewsOnPage(data));
  },
);

export const addReview = createAsyncThunk<
    void, AddReviewData, {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
  >(
    'review/addReview',
    async ({comment, rating,offerId}, {dispatch, extra: api}) => {
      try {
        dispatch(setIsLoadingReview(true));
        await api.post<ReviewType>(`${ApiRoutes.GET_REVIEWS}/${offerId}`, {comment, rating});
        await dispatch(fetchReviews(offerId));
      } finally {
        dispatch(setIsLoadingReview(false));
      }
    },
  );
