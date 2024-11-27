import { createReducer } from '@reduxjs/toolkit';
import { IInitialStateReviewsState } from './types';
import { setReviewsOnPage } from './action';
import { compareDates } from '../../../shared/lib';

const initialState: IInitialStateReviewsState = {
  reviews: [],
};

export const reviewsReducer = createReducer(initialState, (builder)=>{
  builder.addCase(setReviewsOnPage,(state,{payload})=> {
    if(Array.isArray(payload)) {
      let arrayForResolve = [...payload];
      arrayForResolve.sort((a,b)=>compareDates(a.date,b.date));
      if(arrayForResolve.length > 10) {
        arrayForResolve = arrayForResolve.slice(0,10);
      }
      state.reviews = arrayForResolve;
    }
  });
});
