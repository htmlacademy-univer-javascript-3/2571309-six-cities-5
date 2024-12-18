import { createReducer } from '@reduxjs/toolkit';
import { IInitialStateOffersState } from './types';
import { changeCity, changeSort, setOffers, setFavorites, setNearOffer, setOfferOnPage, setOffersDataLoadingStatus, changeStatusOfFavorite } from './action';
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
  }).addCase(setOffersDataLoadingStatus,(state,{payload})=>{
    state.isLoading = payload;
  }).addCase(setOfferOnPage,(state,{payload})=>{
    state.offerOnPage = payload;
  }).addCase(setNearOffer,(state,{payload})=>{
    state.nearOffers = payload;
  }).addCase(setFavorites,(state,{payload})=> {
    state.favorites = payload;
  }).addCase(changeStatusOfFavorite,(state,{payload})=> {
    state.nearOffers.map((el)=>{
      if(el.id === payload.id) {
        el.isFavorite = !el.isFavorite;
      }
    });
  });
});


