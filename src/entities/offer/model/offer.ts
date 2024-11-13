import { createReducer } from '@reduxjs/toolkit';
import { IInitialStateOffersState } from './types';
import { changeCity, changeSort, fillOffers } from './action';
import { OFFERS_MOCK_DATA } from '../../../shared/api';
import { SortingOptionsEnum } from '../../../features/sorting-panel';

const initialState: IInitialStateOffersState = {
  city: 'Paris',
  offers: OFFERS_MOCK_DATA,
  sort: SortingOptionsEnum.Popular
};

export const offersReducer = createReducer(initialState, (builder)=>{
  builder.addCase(changeCity,(state,{payload})=> {
    state.city = payload;
  }).addCase(fillOffers,(state)=>{
    state.offers = OFFERS_MOCK_DATA;
  }).addCase(changeSort,(state, {payload})=>{
    state.sort = payload;
    const sortingArray = [...OFFERS_MOCK_DATA];
    switch (payload) {
      case SortingOptionsEnum.Popular:
        state.offers = OFFERS_MOCK_DATA;
        break;
      case SortingOptionsEnum.PriceHighToLow:
        state.offers = sortingArray.sort((a,b)=> b.price - a.price);
        break;
      case SortingOptionsEnum.PriceLowToHigh:
        state.offers = sortingArray.sort((a,b)=> a.price - b.price);
        break;
      case SortingOptionsEnum.TopRatedFirst:
        state.offers = sortingArray.sort((a,b)=> b.rating - a.rating);
        break;
      default:
        state.offers = OFFERS_MOCK_DATA;
        break;
    }
  });
});
