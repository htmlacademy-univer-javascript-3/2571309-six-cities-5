import { createReducer } from '@reduxjs/toolkit';
import { IInitialStateOffersState } from './types';
import { changeCity, fillOffers } from './action';
import { OFFERS_MOCK_DATA } from '../../../shared/api';

const initialState: IInitialStateOffersState = {
  city: 'Paris',
  offers: OFFERS_MOCK_DATA
};

export const offersReducer = createReducer(initialState, (builder)=>{
  builder.addCase(changeCity,(state,{payload})=> {
    state.city = payload;
  }).addCase(fillOffers,(state)=>{
    state.offers = OFFERS_MOCK_DATA;
  });
});
