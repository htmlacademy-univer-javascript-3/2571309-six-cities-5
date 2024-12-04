import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../shared/lib/types';
import { OfferType } from '../../../shared/types';


const selectSort = (state: RootState) => state.offer.sort;
const selectOffers = (state: RootState) => state.offer.offers;
const selectOfferOnPage = (state: RootState) => state.offer.offerOnPage;
const selectNearOffers = (state: RootState) => state.offer.nearOffers;
const selectCurrentCity = (state: RootState) => state.offer.city;
export const selectFavorites = (state: RootState) => state.offer.favorites;

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


export const favoritesSelector = createSelector(
  [selectFavorites],
  (items) => {
    const map = new Map<string, OfferType[]>();
    items.forEach((el)=>{
      if(map.has(el.city.name) && map.get(el.city.name)) {
        map.set(el.city.name,[...map.get(el.city.name) as OfferType[], el]);
      } else {
        map.set(el.city.name,[el]);
      }
    });
    return Array.from(map);
  }
);


