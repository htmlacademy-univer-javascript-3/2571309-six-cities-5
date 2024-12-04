import { createReducer } from '@reduxjs/toolkit';
import { IInitialStateReviewsState } from './types';
import { addReview, setReviewsOnPage } from './action';
import { compareDates } from '../../../shared/lib';

const initialState: IInitialStateReviewsState = {
  reviews: [],
  isLoading: false,
  isError: false
};

export const reviewsReducer = createReducer(initialState, (builder)=>{
  builder.addCase(setReviewsOnPage,(state,{payload})=> {
    if(Array.isArray(payload)) {
      const arrayForResolve = [...payload];
      arrayForResolve.sort((a,b)=>compareDates(a.date,b.date));
      state.reviews = arrayForResolve;
    }
  }).addCase(addReview.pending,(state)=> {
    state.isLoading = true;
  }).addCase(addReview.rejected,(state)=> {
    state.isError = true;
    state.isLoading = false;
  }).addCase(addReview.fulfilled,(state)=> {
    state.isLoading = false;
  });
});
