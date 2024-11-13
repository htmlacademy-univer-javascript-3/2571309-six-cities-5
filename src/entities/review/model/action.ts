import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../../../shared/lib/types';
import { AxiosInstance } from 'axios';
import { AddReviewData, ReviewType } from './types';
import { API_ROUTES } from './config';

export const setReviewsOnPage = createAction<ReviewType[]>('review/setReviewsOnPage');
export const fetchReviews = createAsyncThunk<void, string,
{
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
}>
(
  'review/fetchReviews',
  async (offerId, {dispatch, extra: api}) => {
    const {data} = await api.get<ReviewType[]>(`${API_ROUTES.GET_REVIEWS}/${offerId}`);
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
      await api.post<ReviewType>(`${API_ROUTES.GET_REVIEWS}/${offerId}`, {comment, rating});
      dispatch(fetchReviews(offerId));
    },
  );