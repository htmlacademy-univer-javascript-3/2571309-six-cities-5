import { createReducer } from '@reduxjs/toolkit';
import { IInitialStateOffersState } from './types';
import { changeCity, changeSort, fillOffers, setOffersDataLoadingStatus } from './action';
import { SortingOptionsEnum } from '../../../features/sorting-panel';

const initialState: IInitialStateOffersState = {
  city: 'Paris',
  offers: [],
  sort: SortingOptionsEnum.Popular,
  isLoading: false
};

export const offersReducer = createReducer(initialState, (builder)=>{
  builder.addCase(changeCity,(state,{payload})=> {
    state.city = payload;
  }).addCase(fillOffers,(state,{payload})=>{
    state.offers = payload;
  }).addCase(changeSort,(state, {payload})=>{
    state.sort = payload;
    switch (payload) {
      case SortingOptionsEnum.Popular:
        state.offers = state.offers.slice();
        break;
      case SortingOptionsEnum.PriceHighToLow:
        state.offers = state.offers.slice().sort((a,b)=> b.price - a.price);
        break;
      case SortingOptionsEnum.PriceLowToHigh:
        state.offers = state.offers.slice().sort((a,b)=> a.price - b.price);
        break;
      case SortingOptionsEnum.TopRatedFirst:
        state.offers = state.offers.slice().sort((a,b)=> b.rating - a.rating);
        break;
      default:
        state.offers = state.offers.slice();
        break;
    }
  }).addCase(setOffersDataLoadingStatus,(state,{payload})=>{
    state.isLoading = payload;
  });
});

