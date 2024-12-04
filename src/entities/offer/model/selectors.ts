import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../shared/lib/types';
import { OfferType } from '../../../shared/types';


const selectSort = (state: Pick<RootState,'offer'>) => state.offer.sort;
const selectOffers = (state: Pick<RootState,'offer'>) => state.offer.offers;
const selectOfferOnPage = (state: Pick<RootState,'offer'>) => state.offer.offerOnPage;
const selectNearOffers = (state: Pick<RootState,'offer'>) => state.offer.nearOffers;
const selectCurrentCity = (state: Pick<RootState,'offer'>) => state.offer.city;
export const selectFavorites = (state: Pick<RootState,'offer'>) => state.offer.favorites;

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


