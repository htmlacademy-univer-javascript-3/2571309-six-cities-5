import { createReducer } from '@reduxjs/toolkit';
import { IInitialStateOffersState } from './types';
import { changeCity, changeSort, setOffers, setFavorites, setNearOffer, setOfferOnPage, setOffersDataLoadingStatus } from './action';
import { SortingOptionsEnum } from '../../../features/sorting-panel';
import { Cities } from '../../../shared/api';

const initialState: IInitialStateOffersState = {
  city: Cities.Paris,
  offers: [],
  nearOffers: [],
  sort: SortingOptionsEnum.Popular,
  isLoading: false,
  offerOnPage: null,
  favorites: [],
};

export const offersReducer = createReducer(initialState, (builder)=>{
  builder.addCase(changeCity,(state,{payload})=> {
    state.city = payload;
  }).addCase(setOffers,(state,{payload})=>{
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
  }).addCase(setOfferOnPage,(state,{payload})=>{
    state.offerOnPage = payload;
  }).addCase(setNearOffer,(state,{payload})=>{
    state.nearOffers = payload;
  }).addCase(setFavorites,(state,{payload})=> {
    state.favorites = payload;
  });
});


