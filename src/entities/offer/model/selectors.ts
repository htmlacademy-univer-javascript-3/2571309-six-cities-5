import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../shared/lib/types';


const selectSort = (state: RootState) => state.offer.sort;
const selectOffers = (state: RootState) => state.offer.offers;
const selectOfferOnPage = (state: RootState) => state.offer.offerOnPage;
const selectNearOffers = (state: RootState) => state.offer.nearOffers;
const selectCurrentCity = (state: RootState) => state.offer.city;

export const selectCurrentSort = createSelector(
  [selectSort],
  (items) => items
);

export const offersSelector = createSelector(
  [selectOffers],
  (items) => items
);

export const offerOnPageSelector = createSelector(
  [selectOfferOnPage],
  (items) => items
);

export const nearOffersSelector = createSelector(
  [selectNearOffers],
  (items) => items
);

export const currentCitySelector = createSelector(
  [selectCurrentCity],
  (city) => city
);


